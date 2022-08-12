import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Loadmore } from './Loadmore';
import { BsArrowUpCircle } from 'react-icons/bs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import API from '../../config';

const settings2 = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 5,
  autoplay: false,
};

export function Store() {
  const [data, setData] = useState();
  const [communityNavigation, setCommunityNavigation] = useState([]);
  const [categoryCarousel, setCategoryCarousel] = useState([]);
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
    fetch('/data/CommunityNav.json')
      .then(res => res.json())
      .then(data => {
        setCommunityNavigation(data);
      });
    fetch('/data/CategoryCarousel.json')
      .then(res => res.json())
      .then(data => {
        setCategoryCarousel(data);
      });
  }, []);

  return (
    <Wrapper>
      <MoveBtn onClick={onMoveToElement}>
        <BsArrowUpCircle />
      </MoveBtn>
      <Big />
      <Nav>
        <ImgUl>
          {communityNavigation.map((item, index) => (
            <ImgLi key={item.id}>
              <img alt="" src={item.img} />
              <ImgP>{item.title}</ImgP>
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
      <HomeCategory>
        <Subtitle>카테고리별 상품 찾기</Subtitle>
        <CategorySlider {...settings2}>
          {categoryCarousel.map(carousel => {
            return (
              <HomeCategoryWrap key={carousel.id}>
                <HomeCategoryIMG src={carousel.img} alt="HomeCategoryIMG" />
                <HomeCategoryTitle>{carousel.category}</HomeCategoryTitle>
              </HomeCategoryWrap>
            );
          })}
        </CategorySlider>
      </HomeCategory>
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

const CategorySlider = styled(Slider)`
  width: 100%;
  height: 100%;

  .slick-prev {
    top: 55px;
    left: -10px;
    border: 0px;
    border-radius: 100%;
    opacity: 1;
    z-index: 1;
  }

  .slick-prev:before {
    font-size: 40px;
    color: #000000;
    opacity: 1;
  }

  .slick-next {
    top: 55px;
    right: 10px;
    border: 0px;
    border-radius: 100%;
    opacity: 1;
    z-index: 1;
  }

  .slick-next:before {
    font-size: 40px;
    color: #000000;
    opacity: 1;
  }
`;

const HomeCategoryWrap = styled.div`
  cursor: pointer;
`;
const HomeCategoryIMG = styled.img``;

const HomeCategoryTitle = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #424242;
`;

const HomeCategory = styled.div`
  width: calc(100% - 120px);
  max-width: 1256px;
  margin: 50px auto;
`;

const Subtitle = styled.h2`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
`;
