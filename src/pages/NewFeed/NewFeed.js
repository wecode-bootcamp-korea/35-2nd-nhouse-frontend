import React, { useState, useRef, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { AiFillCamera } from 'react-icons/ai';
import { RiArrowDownSFill } from 'react-icons/ri';
import {
  IoMdRefresh,
  IoMdTrash,
  IoMdArrowDropup,
  IoMdArrowDropdown,
} from 'react-icons/io';

export function NewFeed() {
  const [imageInfo, setImageInfo] = useState({
    file: null,
    previewURL: '',
  });
  const [onClickCoordinate, setOnClickCoordinate] = useState({
    coordinateX: '',
    coordinateY: '',
  });
  const [coordinatesList, setCoordinatesList] = useState([]);
  const photoInput = useRef();
  const imageOverlay = useRef();

  const imageUploadOnClick = e => {
    e.preventDefault();
    photoInput.current.click();
  };

  const imageDeleteOnClick = e => {
    e.preventDefault();
    setImageInfo({
      file: null,
      previewURL: '',
    });
  };

  const imageOverlayOnClick = e => {
    setOnClickCoordinate(prev => ({
      coordinateX: e.offsetX,
      coordinateY: e.offsetY,
    }));
  };
  // 버튼을 눌렀을 때만 OnClick 되게 하고 싶은데.. Div는 어떻게 만들지?

  useEffect(() => {
    if (
      onClickCoordinate.coordinateX !== '' &&
      onClickCoordinate.coordinateY !== ''
    ) {
      const prevCoordinatesList = [...coordinatesList];
      prevCoordinatesList.push(onClickCoordinate);
      setCoordinatesList(prevCoordinatesList);
      setOnClickCoordinate({
        coordinateX: '',
        coordinateY: '',
      });
    }
  }, [onClickCoordinate]);

  const imageInputOnChange = e => {
    setImageInfo({
      file: e.target.files[0],
      previewURL: URL.createObjectURL(e.target.files[0]),
    });
  };
  // 이미지 삭제하고 다시 클릭하면 안됨 클남

  console.log(coordinatesList);

  return (
    <Wrapper>
      <NewFeedContainer>
        <UploadContainer>
          <ImageUploadContainer>
            {imageInfo.file === null ? (
              <ImageStandBy onClick={imageUploadOnClick}>
                <AiFillCamera />
                <p>사진 올리기</p>
                <p>(* 최대 10장까지)</p>
              </ImageStandBy>
            ) : (
              <>
                <img
                  src={imageInfo.previewURL}
                  alt="previewImage"
                  ref={imageOverlay}
                  onClick={imageOverlayOnClick}
                />
                <OvelayControler>
                  <button onClick={imageUploadOnClick}>
                    <IoMdRefresh />
                  </button>
                  <button onClick={imageDeleteOnClick}>
                    <IoMdTrash />
                  </button>
                  <button>
                    <IoMdArrowDropup />
                  </button>
                  <button>
                    <IoMdArrowDropdown />
                  </button>
                </OvelayControler>
                <ProductTagButton>+ 상품 태그하기</ProductTagButton>
              </>
            )}
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              multiple
              ref={photoInput}
              onChange={imageInputOnChange}
              style={{ display: 'none' }}
            />
          </ImageUploadContainer>

          <TextUploadContainer>
            <PlaceSelectorWrapper>
              <PlaceSelector>
                <option disabled selected>
                  공간 (필수)
                </option>
                {PLACE_PRESET.map(place => {
                  return (
                    <option value={place.placeValue} key={place.place_id}>
                      {place.placeName}
                    </option>
                  );
                })}
              </PlaceSelector>
              <ArrowDownIcon />
            </PlaceSelectorWrapper>
            <TextStandBy placeholder="사진에 대해 설명해주세요." />
          </TextUploadContainer>
        </UploadContainer>
        <UploadButton>추가하기</UploadButton>
      </NewFeedContainer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewFeedContainer = styled.form`
  width: 100%;
  max-width: 1003px;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  padding: 0 0 40px;
  gap: 24px;
`;

const ImageUploadContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 460px;
  height: fit-content;
`;

const ImageStandBy = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 276px;
  gap: 4px;
  color: #828c94;
  background-color: #f7f8fa;
  border: 1px dashed #dbdbdb;
  border-radius: 5px;
  transition: opacity 0.1s ease 0s;

  svg {
    font-size: 57px;
  }

  p:first-child {
    font-size: 15px;
  }

  p:last-child {
    font-size: 12px;
  }

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }

  &:active {
    border: 1px dashed #dbdbdb;
  }
`;

const OvelayControler = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px 16px 16px;
  gap: 25px;
  color: #ffffff;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.54));

  button {
    all: unset;
    font-size: 24px;
    transition: opacity 0.1s ease 0s;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const ProductTagButton = styled.button`
  position: absolute;
  bottom: 16px;
  right: 15px;
  padding: 7px 12px 8px;
  font-size: 13px;
  font-weight: bold;
  color: #ffffff;
  background-color: #35c5f0;
  transition: background-color 0.1s ease 0s;
  border: none;
  border-radius: 32px;

  &:hover {
    background-color: #09addb;
  }
`;

const TextUploadContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  max-width: 460px;
  height: max-content;
  min-height: 276px;
  gap: 10px;
`;

const PlaceSelectorWrapper = styled.div`
  position: relative;
  color: #bdbdbd;
`;

const PlaceSelector = styled.select`
  appearance: none;
  width: 100%;
  height: 40px;
  padding: 0 30px 0 15px;
  font-size: 14px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  transition: background-color 0.1s ease 0s;

  &:hover {
    background-color: #fafafa;
  }
`;

const ArrowDownIcon = styled(RiArrowDownSFill)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
`;

const TextStandBy = styled.textarea`
  width: 100%;
  height: fit-content;
  min-height: 145px;
  margin: 0 0 10px;
  padding: 8px 15px 9px;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  transition: background-color 0.1s ease 0s;

  &:hover {
    background-color: #fafafa;
  }

  &:focus {
    outline: 2px solid #c2edfa;
    background-color: #ffffff;
  }

  &::placeholder {
    font-weight: bold;
    font-size: 13px;
    color: #bdbdbd;
  }
`;

const UploadButton = styled.button`
  width: 100%;
  height: 70px;
  max-width: 943px;
  font-size: 17px;
  font-weight: bold;
  color: #757575;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  transition: opacity 0.1s ease 0s;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const PLACE_PRESET = [
  { place_id: 1, placeValue: 'oneRoom', placeName: '원룸' },
  { place_id: 2, placeValue: 'livingRoom', placeName: '거실' },
  { place_id: 3, placeValue: 'bedRoom', placeName: '침실' },
  { place_id: 4, placeValue: 'kitchen', placeName: '주방' },
  { place_id: 5, placeValue: 'bathRoom', placeName: '욕실' },
  { place_id: 6, placeValue: 'kidsRoom', placeName: '아이방' },
  { place_id: 7, placeValue: 'dressRoom', placeName: '드레스룸' },
  { place_id: 8, placeValue: 'hobbyRoom', placeName: '서재&작업실' },
  { place_id: 9, placeValue: 'Veranda', placeName: '베란다' },
  { place_id: 10, placeValue: 'officePlace', placeName: '사무공간' },
  { place_id: 11, placeValue: 'commercialPlace', placeName: '상업공간' },
  { place_id: 12, placeValue: 'furnitureNProps', placeName: '가구&소품' },
  { place_id: 13, placeValue: 'entrance', placeName: '현관' },
  { place_id: 14, placeValue: 'outeriorNEtc', placeName: '외관&기타' },
];
