import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';

export const ProductCard = ({ TimeSale }) => {
  const num = 8900;
  return (
    <CardDiv>
      <CardArticle>
        <Link to="/">
          <CardImg>
            <img
              alt=""
              src="https://brokenmall75.com/web/product/tiny/201910/d84964015307d4bbd28747e3d337e3a8.jpg"
            />
            {TimeSale ? <TimeDeal>금일 특가</TimeDeal> : null}
          </CardImg>
          <Description>
            <h1>{TimeSale && '[오늘의 딜]'} 멀티코팅 바지걸이</h1>
            <div>
              <OffRate>34%</OffRate>
              <Price>{num.toLocaleString()}</Price>
            </div>
            <div>
              <Review>
                <Star />
                <p>4.8</p>
                <p>리뷰 217</p>
              </Review>
            </div>
            <Ship>무료배송</Ship>
          </Description>
        </Link>
      </CardArticle>
    </CardDiv>
  );
};

const CardDiv = styled.div``;

const CardArticle = styled.article``;

const CardImg = styled.div`
  flex: 0 0 23%;
  margin: 10px;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  img {
    width: 100%;
    border-radius: 5px;
    transition: all 0.15s ease-in-out;
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
  z-index: 3;
  top: 8px;
  left: 15px;
  background-color: #f77;
  color: #fff;
  font-weight: 700;
  padding: 7px 7px;
  text-align: center;
  border-radius: 4px;
  font-size: 12px;
  line-height: 12px;
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  padding-left: 10px;
  h1 {
    font-size: 13.5px;
    transition: all 0.15s ease-in-out;
    color: ${({ theme }) => theme.dark80};
  }
`;

const OffRate = styled.span`
  margin-right: 5px;
  font-weight: 600;
  color: ${({ theme }) => theme.blue90};
`;

const Price = styled.span`
  font-weight: 900;
  color: ${({ theme }) => theme.dark};
`;

const Review = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  p {
    font-size: 14px;
    font-weight: 900;
  }
  p:last-child {
    color: ${({ theme }) => theme.dark50};
  }
`;

const Star = styled(AiFillStar)`
  color: ${({ theme }) => theme.blue};
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
