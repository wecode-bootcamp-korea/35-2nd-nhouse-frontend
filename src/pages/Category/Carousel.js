import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export function Carousel() {
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
        <div>
          <img alt="img" src="/images/Carousel/1.webp" />
        </div>
        <div>
          <img alt="img" src="/images/Carousel/2.webp" />
        </div>
        <div>
          <img alt="img" src="/images/Carousel/3.webp" />
        </div>
        <div>
          <img alt="img" src="/images/Carousel/4.webp" />
        </div>
      </Slider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-height: 500px;
  max-width: 1000px;
  margin-left: 15px;
`;
