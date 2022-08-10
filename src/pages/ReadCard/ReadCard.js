import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BsHeart, BsBookmark, BsChat, BsShare } from 'react-icons/bs';

export function ReadCard() {
  const [feed, setFeed] = useState({});
  const [isHovering, setIsHovering] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://3.38.183.31:8000/posts/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setFeed(data.results);
      });
  }, [params.id]);

  return (
    <ReadCardWrap>
      {feed.post &&
        feed.post.contents.map(item => {
          return (
            <Feed key={item.photo_id}>
              <ImgWrap>
                <MainImg src={item.url} alt="MainImg" />
                {item.tags.map((item, i) => {
                  return (
                    <>
                      <ImgTag
                        key={i}
                        x={item.point_x}
                        y={item.point_y}
                        onMouseOver={() => setIsHovering(item.product.id)}
                        onMouseOut={() => setIsHovering(0)}
                      >
                        <path />
                      </ImgTag>
                      {isHovering === item.product.id && (
                        <ProductModal
                          x={item.point_x}
                          y={item.point_y}
                          onMouseOver={() => setIsHovering(item.product.id)}
                          onMouseOut={() => setIsHovering(0)}
                          onClick={() => {
                            navigate(`/store/${item.product.id}`);
                          }}
                        >
                          <ProductImg
                            src={item.product.main_image}
                            alt="product"
                          />
                          <ProductTitle>{item.product.title}</ProductTitle>
                        </ProductModal>
                      )}
                    </>
                  );
                })}
              </ImgWrap>
              <MainText>{item.description}</MainText>
            </Feed>
          );
        })}
      <UserWrap>
        {feed.user && (
          <>
            <UserBtn>
              <UserImg
                src={feed.user.profile_image || '/images/userimg.png'}
                alt="UserImg"
              />
              <UserName>{feed.user.nickname || 'user'}</UserName>
            </UserBtn>
            <FollowBtn>팔로우</FollowBtn>
          </>
        )}
      </UserWrap>
      <Side>
        <StickyDiv>
          <IconWrap>
            <button>
              <BsHeart />
            </button>
            <button>
              <BsBookmark />
            </button>
            <button>
              <BsChat />
            </button>
            <button>
              <BsShare />
            </button>
          </IconWrap>
        </StickyDiv>
      </Side>
    </ReadCardWrap>
  );
}

const ReadCardWrap = styled.div`
  position: relative;
  margin-top: 160px;
`;

const Feed = styled.div`
  position: relative;
  width: calc(100% - 120px);
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 720px;
  }
`;

const ImgWrap = styled.div`
  position: relative;
`;

const ProductModal = styled.div`
  position: absolute;
  display: flex;
  ${({ x }) => {
    return `left: ${x}%;`;
  }}
  ${({ y }) => {
    return `top: ${y + 4}%;`;
  }}
  transform: translateX(-50%);
  width: 200px;
  height: 50px;
  border: 1px solid black;
  background-color: white;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 50px;
  height: 50px;
`;

const ProductTitle = styled.p``;

const MainImg = styled.img``;

const ImgTag = styled.svg`
  position: absolute;
  ${({ x }) => {
    return `left: ${x}%;`;
  }}
  ${({ y }) => {
    return `top: ${y}%;`;
  }}
  transform: translate(-50%);
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: rgba(53, 197, 240, 0.8);

  path {
    stroke: rgb(255, 255, 255);
    stroke-linecap: square;
    stroke-width: 2;
    d: path('M 12 16 V 8 m -4 4 h 8');
  }
`;

const MainText = styled.p`
  margin: 40px 0 24px;
  font-size: 16px;
  line-height: 24px;
  color: #2f3438;
  letter-spacing: -0.4px;
`;

const UserWrap = styled.div`
  position: relative;
  display: flex;
  width: calc(100% - 120px);
  max-width: 100%;
  margin: 50px auto;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  @media (min-width: 768px) {
    width: 720px;
  }
`;

const UserBtn = styled.button`
  display: flex;
  margin: 20px 5px;
  align-items: center;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
`;

const UserName = styled.span`
  margin-left: 5px;
  font-size: 18px;
`;

const FollowBtn = styled.button`
  width: auto;
  height: 40px;
  border-radius: 4px;
  margin: 20px 5px;
  padding: 0px 16px;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: rgb(255, 255, 255);
  font-weight: 700;
  border: none;
  background-color: rgb(53, 197, 240);
  cursor: pointer;
`;

const Side = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: calc(50% - 360px);
  max-width: 340px;
  height: 100%;
  padding: 0px 40px;
`;

const StickyDiv = styled.div`
  position: sticky;
  top: 182px;
`;

const IconWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    margin-bottom: 38px;
    border-radius: 100%;
    border: 1px solid rgb(194, 200, 204);
    box-shadow: rgb(63 71 77 / 15%) 0px 2px 6px;
    background-color: white;
    font-size: 24px;
  }
`;
