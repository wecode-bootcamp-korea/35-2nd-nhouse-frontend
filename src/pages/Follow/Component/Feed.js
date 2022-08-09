import React, { useState } from 'react';
import styled from 'styled-components';
import { BsHeart, BsBookmark, BsChat, BsShare } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const TAGLIST = [
  '#태그11111111',
  '#태그2222222',
  '#태그333333333',
  '#태그4444',
  '#태그555',
  '#태그66666',
  '#태그77777',
  '#태그8888',
  '#태그999999',
  '#태그1010',
  '#태그11',
];

export const Feed = ({ item }) => {
  const navigate = useNavigate();
  const [isExpand, setIsExpand] = useState(false);
  const threeLine = 70;

  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  return (
    <UserFeed>
      <UserId>
        <IdWrap>
          <ProfileImg
            src={
              item.user.profile_image
                ? item.user.profile_image
                : '/images/userimg.png'
            }
            alt="ProfileImg"
          />
          <UserIdText>
            {item.user.nickname ? item.user.nickname : 'user'}
          </UserIdText>
          <UserWriteDate>1일전</UserWriteDate>
        </IdWrap>
        <BtnWrap>
          <MoreBtn>
            <FiMoreHorizontal />
          </MoreBtn>
        </BtnWrap>
      </UserId>
      <UserImgWrap>
        <UserImg
          src={item.cover_image}
          alt="UserImg"
          onClick={item => {
            navigate(`/card_collections/${item.id}`);
          }}
        />
      </UserImgWrap>
      <UserTextWrap>
        <UserText isExpand={isExpand}>{item.first_description}</UserText>
        {item.first_description.length > threeLine && (
          <ExpandBtn onClick={handleExpand}>
            {isExpand ? '접어두기' : '더보기'}
          </ExpandBtn>
        )}
      </UserTextWrap>
      <UserTagList>
        {TAGLIST.map((item, i) => {
          return (
            <UserTag key={i}>
              <UserTagText>{item}</UserTagText>
            </UserTag>
          );
        })}
      </UserTagList>
      <FeedIcon>
        <IconButton>
          <BsHeart />
        </IconButton>
        <IconButton>
          <BsBookmark />
        </IconButton>
        <IconButton>
          <BsChat />
        </IconButton>
        <IconButton>
          <BsShare />
        </IconButton>
      </FeedIcon>
    </UserFeed>
  );
};

const UserFeed = styled.div`
  width: 100%;
  border: 1px solid #eaedef;
  box-shadow: 0 2px 4px rgb(234 235 239 / 80%);
  border-radius: 5px;
  margin-bottom: 30px;
`;

const UserId = styled.div`
  padding: 15px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IdWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100px;

  margin-right: 12px;
`;

const UserIdText = styled.p`
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
`;

const UserWriteDate = styled.p`
  margin-left: 8px;
  color: #828c94;
  font-size: 13px;
  line-height: 18px;
`;

const BtnWrap = styled.div``;

const MoreBtn = styled.button`
  background-color: white;
  border: none;
  font-size: 20px;
`;

const UserImgWrap = styled.div`
  cursor: pointer;
`;

const UserImg = styled.img``;

const UserTextWrap = styled.div`
  padding: 16px 16px 10px;
`;

const ExpandBtn = styled.button`
  position: relative;
  margin: 2px 0px 0px;
  padding: 0px;
  border: none;
  background: none;
  color: rgb(164, 172, 179);
  font-weight: bold;
  white-space: nowrap;
  z-index: 2;
  cursor: pointer;
`;

const UserText = styled.p`
  max-height: ${props => (props.isExpand ? 'none' : '44px')};
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${props => (props.isExpand ? 'inline' : '-webkit-box')};
  -webkit-line-clamp: ${props => (props.isExpand ? null : '2')};
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  font-size: 15px;
`;

const UserTagList = styled.ul`
  display: block;
  position: relative;
  padding: 0 36px 0 16px;
  margin: 0 0 10px;
  line-height: 0;
  max-height: 72px;
  overflow: hidden;
`;

const UserTag = styled.li`
  display: inline-block;
  position: relative;
  padding: 8px 6px 0 0;
`;

const UserTagText = styled.span`
  display: inline-block;
  position: relative;
  padding: 5px 6px;
  font-size: 12px;
  line-height: 18px;
  color: #2f3438;
  background-color: #f7f8fa;
  border-radius: 4px;
`;

const FeedIcon = styled.div`
  padding: 3px 0;
  display: flex;
`;

const IconButton = styled.button`
  flex: 1 0 0px;
  border: none;
  background: none;
  height: 56px;

  font-size: 20px;
`;
