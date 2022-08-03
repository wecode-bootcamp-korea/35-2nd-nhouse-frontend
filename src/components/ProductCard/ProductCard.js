import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';

export const ProductCard = ({ timeSale, item }) => {
  const { brand, product_id, main_image, price, title } = item;
  const [offRate, setOffRate] = useState();
  const [starScore, setStarScore] = useState();
  const [review, setReview] = useState();

  const data = {
    offRate: offRate,
    score: starScore,
    review: review,
  };

  useEffect(() => {
    setOffRate(Math.floor(Math.random() * (50 - 20)) + 20);
    setStarScore(Math.random() * (5 - 3) + 3);
    setReview(Math.floor(Math.random() * (150 - 20)) + 20);
  }, []);

  return (
    <Wrapper>
      <Article>
        <Link to={`/store/${product_id}`} state={{ data: data }}>
          <ImgWrapper>
            <img alt="product" src={main_image} />
            {timeSale && <TimeDeal>금일 특가</TimeDeal>}
          </ImgWrapper>
          <ContentWrapper>
            <Brand>{brand}</Brand>
            <Title>
              {timeSale && '[오늘의 딜]'} {title}
            </Title>
            <OffRate>{offRate}%</OffRate>
            <Price>{parseInt(price).toLocaleString()}</Price>
            <div>
              <ReviewWrapper>
                <Star />
                <ReviewScore>{starScore?.toFixed(1)}</ReviewScore>
                <ReviewCount>리뷰 {review}</ReviewCount>
              </ReviewWrapper>
            </div>
            <Option>
              <Ship>무료배송</Ship>
              <Special>특가</Special>
            </Option>
          </ContentWrapper>
        </Link>
      </Article>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Article = styled.article``;

const ImgWrapper = styled.div`
  flex: 0 0 23%;
  margin: 10px;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  img {
    width: 100%;
    min-height: 220px;
    max-height: 220px;
    border-radius: 5px;
    transition: all 0.15s ease-in-out;
    object-fit: cover;
    &:hover {
      transform: scale(1.15);
    }
  }
`;

const TimeDeal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 8px;
  left: 15px;
  padding: 7px 7px;
  z-index: 3;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.white};
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  line-height: 12px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  padding-left: 10px;
`;

const Brand = styled.h2`
  font-size: 11px;
  color: ${({ theme }) => theme.dark50};
`;

const Title = styled.h1`
  font-size: 13.5px;
  color: ${({ theme }) => theme.dark80};
`;

const OffRate = styled.span`
  margin-right: 5px;
  font-weight: 700;
  color: ${props =>
    props?.children[0] > 40 ? props?.theme.red : props?.theme.blue};
`;

const Price = styled.span`
  font-weight: 900;
  color: ${({ theme }) => theme.dark};
`;

const ReviewWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
`;

const ReviewScore = styled.p`
  font-size: 14px;
  font-weight: 900;
`;

const ReviewCount = styled.p`
  color: ${({ theme }) => theme.dark50};
`;

const Star = styled(AiFillStar)`
  color: ${({ theme }) => theme.blue};
`;

const Option = styled.div`
  display: flex;
  gap: 4px;
`;

const Ship = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.dark80};
  background-color: ${({ theme }) => theme.white80};
`;

const Special = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.red};
`;
