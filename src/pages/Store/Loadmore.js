import React, { useEffect, useState, useDeferredValue } from 'react';
import styled from 'styled-components';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { FaSpinner } from 'react-icons/fa';

import API from '../../config';

export function Loadmore() {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(false);
  const deferredItems = useDeferredValue(items, { timeoutMs: 5000 });
  useEffect(() => {
    const isBottom = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        setLoading(true);
        setOffset(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', isBottom);
    return () => {
      window.removeEventListener('scroll', isBottom);
    };
  }, []);

  const getItems = async () => {
    const response = await fetch(
      `${API.productList}limit=${8}&offset=${offset}`
    );
    const result = await response.json();
    if (!result.exist_nest_page) {
      setOffset(1);
    }
    setItems(prev => prev.concat(result.results));
    setLoading(false);
  };

  useEffect(() => {
    getItems();
  }, [offset]);

  return (
    <ProductsUl>
      {deferredItems?.map((item, index) => (
        <ProductsLi key={item.product_id + index}>
          <ProductCard item={item} />
        </ProductsLi>
      ))}
      {loading && <Spinner />}
    </ProductsUl>
  );
}

const ProductsUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  position: relative;
`;
const ProductsLi = styled.li`
  width: 20%;
  margin: 10px 5px;
`;

const Spinner = styled(FaSpinner)`
  position: absolute;
  left: 38%;
  bottom: -55px;
  font-size: 80px;
  color: ${({ theme }) => theme.blue};
  animation: spin 2s linear infinite;
  z-index: 1002;
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
