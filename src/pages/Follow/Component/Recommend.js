import styled from 'styled-components';

export const Recommend = ({ userData }) => {
  console.log();
  return (
    <RecommendUser>
      <UserWrap>
        <ProfileImg
          src={
            userData.user.profile_image
              ? userData.user.profile_image
              : '/images/userimg.png'
          }
          alt="ProfileImg"
        />
        <UserTextWrap>
          <UserName>
            {userData.user.nickname ? userData.user.nickname : 'user'}
          </UserName>
          <UserTag>#30평대 #아파트 #아기와 함께</UserTag>
          <UserTitle>아이와 함께사는 사랑가득한 집</UserTitle>
          <FollowCheckBox
            type="checkbox"
            //onChange={e => onChecked(e.target.checked, item)}
            //checked={checkedList.includes(item) ? true : false}
          />
        </UserTextWrap>
      </UserWrap>
      <ImgWrap>
        {userData.posts &&
          userData.posts.map((item, i) => {
            return (
              <ImgWrapper key={i}>
                <UserImg src={item.cover_image} alt="UserImg" />
              </ImgWrapper>
            );
          })}
      </ImgWrap>
    </RecommendUser>
  );
};

const RecommendUser = styled.li`
  max-width: 370px;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 10px;

  padding: 0px 16px 20px;

  @media (max-width: 740px) {
    margin: 0 auto;
    width: 100%;
    max-width: 730px;
  }
`;

const UserWrap = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const UserTextWrap = styled.div`
  flex: 1 1 0%;
  padding-left: 10px;
  height: 40px;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 100px;
  margin-bottom: 5px;
`;

const UserName = styled.span`
  top: 0;
  font-size: 15px;
  font-weight: 700;
`;

const UserTag = styled.span`
  display: inline-block;
  margin-left: 5px;
  color: rgb(99, 145, 230);
  font-size: 12px;
  letter-spacing: -0.5px;
`;

const UserTitle = styled.span`
  overflow: hidden;
  margin: -5px 0px;
  padding: 5px 0px;
  color: rgb(130, 140, 148);
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FollowCheckBox = styled.input`
  position: absolute;
  right: 0;
  top: 0;
  width: 22px;
  height: 22px;
  margin: 9px 9px;
`;

const ImgWrap = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  @media (max-width: 740px) {
    height: 150px;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 8px;
`;

const UserImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
