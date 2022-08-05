import React from 'react';
import styled from 'styled-components';
import { Recommend } from './Component/Recommend';

export function Follow() {
  const loginstatus = false;
  const followuser = false;
  return (
    <FollowWrap>
      {!loginstatus ? (
        <NoFollowWrap>
          <NoFollowing>
            <NoFollowingText>팔로잉 피드가 비어있어요.</NoFollowingText>
          </NoFollowing>
          <FollowingDescription>
            <FollowingDescriptionTitle>
              내일의집 유저를 팔로우해보세요!
            </FollowingDescriptionTitle>
            <FollowingDescriptionSubTitle>
              유저의 최신 소식을 한눈에 모아볼 수 있습니다.
            </FollowingDescriptionSubTitle>
          </FollowingDescription>
          <RecommendUserList>
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
            <Recommend />
          </RecommendUserList>
          <FollowBtnWrap>
            <FollowBtn>팔로잉 피드 시작해보기</FollowBtn>
          </FollowBtnWrap>
        </NoFollowWrap>
      ) : !followuser ? (
        <NoFollowWrap>
          <NoFollowing>
            <NoFollowingText>팔로잉 피드가 비어있어요.</NoFollowingText>
          </NoFollowing>
          <FollowingDescription>
            <FollowingDescriptionTitle>
              user님을 위한 추천 유저
            </FollowingDescriptionTitle>
            <FollowingDescriptionSubTitle>
              유저를 팔로우하고 새 소식을 확인하세요!
            </FollowingDescriptionSubTitle>
          </FollowingDescription>
        </NoFollowWrap>
      ) : (
        <div>
          <LoginDescription>
            <p>관심있는 해시태그를 팔로우해보세요</p>
            <p>다양한 주제의 콘텐츠를 모아볼 수 있어요!</p>
          </LoginDescription>
          <div>
            <div>아이디</div>
            <div>이미지</div>
            <div>본문</div>
            <div>태그</div>
            <div>아이콘</div>
          </div>
        </div>
      )}
    </FollowWrap>
  );
}

const FollowWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 780px;
  margin: 0px auto;
`;

const NoFollowWrap = styled.div``;

const NoFollowing = styled.div``;

const NoFollowingText = styled.p`
  margin-top: 30px;
  padding: 50px;
  font-size: 16px;
  border: 0px;
  border-radius: 8px;
  background: rgb(247, 248, 250);

  text-align: center;
`;

const FollowingDescription = styled.div`
  padding-top: 60px;
  padding-bottom: 55px;
`;

const FollowingDescriptionTitle = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

const FollowingDescriptionSubTitle = styled.p`
  margin-top: 16px;

  text-align: center;
  font-size: 14px;
`;

const RecommendUserList = styled.ul`
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 60px;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 50%;
    bottom: 20px;
    width: 1px;
    background: rgb(234, 235, 239);

    @media (max-width: 740px) {
      width: 0;
    }
  }

  @media (max-width: 740px) {
    margin: 0 auto;
  }
`;

const FollowBtnWrap = styled.div`
  width: 100%;
  text-align: center;
  margin: 0 auto;
  height: 80px;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.7) 30%,
    rgb(255, 255, 255) 87%
  );
`;

const FollowBtn = styled.button`
  width: 500px;
  height: 60px;
  margin-bottom: 20px;
  background-color: rgb(53, 197, 240);
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

const LoginDescription = styled.div``;
