import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Accordion } from './Accordion';
import API from '../../config';

export function Category() {
  const [data, setData] = useState();

  const getData = async () => {
    const response = await fetch(API.productList);
    const result = await response.json();
    setData(result.results);
  };

  const changesData = async id => {
    const response = await fetch(`${API.subCategory}${id}`);
    const result = await response.json();
    setData(result.results);
    console.log(response);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <CategoryContainer>
        {CATEGORY_DATA.map(item => (
          <Accordion
            changesData={changesData}
            category={item}
            key={item.title}
          />
        ))}
      </CategoryContainer>
      <ProductContainer>
        <Outlet context={{ data: data }} />
      </ProductContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  max-width: 1256px;
  margin: 180px auto;
  gap: 35px;
`;

const CategoryContainer = styled.div`
  position: sticky;
  height: fit-content;
  top: 200px;
`;

const ProductContainer = styled.div``;

const CATEGORY_DATA = [
  {
    title: '가구',
    id: '1',
    subCategory: [
      {
        title: '침대',
        id: '1',
      },
      {
        title: '소파',
        id: '2',
      },
      {
        title: '테이블',
        id: '3',
      },
    ],
  },
  {
    title: '침구',
    id: '2',
    subCategory: [
      {
        title: '침구세트',
        id: '4',
      },
      {
        title: '토퍼',
        id: '5',
      },
    ],
  },
  {
    title: '쿠션',
    id: '3',
    subCategory: [
      {
        title: '쿠션',
        id: '6',
      },
      {
        title: '방석',
        id: '7',
      },
      {
        title: '등쿠션',
        id: '8',
      },
    ],
  },
];
