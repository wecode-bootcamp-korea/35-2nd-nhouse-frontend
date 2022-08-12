import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import API from '../../config';
export const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const AUTH_CODE = params.get('code');
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  const [values, setValues] = useState({
    userId: '',
    userPw: '',
  });
  const handleInput = e => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const isInputValid = values.userId.includes('@') && values.userPw.length >= 5;
  const goToMain = e => {
    e.preventDefault();
    return navigate('/');
  };
  useEffect(() => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${AUTH_CODE}`,
    })
      .then(res => res.json())
      .then(data => {
        if (data.access_token) {
          console.log(data.access_token);
          fetch(`${API.login}`, {
            method: 'GET',
            headers: {
              Authorization: data.access_token,
            },
          })
            .then(response => response.json())
            .then(result => {
              if (result.access_token) {
                localStorage.setItem('token', result.access_token);
                alert('WELCOME');
                navigate('/');
              } else {
                alert('NONONO');
                navigate('/users/login');
              }
            });
        }
      });
  }, []);
  return (
    <SignInContainer>
      <RightTop>
        <Logo>
          <img src="/images/logo.png" alt="logo" />
        </Logo>
        <Login onSubmit={goToMain}>
          <Input
            name="userId"
            onChange={handleInput}
            type="text"
            placeholder="이메일"
          />
          <Input
            name="userPw"
            onChange={handleInput}
            type="password"
            placeholder="비밀번호"
          />
          <LoginButton type="submit" disabled={!isInputValid}>
            로그인
          </LoginButton>
        </Login>
      </RightTop>
      <SignUp>
        <LoginKakao href={KAKAO_AUTH_URL}>
          <img src="/images/kakao_login_medium_narrow.png" alt="loginKakao" />
        </LoginKakao>
      </SignUp>
    </SignInContainer>
  );
};
const SignInContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  height: 100vh;
  background-color: #fafafa;
  color: #8e8e8e;
`;
const RightTop = styled.section`
  width: 100%;
  max-width: 350px;
  margin: 0 0 10px;
  padding: 10px 0;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin: 36px 0 0;
  img {
    width: 150px;
    height: 50px;
  }
`;
const Login = styled.form`
  display: flex;
  flex-direction: column;
  margin: 36px 0 10px;
`;
const Input = styled.input`
  box-sizing: border-box;
  height: 36px;
  margin: 0 40px 6px;
  padding: 9px 8px 7px;
  font-size: 11px;
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
`;
const LoginButton = styled.button`
  height: 30px;
  margin: 8px 40px;
  font-weight: bold;
  font-size: 13px;
  color: #ffffff;
  background-color: ${({ theme }) => theme.blue};
  opacity: ${props => (props.disabled ? 0.5 : 1.0)};
  border: none;
  border-radius: 4px;
  cursor: default;
`;
const SignUp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 350px;
  padding: 23.5px 0;
  margin: 0 0 10px;
  text-align: center;
  font-size: 14px;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
`;
const LoginKakao = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 150px;
  }
`;
