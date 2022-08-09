import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import API from '../../config';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};
const settings2 = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 5,
  autoplay: false,
};

const CATEGORY = [
  { id: 1, title: '전체' },
  { id: 2, title: '가구' },
  { id: 3, title: '패브릭' },
  { id: 4, title: '조명' },
  { id: 5, title: '가전' },
  { id: 6, title: '주방용품' },
  { id: 7, title: '데코·식물' },
  { id: 8, title: '수납·정리' },
  { id: 9, title: '생활용품' },
  { id: 10, title: '생필품' },
  { id: 11, title: '공구·DIY' },
  { id: 12, title: '인테리어시공' },
  { id: 13, title: '반려동물' },
  { id: 14, title: '캠핑용품' },
  { id: 15, title: '실내운동' },
  { id: 16, title: '유아·아동' },
  { id: 17, title: '렌탈' },
  { id: 18, title: '식품' },
];

export function Community() {
  const navigate = useNavigate();

  const [communityCarousel, setCommunityCarousel] = useState([]);
  const [categoryCarousel, setCategoryCarousel] = useState([]);
  const [communityNavigation, setCommunityNavigation] = useState([]);
  const [communityHomeStory, setCommunityHomeStory] = useState([]);
  const [communityHotPhoto, setCommunityHotPhoto] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedCategoryProduct, setSelectedCategoryProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);

  useEffect(() => {
    fetch(API.allProduct)
      .then(res => res.json())
      .then(data => {
        setProductList(data.results);
      });

    fetch('/data/Carousel.json')
      .then(res => res.json())
      .then(data => {
        setCommunityCarousel(data);
      });

    fetch('/data/CategoryCarousel.json')
      .then(res => res.json())
      .then(data => {
        setCategoryCarousel(data);
      });

    fetch('/data/CommunityNav.json')
      .then(res => res.json())
      .then(data => {
        setCommunityNavigation(data);
      });

    fetch('/data/CommunityHomeStory.json')
      .then(res => res.json())
      .then(data => {
        setCommunityHomeStory(data);
      });

    fetch('/data/CommunityHotPhoto.json')
      .then(res => res.json())
      .then(data => {
        setCommunityHotPhoto(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${API.allProduct}?first_category=${selectedCategory}`)
      .then(res => res.json())
      .then(data => {
        setSelectedCategoryProduct(data.results);
      });
  }, [selectedCategory]);

  const categorySelect = item => {
    setSelectedCategory(item.id);
  };

  return (
    <CommunityWrap>
      <HeadContainer>
        <HomeHead>
          <MainIMG
            src="https://image.ohou.se/i/bucketplace-v2-development/uploads/projects/cover_images/165702518410463428.jpg?gif=1&w=850&h=567&c=c&webp=1"
            alt="HomeHead"
          />
          <MainTextWrap>
            <MainTitle>
              유럽 라이프를 그대로 살린 와인 한잔 생각나는 집
            </MainTitle>
            <MainWriter>@konkel196</MainWriter>
            <ShowMainTilte>
              <ShowMainTilteText>보러가기</ShowMainTilteText>
            </ShowMainTilte>
          </MainTextWrap>
        </HomeHead>
        <HomeBanner>
          <StyledSlider {...settings}>
            {communityCarousel.map(carousel => {
              return (
                <Banner key={carousel.id}>
                  <BannerIMG src={carousel.img} alt="carousel" />
                </Banner>
              );
            })}
          </StyledSlider>
        </HomeBanner>
      </HeadContainer>
      <CommunityNav>
        <CommunityUl>
          {communityNavigation.map(item => {
            return (
              <CommunityLi key={item.id}>
                <CommunityNavIMG src={item.img} alt="communityNavigation" />
                <CommunityNavTitle>{item.title}</CommunityNavTitle>
              </CommunityLi>
            );
          })}
        </CommunityUl>
      </CommunityNav>
      <HomeStory>
        <Subtitle>오늘의 스토리</Subtitle>
        <ProductUl>
          {communityHomeStory.map(item => {
            return (
              <HomeStoryList key={item.id}>
                <HomeStoryWrap>
                  <HomeStoryWrapDiv>
                    <HomeStoryIMG src={item.img} alt="HomeStoryIMG" />
                  </HomeStoryWrapDiv>
                  <StoryDescriptionWrap>
                    <StoryDescription>{item.title}</StoryDescription>
                    <StoryDescriptionWriter>
                      <StoryWriterImg
                        src={item.writerImg}
                        alt="StoryWriterImg"
                      />
                      <StoryWriter>{item.writer}</StoryWriter>
                    </StoryDescriptionWriter>
                  </StoryDescriptionWrap>
                </HomeStoryWrap>
              </HomeStoryList>
            );
          })}
          <HomeStoryList>
            <HomeStoryContent>
              <HomeStoryContentWrap>
                <HomeStoryContentSubTitle>
                  예쁜 집 구경하기
                </HomeStoryContentSubTitle>
                <HomeStoryContentTitle>집들이</HomeStoryContentTitle>
              </HomeStoryContentWrap>
              <HomeStoryContentWrap>
                <HomeStoryContentSubTitle>
                  전문가 시공사례
                </HomeStoryContentSubTitle>
                <HomeStoryContentTitle>전문가 집들이</HomeStoryContentTitle>
              </HomeStoryContentWrap>
              <HomeStoryContentWrap>
                <HomeStoryContentSubTitle>
                  인테리어 꿀팁 총 집합
                </HomeStoryContentSubTitle>
                <HomeStoryContentTitle>노하우</HomeStoryContentTitle>
              </HomeStoryContentWrap>
            </HomeStoryContent>
          </HomeStoryList>
        </ProductUl>
      </HomeStory>
      <HomeCategory>
        <Subtitle>카테고리별 상품 찾기</Subtitle>
        <CategorySlider {...settings2}>
          {categoryCarousel.map(carousel => {
            return (
              <HomeCategoryWrap key={carousel.id}>
                <HomeCategoryIMG src={carousel.img} alt="HomeCategoryIMG" />
                <HomeCategoryTitle>{carousel.category}</HomeCategoryTitle>
              </HomeCategoryWrap>
            );
          })}
        </CategorySlider>
      </HomeCategory>
      <TodayDeal>
        <TitleWrap>
          <Subtitle>오늘의딜</Subtitle>
          <More>더보기</More>
        </TitleWrap>
        <ProductUl>
          {productList.length &&
            productList.slice(0, 4).map((item, i) => {
              return (
                <ProductLi key={i}>
                  <ProductCard timeSale={true} item={item} />
                </ProductLi>
              );
            })}
        </ProductUl>
      </TodayDeal>
      <TodayPhoto>
        <TitleWrap>
          <Subtitle>오늘의 인기 사진</Subtitle>
          <More>더보기</More>
        </TitleWrap>
        <TodayPhotoUl>
          {communityHotPhoto.length &&
            communityHotPhoto.map(item => {
              return (
                <TodayPhotoLi
                  key={item.id}
                  onClick={() => {
                    navigate('/card_collections/1');
                  }}
                >
                  <TodayPhotoIMG src={item.img} alt="TodayPhotoIMG" />
                  <WriterImg src={item.writerImg} alt="WriterImg" />
                  <PhotoWriter>{item.writer}</PhotoWriter>
                </TodayPhotoLi>
              );
            })}
        </TodayPhotoUl>
      </TodayPhoto>
      <Premium>
        <TitleWrap>
          <Subtitle>프리미엄도 내일의집!</Subtitle>
          <More>더보기</More>
        </TitleWrap>
        <ProductUl>
          {productList.length &&
            productList.slice(4, 8).map((item, i) => {
              return (
                <ProductLi key={i}>
                  <ProductCard item={item} />
                </ProductLi>
              );
            })}
        </ProductUl>
      </Premium>
      <BestItem>
        <TitleWrap>
          <Subtitle>베스트</Subtitle>
        </TitleWrap>
        <BestCategory>
          {CATEGORY.map((item, i) => {
            return (
              <BestCategoryLi
                key={i}
                onClick={() => {
                  categorySelect(item);
                }}
                select={item.id === selectedCategory}
              >
                {item.title}
              </BestCategoryLi>
            );
          })}
        </BestCategory>
        <ProductUl>
          {selectedCategoryProduct.length &&
            selectedCategoryProduct.slice(0, 3).map((item, i) => {
              return (
                <ProductLi key={i}>
                  <ProductCard item={item} />
                </ProductLi>
              );
            })}
          <ProductLi>
            <BestContent>
              <BestContentText>베스트셀러 더보기</BestContentText>
            </BestContent>
          </ProductLi>
        </ProductUl>
      </BestItem>
      <CommunityNotice>
        <Notice>
          <NoticeTitle>
            <OpenIcon>OPEN</OpenIcon>
            전문가 가입신청
          </NoticeTitle>
          <NoticeDescription>
            인테리어 전문가님! 내일의집과 함께하세요
          </NoticeDescription>
        </Notice>
        <Notice>
          <NoticeTitle>사업자 구매 회원 전환</NoticeTitle>
          <NoticeDescription>
            사업자 회원에게 구매 시 혜택을 드립니다
          </NoticeDescription>
        </Notice>
      </CommunityNotice>
    </CommunityWrap>
  );
}

const CommunityWrap = styled.div`
  margin: 160px auto 0;

  @media (min-width: 1256px) {
    width: 1256px;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 120px);
  max-width: 100%;
  max-height: 570px;
  margin: 0 auto;
`;

const ShowMainTilte = styled.div`
  position: absolute;
  top: 85%;
  left: 75%;
  width: 140px;
  border: 2px solid white;
  border-radius: 5px;
  align-items: center;

  @media (max-width: 1050px) {
    left: 65%;
  }
`;

const HomeHead = styled.div`
  position: relative;
  flex: 7;
  margin: 0 10px;
  border-radius: 5px;
  overflow: hidden;

  &:hover ${ShowMainTilte} {
    background-color: #35c5f0;
    border: none;
  }
`;

const MainIMG = styled.img`
  width: 100%;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    transform: scale(1.15);
  }
`;

const MainTextWrap = styled.div``;

const MainTitle = styled.p`
  position: absolute;
  top: 80%;
  left: 5%;
  max-width: 500px;
  font-size: 32px;
  font-weight: 700;
  color: white;

  @media (max-width: 1050px) {
    max-width: 300px;
    font-size: 24px;
  }
`;

const MainWriter = styled.p`
  position: absolute;
  top: 93%;
  left: 5%;
  font-size: 13px;
  color: white;
`;

const ShowMainTilteText = styled.p`
  margin: 20px 20px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: white;
`;

const HomeBanner = styled.div`
  position: relative;
  flex: 2;
  padding: 0px 10px;
`;

const BannerIMG = styled.img`
  max-height: 570px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    transform: scale(1.15);
  }
`;

const StyledSlider = styled(Slider)`
  width: 25vw;
  height: fit-content;
  max-height: 570px;
  border-radius: 5px;

  .slick-prev {
    left: 0;
    border: 0px;
    border-radius: 100%;
    opacity: 1;
    z-index: 1;
  }

  .slick-prev:before {
    font-size: 40px;
    color: #f6f9fa;
    opacity: 1;
  }

  .slick-next {
    right: 20px;
    border: 0px;
    border-radius: 100%;
    opacity: 1;
    z-index: 1;
  }

  .slick-next:before {
    font-size: 40px;
    color: #f6f9fa;
    opacity: 1;
  }
`;

const Banner = styled.div``;

const CommunityNav = styled.nav`
  width: 100%;
  max-width: 1256px;
  margin: 0 auto;
  padding: 0 60px;
`;

const CommunityUl = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin: 30px 0 20px;
  cursor: pointer;
`;

const CommunityLi = styled.li`
  text-align: center;
  font-size: 12px;
`;

const CommunityNavIMG = styled.img``;

const CommunityNavTitle = styled.p`
  margin: 4px 0 7px;
`;

const HomeStory = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 120px);
  max-width: 100%;
  margin: 50px auto;
`;

const HomeStoryList = styled.li`
  display: flex;
  flex: 2;
  padding: 0 10px;
`;

const HomeStoryWrap = styled.div`
  height: fit-content;
  overflow: hidden;
`;

const HomeStoryWrapDiv = styled.div`
  flex: 2;
  height: fit-content;
  overflow: hidden;
`;

const HomeStoryIMG = styled.img`
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    transform: scale(1.15);
  }
`;

const HomeStoryContent = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
`;

const HomeStoryContentSubTitle = styled.p`
  margin-bottom: 10px;
  font-size: 12px;
`;

const HomeStoryContentTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
`;

const HomeStoryContentWrap = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  padding: 12.5px 10%;
  margin: 0.5px 0;
  background-color: #f5f5f5;
  cursor: pointer;
`;

const StoryDescriptionWrap = styled.div`
  position: relative;
  height: 122px;
  padding: 15px 10px;
`;

const StoryDescription = styled.p`
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  text-overflow: ellipsis;
  word-wrap: break-word;
`;

const StoryWriterImg = styled.img`
  position: absolute;
  top: 0;
  width: 22px;
  height: 22px;
  border-radius: 100px;
  z-index: 2;
`;

const StoryDescriptionWriter = styled.div`
  position: relative;
  margin-top: 5px;
  font-size: 13px;
`;

const StoryWriter = styled.p`
  margin-left: 28px;
  padding-top: 2px;
`;

const HomeCategory = styled.div`
  width: calc(100% - 120px);
  max-width: 100%;
  margin: 50px auto;
`;

const HomeCategoryWrap = styled.div`
  cursor: pointer;
`;

const HomeCategoryIMG = styled.img``;

const HomeCategoryTitle = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #424242;
`;

const CategorySlider = styled(Slider)`
  width: 100%;
  height: 100%;

  .slick-prev {
    top: 55px;
    left: -10px;
    border: 0px;
    border-radius: 100%;
    opacity: 1;
    z-index: 1;
  }

  .slick-prev:before {
    font-size: 40px;
    color: #000000;
    opacity: 1;
  }

  .slick-next {
    top: 55px;
    right: 10px;
    border: 0px;
    border-radius: 100%;
    opacity: 1;
    z-index: 1;
  }

  .slick-next:before {
    font-size: 40px;
    color: #000000;
    opacity: 1;
  }
`;

const TodayDeal = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 120px);
  max-width: 100%;
  margin: 50px auto;
`;

const ProductUl = styled.ul`
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
`;

const ProductLi = styled.li`
  flex: 0 0 23%;
`;

const More = styled.span`
  padding-top: 6px;
  font-size: 15px;
  font-weight: 700;
  color: #35c5f0;
`;

const TodayPhoto = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 120px);
  max-width: 100%;
  margin: 50px auto;
