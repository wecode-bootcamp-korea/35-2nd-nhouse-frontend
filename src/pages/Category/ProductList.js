import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Carousel } from '../Category/Carousel';

export function ProductList() {
  const { data } = useOutletContext();

  return (
    <Wrapper>
      <Carousel />
      <SaleList>
        <SaleTitle># 지금은 할인 중</SaleTitle>
        <SaleUl>
          {data?.slice(0, 4).map((item, index) => (
            <SaleLi key={index}>
              <ProductCard item={item} timeSale={true} />
            </SaleLi>
          ))}
        </SaleUl>
      </SaleList>
      <FilterWrapper>
        {FILTER_DATA.map((item, index) => (
          <Filter key={index}>
            {item.title}
            <IoIosArrowDown />
          </Filter>
        ))}
      </FilterWrapper>
      <SaleList>
        <SaleTitle># 전체 {data?.length}개</SaleTitle>
      </SaleList>
      <ProductsUl>
        {data?.map((item, index) => (
          <ProductsLi key={item.product_id}>
            <ProductCard item={item} />
          </ProductsLi>
        ))}
      </ProductsUl>
    </Wrapper>
  );
}

const FILTER_DATA = [
  { title: '빠른가구배송' },
  { title: '신상가구' },
  { title: '리퍼 상품' },
  { title: '주요 소재' },
  { title: '색상' },
  { title: '사용 인원' },
  { title: '상품 유형' },
  { title: '브랜드' },
  { title: '특가' },
  { title: '공간별가구' },
  { title: '우드톤' },
];

const Wrapper = styled.div``;

const SaleList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const SaleTitle = styled.div`
  margin-left: 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.dark80};
`;

const SaleUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 150%;
`;

const SaleLi = styled.li`
  width: 16.4%;
  margin: 10px 5px;
`;

const ProductsUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 123%;
`;
const ProductsLi = styled.li`
  width: 20%;
  margin: 10px 5px;
`;

const FilterWrapper = styled.div`
  display: flex;
  margin: 20px 0px;
  font-size: 14px;
`;

const Filter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  max-height: 30px;
  padding: 5px;
  margin: 0px 6px;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.dark50};
  border: 1px solid ${({ theme }) => theme.white80};
  border-radius: 5px;

  &:hover {
    color: ${({ theme }) => theme.dark80};
  }
`;
