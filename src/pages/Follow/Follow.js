import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Recommend } from './Component/Recommend';
import { Feed } from './Component/Feed';

export function Follow() {
  const [followingFeed, setFollowingFeed] = useState([]);
  const token = localStorage.getItem('token');
  const loginstatus = token;
  const followuser = followingFeed.total;

  //const loginstatus = true;
  //const followuser = false;
  //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozNX0.YQfRhXORRRxngur6OYuhXVgy5Kqvb2M7ypGV96bHuL4';

  useEffect(() => {
    fetch(`http://10.58.1.43:3000/posts/follow`, {
      headers: {
        Authorization: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setFollowingFeed(data);
      });
  }, [token]);

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
            {followingFeed.result &&
              followingFeed.result.map((item, i) => {
                return <Recommend key={i} userData={item} />;
              })}
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
            {followingFeed.result &&
              followingFeed.result.map((item, i) => {
                return <Recommend key={i} userData={item} />;
              })}
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
          {followingFeed.posts &&
            followingFeed.posts.map((item, i) => {
              return <Feed key={i} item={item} />;
            })}
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
