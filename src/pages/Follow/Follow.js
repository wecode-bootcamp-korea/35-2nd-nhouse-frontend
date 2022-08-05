import React from 'react';
import styled from 'styled-components';
import { Recommend } from './Component/Recommend';

export function Follow() {
  const loginstatus = true;
  const followuser = true;
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
      ) : (
        <LoginFollowWrap>
          <LoginDescription>
            <FollowingDescriptionTitle>
              관심있는 해시태그를 팔로우해보세요
            </FollowingDescriptionTitle>
            <FollowingDescriptionSubTitle>
              다양한 주제의 콘텐츠를 모아볼 수 있어요!
            </FollowingDescriptionSubTitle>
          </LoginDescription>
          <UserFeed>
            <UserId>아이디</UserId>
            <UserImg>
              <img
                src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/165958991107373939.jpeg?gif=1&w=640&webp=1"
                alt=""
              />
            </UserImg>
            <UserText>본문</UserText>
            <UserTag>
              <li>
                <span>#태그</span>
              </li>
              <li>
                <span>#태그</span>
              </li>
              <li>
                <span>#태그</span>
              </li>
              <li>
                <span>#태그</span>
              </li>
            </UserTag>
            <FeedIcon>아이콘</FeedIcon>
          </UserFeed>
        </LoginFollowWrap>
      )}
    </FollowWrap>
  );
}

const FollowWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 780px;
  margin: 160px auto 0;
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
const LoginFollowWrap = styled.div`
  max-width: 554px;
  width: 100%;
  margin: 0 auto;
`;

const LoginDescription = styled.div`
  height: 160px;
  margin: 30px 0;
  border: 1px solid #eaedef;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserFeed = styled.div`
  width: 100%;
  border: 1px solid #eaedef;
  border-radius: 5px;
`;

const UserId = styled.div`
  padding: 15px 16px;
`;

const UserImg = styled.div``;

const UserText = styled.div`
  padding: 16px 16px 10px;
`;

const UserTag = styled.ul`
  display: block;
  position: relative;
  padding: 0 36px 0 16px;
  margin: 0 0 10px;
  line-height: 0;
  max-height: 72px;
  overflow: hidden;

  li {
    display: inline-block;
    position: relative;
    padding: 8px 6px 0 0;

    span {
      display: inline-block;
      position: relative;
      padding: 5px 6px;
      font-size: 12px;
      line-height: 18px;
      color: #2f3438;
      background-color: #f7f8fa;
      border-radius: 4px;
    }
  }
`;

const FeedIcon = styled.div``;
