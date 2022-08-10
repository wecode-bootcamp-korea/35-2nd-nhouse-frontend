import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsHeart, BsBookmark, BsChat } from 'react-icons/bs';

export function CardCollections() {
  const [photoCardList, setPhotoCardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://3.38.183.31:8000/posts/list?limit=40`)
      .then(res => res.json())
      .then(data => {
        setPhotoCardList(data.posts);
      });
  }, []);

  return (
    <CardCollectionsWrap>
      <CardListWrap>
        <CardList>
          {photoCardList.map(item => {
            return (
              <Card key={item.id}>
                <UserWrap>
                  <UserName>
                    {item.user.nickname ? item.user.nickname : 'user'}
                  </UserName>
                  <FollowBtn>·팔로우</FollowBtn>
                  <UserProfile
                    src={
                      item.user.profile_image
                        ? item.user.profile_image
                        : 'images/userimg.png'
                    }
                  />
                  <UserIntro>
                    취향과 감성담아 삶의 공간 가꾸기/ 오하우스 시즌6
                  </UserIntro>
                </UserWrap>
                <ImgWrap
                  onClick={() => {
                    navigate(`/card_collections/${item.id}`);
                  }}
                >
                  <CardIMG src={item.cover_image} alt="CardIMG" />
                </ImgWrap>
                <IconWrap>
                  <IconButton>
                    <BsHeart />
                  </IconButton>
                  <IconButton>
                    <BsBookmark />
                  </IconButton>
                  <IconButton>
                    <BsChat />
                  </IconButton>
                </IconWrap>
                <TextWrap>
                  <Text>{item.first_description}</Text>
                </TextWrap>
              </Card>
            );
          })}
        </CardList>
      </CardListWrap>
    </CardCollectionsWrap>
  );
}

const CardCollectionsWrap = styled.div`
  position: relative;
  width: calc(100% - 120px);
  max-width: 100%;
  margin: 160px auto 0;

  @media (min-width: 1256px) {
    width: 1136px;
  }
`;

const CardListWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: 50px auto;
`;

const CardList = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Card = styled.li`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  width: 23.5%;
  margin: 10px 5px;
  padding: 0 5px 40px;
  overflow: hidden;
`;

const UserWrap = styled.div`
  position: relative;
  min-height: 36px;
  margin-bottom: 16px;
  padding-left: 48px;
`;

const UserName = styled.span`
  font-size: 15px;
  font-weight: 500;
  line-height: 19px;
`;

const FollowBtn = styled.button`
  border: none;
  background-color: white;
  font-size: 15px;
  font-weight: 700;
  color: #35c5f0;
  line-height: 19px;
`;

const UserProfile = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  border-radius: 100%;
`;

const UserIntro = styled.p`
  margin-top: 2px;
  font-size: 12px;
  color: #757575;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardIMG = styled.img`
  width: 100%;
  height: 100%;
  min-height: 180px;
  max-height: 180px;
  border-radius: 5px;
  cursor: pointer;
`;

const ImgWrap = styled.div`
  width: 100%;
`;

const IconWrap = styled.div`
  display: flex;
  width: 100%;
`;

const IconButton = styled.button`
  flex: 1 0 0px;
  height: 56px;
  border: none;
  background: none;
  font-size: 20px;
`;

const TextWrap = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Text = styled.p`
  display: -webkit-box;
  width: 100%;
  max-height: 66px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  font-size: 15px;
  line-height: 22px;
  text-overflow: ellipsis;
  letter-spacing: -0.4px;
`;
