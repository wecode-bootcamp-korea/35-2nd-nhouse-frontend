import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { Carousel } from './Carousel';
import useFetch from '../../hooks/useFetch';

import API from '../../config';

export function Detail() {
  const id = useParams();
  const location = useLocation();
  const cardData = location.state.data;
  const { offRate, review, score } = cardData;
  const url = `${API.allProduct}/${id.id}`;
  const { data, loading, error } = useFetch(url);
  const info = data;
  if (loading) return <h1>LOADING</h1>;
  if (error) return <h1>(error)</h1>;
  console.log(info);

  return (
    <Wrapper>
      {info && (
        <Container>
          <ImgContainer>
            <SubImg>
              {info?.thumbnail_images.map((item, index) => (
                <SubImgCard key={index}>
                  <img alt="이미지" src={item} />
                </SubImgCard>
              ))}
            </SubImg>
            <MainImg>
              <Carousel timeSale={true} imgs={info?.thumbnail_images} />
            </MainImg>
          </ImgContainer>
          <Description>
            <Brand>{info?.brand}</Brand>
            <Title>
              <h1>{info?.title}</h1>
            </Title>
            <Review>
              {startScore?.map((star, index) => (
                <Star key={index} />
              ))}
              <ReviewScore>{score.toFixed(1)}</ReviewScore>
              <ReviewCount>{review}개 리뷰</ReviewCount>
            </Review>
            <div>
              <OffRate>{offRate}%</OffRate>
              <RegularPrice>
                {Math.ceil(
                  info?.price / parseFloat(1 - offRate / 100)
                ).toLocaleString()}
                원
              </RegularPrice>
            </div>
            <Price>{parseInt(info?.price).toLocaleString()}원</Price>
            <FristBuyPrice>
              {parseInt(info?.price * 0.9).toLocaleString()}원
              <span>
                첫구매 할인가 (앱 전용)
                <RiArrowDropRightLine />
              </span>
            </FristBuyPrice>
            <Benefits>
              <div>혜택</div>
              <div>
                <span>{parseInt(info?.price * 0.003).toLocaleString()}P</span>
                <span>(WELCOME 0.3% 적립)</span>
              </div>
            </Benefits>
            <Ship>
              <div>배송</div>
              <div>
                <span>무료</span>
                <span>(200,000원 이상 구매시 유료배송)</span>
              </div>
            </Ship>
            <BrandLink>
              <Link>
                <HomeIcon />
                <Text>
                  <span>{info.brand}</span>
                </Text>
              </Link>
              <LinkBox>
                브랜드 홈 <RiArrowDropRightLine />
              </LinkBox>
            </BrandLink>
            <SelectForm>
              <select defaultValue="default">
                <option disabled value="default">
                  색상
                </option>
                {info?.product_options.map((item, index) => (
                  <option key={index}>{item.color_option.toUpperCase()}</option>
                ))}
              </select>
              <select defaultValue="default">
                <option disabled value="default">
                  사이즈
                </option>
                {info?.product_options.map((item, index) => (
                  <option key={index}>{item.size_option}</option>
                ))}
              </select>
              <select defaultValue="default">
                <option disabled value="default">
                  추가상품(선택)
                </option>
                {info?.additional_products?.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
              <PaymentPrice>
                <span>주문금액</span>
                <TotalPrice>
                  {parseInt(info?.price).toLocaleString()}원
                </TotalPrice>
              </PaymentPrice>
              <SubmitBtns>
                <SubmitBtn>장바구니</SubmitBtn>
                <SubmitBtn>바로구매</SubmitBtn>
              </SubmitBtns>
            </SelectForm>
          </Description>
        </Container>
      )}
    </Wrapper>
  );
}

const startScore = Array(1 * 5).fill();

const Wrapper = styled.div`
  display: flex;
  margin-top: 150px;
`;

const Container = styled.div`
  display: flex;
  max-width: 1256px;
  margin: 0 auto;
  gap: 25px;
`;

const ImgContainer = styled.div`
  display: flex;
`;

const MainImg = styled.div`
  margin: 5px;
`;

const SubImg = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 150px;
  min-width: 150px;
  object-fit: cover;
`;

const SubImgCard = styled.div`
  max-height: 100px;
  margin: 5px;
  border-radius: 10px;
  img {
    border-radius: 10px;
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.blue};
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
`;

const Brand = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.dark80};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  h1 {
    max-width: 350px;
    font-size: 22px;
    font-weight: 400;
    line-height: 33px;
    letter-spacing: -0.4px;
    color: ${({ theme }) => theme.dark80};
  }
`;

const Review = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewScore = styled.p`
  font-size: 14px;
  font-weight: 900;
  margin-left: 3px;
`;

const ReviewCount = styled.span`
  margin-left: 10px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.blue};
`;
const Star = styled(AiFillStar)`
  color: ${({ theme }) => theme.blue};
`;

const OffRate = styled.span`
  margin-right: 5px;
  font-weight: 600;
  color: ${props =>
    props.children[0] > 40 ? props.theme.red : props.theme.blue};
`;
const RegularPrice = styled.span`
  margin-left: 5px;
  color: ${({ theme }) => theme.dark50};
  text-decoration: line-through;
`;

const Price = styled.span`
  font-size: 30px;
  letter-spacing: -0.4px;
  font-weight: 900;
  text-align: start;
`;

const FristBuyPrice = styled(Price)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.blue};
  span {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
  }
`;

const Benefits = styled.div`
  display: flex;
  gap: 5px;
  font-size: 14px;
  margin: 5px 0px;
  color: ${({ theme }) => theme.dark80};
  span {
    margin: 0px 2px;
  }
  span:first-child {
    font-weight: 600;
    color: ${({ theme }) => theme.dark};
  }
`;

const Ship = styled(Benefits)``;

const BrandLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.white80};
`;

const Link = styled.div`
  display: flex;
`;

const Text = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.dark80};
  font-weight: 500;
`;

const LinkBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  color: ${({ theme }) => theme.dark80};
  background-color: ${({ theme }) => theme.white80};
  border-radius: 3px;
  font-size: 13px;
`;

const HomeIcon = styled(AiOutlineHome)`
  margin-top: 3px;
  font-size: 25px;
  color: ${({ theme }) => theme.dark80};
`;

const SelectForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.white80};
    &:hover,
    &:focus {
      border: 1px solid ${({ theme }) => theme.blue};
    }
  }
`;

const PaymentPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
  font-size: 14px;
  font-weight: 600;
`;

const TotalPrice = styled(Price)`
  font-size: 20px;
`;

const SubmitBtns = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
`;
const SubmitBtn = styled.button`
  width: 50%;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.blue};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.white};
  font-size: 17px;
  color: ${({ theme }) => theme.blue};
  &:last-child {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`;
