import React, { useEffect, useState } from 'react';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { RiArrowDropRightLine } from 'react-icons/ri';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function Carousel({ timeSale, imgs }) {
  const [time, setTime] = useState();

  const getTomorrow = () => {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const diff = Math.round(tomorrow - now) / 1000;
    const hours = String(parseInt(diff / 3600)).padStart(2, '0');
    const minutes = String(parseInt((diff % 3600) / 60)).padStart(2, '0');
    const seconds = String(parseInt(diff % 60)).padStart(2, '0');
    const result = `${hours}:${minutes}:${seconds}`;
    return result;
  };

  useEffect(() => {
    setTime(getTomorrow);
    const timer = setInterval(() => {
      setTime(getTomorrow);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Wrapper>
      <Slider {...settings}>
        {imgs.map((item, index) => (
          <ImgContainer key={index}>
            <img alt="" src={item} />
            {timeSale && (
              <TodayDeal>
                <Clock />
                오늘의딜 {time} 남음 <Arrow />
              </TodayDeal>
            )}
          </ImgContainer>
        ))}
      </Slider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0px 8px;
`;

const ImgContainer = styled.div`
  position: relative;
  img {
    min-height: 600px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const TodayDeal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  max-height: 150px;
  max-width: 200px;
  border-radius: 3px;
  padding: 10px;
  color: ${({ theme }) => theme.white80};
  background-color: ${({ theme }) => theme.red};
  font-size: 13px;
  font-weight: 600;
  text-align: center;
`;

const Clock = styled(AiOutlineFieldTime)`
  font-size: 20px;
`;

const Arrow = styled(RiArrowDropRightLine)`
  font-size: 20px;
`;
