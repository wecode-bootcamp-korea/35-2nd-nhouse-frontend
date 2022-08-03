import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Loadmore } from './Loadmore';
import { BsArrowUpCircle } from 'react-icons/bs';

import API from '../../config';

export function Store() {
  const [data, setData] = useState();
  const element = useRef();
  const getData = async () => {
    const response = await fetch(API.productList);
    const result = await response.json();
    setData(result.results.slice(0, 4));
  };

  const onMoveToElement = () => {
    element.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <MoveBtn onClick={onMoveToElement}>
        <BsArrowUpCircle />
      </MoveBtn>
      <Big />
      <Nav>
        <ImgUl>
          {ICON_DATA.map((icon, index) => (
            <ImgLi key={icon.title}>
              <img alt="" src={icon.img} />
              <ImgP>{icon.title}</ImgP>
            </ImgLi>
          ))}
        </ImgUl>
      </Nav>
      <TodayDeal>
        <TodayHeader>
          <Title>오늘의딜</Title>
          <More>더보기</More>
        </TodayHeader>
        <TodayProducts>
          <ProductsUl>
            {data?.map(item => (
              <ProductsLi key={item.product_id}>
                <ProductCard item={item} timeSale={true} />
              </ProductsLi>
            ))}
          </ProductsUl>
        </TodayProducts>
      </TodayDeal>
      <Nav>
        <ImgUl>
          {CATEGORY_DATA.map(icon => (
            <ImgLi key={icon.title}>
              <img alt="icon" src={icon.img} />
              <ImgP>{icon.title}</ImgP>
            </ImgLi>
          ))}
        </ImgUl>
      </Nav>
      <TodayDeal>
        <TodayHeader>
          <Title>인기 상품</Title>
          <More>인기순</More>
        </TodayHeader>
        <TodayProducts>
          <ProductsUl ref={element}>
            <Loadmore />
          </ProductsUl>
        </TodayProducts>
      </TodayDeal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 150px;
`;

const Big = styled.div`
  width: 100vw;
  height: 380px;
  margin: 0;
  background: url(https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/165692041163174259.JPG?gif=1&w=2560&webp=1);
  background-color: #0f1421;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 0px 4px $darkGray;
`;

const Nav = styled.nav`
  max-width: 1256px;
`;

const ImgUl = styled.ul`
  display: flex;
`;

const ImgLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 0% 0% 20%;
  margin: 25px;
  width: 100%;
  img {
    border-radius: 20px;
  }
`;

const ImgP = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.dark80};
`;

const TodayDeal = styled.div`
  max-width: 1256px;
  margin: 50px 0px;
  width: 100%;
`;

const TodayHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 20px;
`;

const More = styled.button`
  border: none;
  background-color: inherit;
  color: ${({ theme }) => theme.red};
  font-size: 15px;
  font-weight: 500;
`;

const TodayProducts = styled.div``;

const ProductsUl = styled.ul`
  flex-wrap: wrap;
  width: 120%;
  display: flex;
  position: relative;
`;
const ProductsLi = styled.li`
  width: 20%;
  margin: 10px 5px;
`;

const MoveBtn = styled.div`
  position: fixed;
  z-index: 50;
  top: 1100px;
  right: 10%;

  svg {
    color: ${({ theme }) => theme.blue};
    font-size: 50px;
  }
`;

const ICON_DATA = [
  { title: '5일초특가', img: '/images/store/1.webp' },
  { title: '트렌드발견', img: '/images/store/2.webp' },
  { title: '빠른배송', img: '/images/store/3.webp' },
  { title: '살림백과', img: '/images/store/4.webp' },
  { title: '프리미엄', img: '/images/store/5.webp' },
  { title: '오! 굿즈', img: '/images/store/6.webp' },
  { title: '반려동물', img: '/images/store/7.webp' },
  { title: '원플원샵', img: '/images/store/8.webp' },
  { title: '신상특가', img: '/images/store/9.webp' },
  { title: 'LG쇼룸', img: '/images/store/10.webp' },
];

const CATEGORY_DATA = [
  { title: '5일초특가', img: '/images/store/2-1.webp' },
  { title: '트렌드발견', img: '/images/store/2-2.webp' },
  { title: '빠른배송', img: '/images/store/2-3.webp' },
  { title: '살림백과', img: '/images/store/2-4.webp' },
  { title: '프리미엄', img: '/images/store/2-5.webp' },
  { title: '오! 굿즈', img: '/images/store/2-6.webp' },
  { title: '반려동물', img: '/images/store/2-7.webp' },
  { title: '원플원샵', img: '/images/store/2-8.webp' },
  { title: '신상특가', img: '/images/store/2-9.webp' },
  { title: 'LG쇼룸', img: '/images/store/2-10.webp' },
];
