import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

import { BiSearchAlt } from 'react-icons/bi';
import { BsCart2 } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';

export function Nav() {
  const [location, setLocation] = useState();
  const [position, setPosition] = useState(false);
  const isStore = location === 'store';

  useEffect(() => {
    let lastScrollY = 0;
    let result = true;
    const updateScroll = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY;
      lastScrollY = scrollY;
      if (direction === result) {
        return;
      }
      result = direction;
      return setPosition(direction);
    };
    window.addEventListener('scroll', updateScroll);
    return () => {
      document.removeEventListener('scroll', updateScroll);
    };
  }, []);

  const clickTab = category => {
    setLocation(category);
  };

  const subCategory = () => {
    return isStore ? STORE_DATA : COMMUNITY_DATA;
  };

  return (
    <>
      <NavBar>
        <NavWrapper>
          <NavDiv>
            <Link to="/">
              <Logo alt="로고" src="/images/Nav/logo.png" />
            </Link>
            <NavUl>
              {NAV_DATA.map(item => (
                <NavLi key={item.title} onClick={() => clickTab(item.category)}>
                  <NavLinkStyled to={item.link}>{item.title}</NavLinkStyled>
                </NavLi>
              ))}
            </NavUl>
            <SearchDiv>
              <SearchIcon />
              <input type="text" placeholder="통합검색" />
            </SearchDiv>
            <NavUl>
              {MEMBER_DATA.map(item => (
                <NavLi key={item.title} onClick={() => clickTab(item.category)}>
                  <NavLink to={item.link}>{item.title || <Cart />}</NavLink>
                </NavLi>
              ))}
            </NavUl>
            <Link to="card_collections/new">
              <Posting>
                글쓰기
                <IoIosArrowDown />
              </Posting>
            </Link>
          </NavDiv>
        </NavWrapper>
      </NavBar>
      <CategoryNav position={position}>
        <CateGoryWrapper>
          <SubUl>
            {subCategory().map(item => (
              <NavLi key={item.title} onClick={() => clickTab(item.category)}>
                <NavLinkStyled to={item.link}>{item.title}</NavLinkStyled>
              </NavLi>
            ))}
          </SubUl>
        </CateGoryWrapper>
      </CategoryNav>
    </>
  );
}

export default Nav;

const NavBar = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  z-index: 1000;
  transition: top 0.4;
`;

const NavWrapper = styled.main`
  max-width: 1170px;
  margin: 0 auto;
  padding: 20px;
`;

const NavDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Logo = styled.img`
  width: 100px;
`;

const NavUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLi = styled.li`
  padding: 10px;
`;

const NavLinkStyled = styled(NavLink)`
  font-size: 18px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.dark80};
  &:link {
    transition: 0.3s;
  }
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
  &.active {
    color: ${({ theme }) => theme.blue};
  }
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 38px;
  width: 250px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.white};

  input {
    height: 100%;
    width: 100%;
    padding-left: 35px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.white80};

    font-size: 15px;
    &:hover {
      background-color: ${({ theme }) => theme.white90};
    }
    &:focus {
      border: 1px solid ${({ theme }) => theme.blue};
    }
  }
`;

const SearchIcon = styled(BiSearchAlt)`
  font-size: 23px;
  position: absolute;
  left: 10px;
`;

const Cart = styled(BsCart2)`
  font-size: 24px;
`;

const Posting = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 94px;
  height: 40px;
  margin-left: 10px;
  padding: 0px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.blue};
  border: none;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  a {
    color: ${({ theme }) => theme.white};
  }
`;

const CategoryNav = styled.nav`
  position: fixed;
  width: 100%;
  top: ${({ position }) => (position ? '30px' : '85px')};
  background-color: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  z-index: 999;
  transition: top 0.4s;
`;

const CateGoryWrapper = styled.main`
  max-width: 1170px;
  margin: 0 auto;
  padding: 5px 20px;
`;

const SubUl = styled.ul`
  display: flex;
  align-items: center;
`;

const NAV_DATA = [
  { title: '커뮤니티', link: '/', category: 'community' },
  { title: '스토어', link: '/store', category: 'store' },
  { title: '이사/시공/수리', link: '/TEST', category: '' },
];

const MEMBER_DATA = [
  { title: '', link: '/cart', category: '' },
  { title: '로그인', link: '/users/login', category: '' },
  { title: '회원가입', link: '/signup', category: '' },
  { title: '고객센터', link: '/TEST', category: '' },
];

const COMMUNITY_DATA = [
  { title: '홈', link: '/', category: 'community' },
  { title: '팔로잉', link: '/follow', category: 'community' },
  { title: '사진', link: '/card_collections', category: 'community' },
  { title: '집들이', link: '/sns', category: 'community' },
];

const STORE_DATA = [
  { title: '스토어홈', link: '/store', category: 'store' },
  { title: '카테고리', link: '/category', category: 'store' },
  { title: '베스트', link: '/best', category: 'store' },
  { title: '오늘의딜', link: '/timedeal', category: 'store' },
];