`;

const TodayPhotoUl = styled.ul`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const PhotoWriter = styled.p`
  position: absolute;
  top: 91%;
  left: 14%;
  font-size: 13px;
  color: white;
`;

const TodayPhotoLi = styled.li`
  display: flex;
  position: relative;
  flex: 0 0 23%;
  width: 100%;
  height: 100%;
  padding-bottom: 25%;
  margin: 10px 5px;
  overflow: hidden;
`;

const TodayPhotoIMG = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    transform: scale(1.15);
  }
`;

const WriterImg = styled.img`
  position: absolute;
  top: 90%;
  left: 3%;
  width: 22px;
  height: 22px;
  border-radius: 100px;
  z-index: 2;
  border: 2px solid white;
`;

const Premium = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 120px);
  max-width: 100%;
  margin: 50px auto;
`;

const BestItem = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 120px);
  max-width: 100%;
  margin: 50px auto;
`;

const BestCategory = styled.ul`
  height: 45px;
  margin: 10px 0;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
  }
`;

const BestCategoryLi = styled.li`
  display: inline;
  height: 100%;
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;

  ${({ select }) => {
    return select ? `color: #35c5f0` : `color: black`;
  }}
`;

const BestContent = styled.div`
  position: relative;
  display: flex;
  width: 20vw;
  height: calc(100% - 100.5px);
  margin-top: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

const BestContentText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const CommunityNotice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: calc(100% - 120px);
  max-width: 100%;
  margin: 50px auto;
`;

const Notice = styled.div`
  width: 40vw;
  padding: 23px 30px;
  margin: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;

const NoticeTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
`;

const NoticeDescription = styled.span`
  margin-left: 20px;
  vertical-align: 1px;
  font-size: 12px;
  color: #757575;
`;

const OpenIcon = styled.span`
  padding: 2px;
  margin: 2px;
  vertical-align: 2px;
  font-size: 12px;
  background-color: rgb(255, 119, 119);
  color: white;
  border-radius: 10px;
`;

const Subtitle = styled.h2`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
