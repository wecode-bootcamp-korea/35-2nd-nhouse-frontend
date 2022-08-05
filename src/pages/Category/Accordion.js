import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export function Accordion({ changesData, category }) {
  const { title, subCategory } = category;
  const count = subCategory.length;

  const parentRef = useRef();
  const childRef = useRef();
  const [isCollapse, setIsCollapse] = useState(false);
  const parentRefHeight = parentRef.current?.style.height ?? '0px';
  const buttonText =
    parentRefHeight === '0px' ? <IoIosArrowDown /> : <IoIosArrowUp />;

  const handleButtonClick = useCallback(
    event => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = '0';
      } else {
        parentRef.current.style.height = `${
          childRef.current.clientHeight * count
        }px`;
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse, count]
  );

  return (
    <Wrapper>
      <Container>
        <SideContainer>
          <Header onClick={handleButtonClick}>
            {title}
            <Button>{buttonText}</Button>
          </Header>
          <ContentsWrapper ref={parentRef}>
            {subCategory.map(item => (
              <Contents
                onClick={() => changesData(item.id)}
                key={item.title}
                ref={childRef}
              >
                {item.title}
              </Contents>
            ))}
          </ContentsWrapper>
        </SideContainer>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1256px;
  margin: 0 auto;
`;

const SideContainer = styled.div`
  width: 200px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;

  margin-left: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  height: 50px;
  margin: 0 16px 0 8px;

  font-size: 18px;
`;

const Button = styled.div`
  top: 8px;
  right: 8px;
  font-size: 14px;
  position: absolute;
`;

const ContentsWrapper = styled.div`
  height: 0;
  width: inherit;
  padding: 0 3px;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
`;

const Contents = styled.div`
  margin-left: 20px;
  padding: 12px 0px;
  font-size: 14px;
  color: ${({ theme }) => theme.dark50};

  &:hover {
    color: ${({ theme }) => theme.dark80};
  }
`;
