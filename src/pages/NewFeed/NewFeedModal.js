import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import API from '../../config';

export const NewFeedModal = ({
  className,
  children,
  onClose,
  getModalSelectedId,
}) => {
  const [searchValue, setSearchValue] = useState();
  const [searchedValue, setSearchedValue] = useState([]);

  async function request() {
    const res = await fetch(`${API.search}${searchValue}`);
    const result = await res.json();
    setSearchedValue(result.result);
  }

  useEffect(() => {
    const timeoutExecute = setTimeout(() => request(), 500);
    return () => clearTimeout(timeoutExecute);
  }, [searchValue]);

  const onClick = (e, index) => {
    getModalSelectedId(searchedValue[index].id);
  };

  return (
    <ModalWrapper className={className} tabIndex="-1">
      <ModalInner tabIndex="0" className="modal-inner">
        <ModalInnerContainer>
          <ModalSearchArea>
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="상품명, 브랜드를 검색해보세요."
            />
            <button type="button" onClick={onClose}>
              취소
            </button>
          </ModalSearchArea>
          {!searchedValue.length ? (
            <ModalListAreaEmpty>{children}</ModalListAreaEmpty>
          ) : (
            <ModalListArea>
              {searchedValue.map((product, index) => {
                return (
                  <SearchedContainer key={index}>
                    <SearchedProduct>
                      <SearchedImage>
                        <img src={product.main_image} alt="searchedImage" />
                      </SearchedImage>
                      <SearchedTitle>
                        <span>
                          {product.brand}
                          <p>{product.title}</p>
                        </span>
                      </SearchedTitle>
                    </SearchedProduct>
                    <SearchedSelect
                      type="button"
                      onClick={e => {
                        // e.stopPropagation();
                        onClick(e, index);
                      }}
                    >
                      선택
                    </SearchedSelect>
                  </SearchedContainer>
                );
              })}
            </ModalListArea>
          )}
        </ModalInnerContainer>
      </ModalInner>
    </ModalWrapper>
  );
};

NewFeedModal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 30px;
  right: 50%;
  transform: translateX(50%);
  width: 377px;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  border-radius: 10px;
  width: 100%;
  max-width: 377px;
  height: fit-content;
  margin: 0 auto;
`;

const ModalInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ModalSearchArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 15px 10px;

  button {
    width: 38px;
    height: 40px;
    padding: 3px 5px;
    font-size: 14px;
    font-weight: bold;
    border: none;
    background-color: #ffffff;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    max-width: 300px;
    height: 40px;
    padding: 8px 15px 9px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    transition: background-color 0.1s ease 0s;

    &:hover {
      background-color: #fafafa;
    }

    &:focus {
      outline: 2px solid #c2edfa;
      background-color: #ffffff;
    }

    &::placeholder {
      font-size: 14px;
      color: #bdbdbd;
    }
  }
`;

const ModalListAreaEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  min-height: 375px;
  padding: 10px;
  font-size: 15px;
  color: #9e9e9e;
  line-height: 23px;
`;

const ModalListArea = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 375px;
  padding: 10px 0;
`;

const SearchedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 5px 15px;
`;

const SearchedProduct = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const SearchedImage = styled.div`
  width: 70px;
  height: 70px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const SearchedTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  line-height: 20px;

  span {
    font-weight: bold;
    font-size: 11px;

    p {
      font-weight: lighter;
      font-size: 13px;
    }
  }
`;

const SearchedSelect = styled.button`
  padding: 6px 15px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background-color: #35c5f0;
  transition: background-color 0.1s ease 0s;
  border: none;
  border-radius: 5px;
`;
