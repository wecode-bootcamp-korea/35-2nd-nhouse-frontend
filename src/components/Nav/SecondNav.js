import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function SecondNav() {
  return (
    <NavBar>
      <NavWrapper>
        <NavDiv>
          <Link to="/">
            <Logo alt="" src="/images/Nav/logo.png" />
          </Link>
        </NavDiv>
      </NavWrapper>
    </NavBar>
  );
}

export default SecondNav;

const NavBar = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  z-index: 1000;
  transition: top 0.4;
`;

const Logo = styled.img`
  width: 100px;
`;

const NavWrapper = styled.main`
  max-width: 1170px;
  margin: 0 auto;
  padding: 20px;
`;

const NavDiv = styled.div`
  display: flex;
  justify-content: center;
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
