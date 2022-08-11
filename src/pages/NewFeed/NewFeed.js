import React, { useState, useRef, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NewFeedModal } from './NewFeedModal';
import { AiFillCamera } from 'react-icons/ai';
import { RiArrowDownSFill } from 'react-icons/ri';
import {
  IoMdRefresh,
  IoMdTrash,
  IoMdArrowDropup,
  IoMdArrowDropdown,
} from 'react-icons/io';
export function NewFeed() {
  const navigate = useNavigate();
  const [imageInfo, setImageInfo] = useState({
    file: null,
    previewURL: '',
  });
  const [data, setData] = useState({
    living_type: '',
    room_size: '',
    family_type: '',
    work_type: '',
    contents_description: '',
  });
  const [currModal, setCurrModal] = useState('');
  const [modalSelectedId, setModalSelectedId] = useState();
  const [onClickCoordinate, setOnClickCoordinate] = useState({
    coordinateX: '',
    coordinateY: '',
  });
  const [coordinatesList, setCoordinatesList] = useState([]);
  const [tag, setTag] = useState({
    product_id: '',
    point_x: '',
    point_y: '',
  });
  const [tagsList, setTagsList] = useState([]);
  const photoInput = useRef();
  const photoOverlay = useRef();
  //  *** 이미지 관리 function들 ***
  const imageUpload = e => {
    e.preventDefault();
    photoInput.current.click();
  };
  const imageDelete = e => {
    e.preventDefault();
    setImageInfo({
      file: null,
      previewURL: '',
    });
  };
  const imageOverlay = e => {
    setOnClickCoordinate(prev => ({
      ...prev,
      coordinateX:
        ((e.nativeEvent.offsetX - 12) / photoOverlay.current.offsetWidth) * 100,
      coordinateY:
        ((e.nativeEvent.offsetY - 12) / photoOverlay.current.offsetHeight) *
        100,
    }));
  };
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
  // 이미지 태그 관련 Hook
  useEffect(() => {
    if (modalSelectedId !== undefined) {
      setTag({
        product_id: modalSelectedId,
        point_x: coordinatesList[currModal].coordinateX,
        point_y: coordinatesList[currModal].coordinateY,
      });
    }
    getCurrModal('');
  }, [modalSelectedId]);
  useEffect(() => {
    if (tag.product_id !== '') {
      const prevTagsList = [...tagsList];
      prevTagsList.push(tag);
      setTagsList(prevTagsList);
      setTag({
        product_id: '',
        point_x: '',
        point_y: '',
      });
    }
  }, [tag]);
  const imageInput = e => {
    if (!!imageInfo) setCoordinatesList([]);
    setImageInfo({
      file: e.target.files[0],
      previewURL: URL.createObjectURL(e.target.files[0]),
    });
  };
  // *** 전송 데이터 관련 function들 ***
  const handleSelect = e => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const onSubmit = async e => {
    e.preventDefault();
    let jsonData = {
      living_type: data.living_type,
      room_size: data.room_size,
      family_type: data.family_type,
      work_type: data.work_type,
      contents_description: data.contents_description,
      tag: tagsList,
    };
    let formData = new FormData();
    formData.append('filename', imageInfo.file);
    formData.append('data', JSON.stringify(jsonData));
    await axios({
      method: 'POST',
      url: 'http://10.58.0.216:3000/posts/posting',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.Os76fm7ebvWZehwGElo4mHH117wHyR79oo6Gizq5Glo',
      },
      data: formData,
    });
    navigate('/card_collections');
  };
  const getModalSelectedId = id => {
    setModalSelectedId(id);
  };
  const getCurrModal = value => {
    setCurrModal(value);
  };
  return (
    <Wrapper>
      <div />
      <NewFeedContainer onSubmit={onSubmit}>
        <RoomOptionContainer>
          <OnTopSelector
            name="room_size"
            value={data.room_size}
            onChange={handleSelect}
          >
            <option selected value="">
              평수
            </option>
            {SIZE_PRESET.map(size => {
              return (
                <option value={size.value} key={size.id}>
                  {size.name}
                </option>
              );
            })}
          </OnTopSelector>
          <OnTopSelector
            name="family_type"
            value={data.family_type}
            onChange={handleSelect}
          >
            <option selected value="">
              가족 형태
            </option>
            {FAMILY_PRESET.map(family => {
              return (
                <option value={family.value} key={family.id}>
                  {family.name}
                </option>
              );
            })}
          </OnTopSelector>
          <OnTopSelector
            name="work_type"
            value={data.work_type}
            onChange={handleSelect}
          >
            <option selected value="">
              분야
            </option>
            {WORKSPACE_PRESET.map(workspace => {
              return (
                <option value={workspace.value} key={workspace.id}>
                  {workspace.name}
                </option>
              );
            })}
          </OnTopSelector>
        </RoomOptionContainer>
        <UploadContainer>
          <ImageUploadContainer>
            {imageInfo.file === null ? (
              <ImageStandBy onClick={imageUpload}>
                <AiFillCamera />
                <p>사진 올리기</p>
                <p>(* 최대 10장까지)</p>
              </ImageStandBy>
            ) : (
              <>
                <img
                  className="onLoadImage"
                  src={imageInfo.previewURL}
                  alt="previewImage"
                  ref={photoOverlay}
                  onClick={imageOverlay}
                />
                <OvelayControler>
                  <button onClick={imageUpload}>
                    <IoMdRefresh />
                  </button>
                  <button onClick={imageDelete}>
                    <IoMdTrash />
                  </button>
                  <button>
                    <IoMdArrowDropup />
                  </button>
                  <button>
                    <IoMdArrowDropdown />
                  </button>
                </OvelayControler>
                <InsertTagButton>+ 상품 태그하기</InsertTagButton>
                {coordinatesList.map((coor, index) => {
                  return (
                    <TagButton
                      key={index}
                      style={{
                        top: `${coor.coordinateY}%`,
                        left: `${coor.coordinateX}%`,
                      }}
                      type="button"
                      onClick={() => setCurrModal(index)}
                    >
                      <TagSvg>
                        <circle cx="12" cy="12" r="12" fill="#35c5f0" />
                        <path
                          stroke="#ffffff"
                          strokeLinecap="square"
                          strokeWidth="2"
                          d="M12 16V8m-4 4h8"
                        />
                      </TagSvg>
                      {currModal === index && (
                        <NewFeedModal
                          onClose={e => {
                            e.stopPropagation();
                            setCurrModal('');
                          }}
                          getModalSelectedId={getModalSelectedId}
                        >
                          <p>
                            최근 태그하거나 구매한 상품이 없습니다.
                            <br />
                            상품을 검색해보세요.
                          </p>
                        </NewFeedModal>
                      )}
                    </TagButton>
                  );
                })}
              </>
            )}
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              multiple
              ref={photoInput}
              onChange={imageInput}
              style={{ display: 'none' }}
            />
          </ImageUploadContainer>
          <TextUploadContainer>
            <PlaceSelectorWrapper>
              <PlaceSelector
                name="living_type"
                value={data.living_type}
                onChange={handleSelect}
              >
                <option selected value="">
                  공간 (필수)
                </option>
                {PLACE_PRESET.map(place => {
                  return (
                    <option value={place.value} key={place.id}>
                      {place.name}
                    </option>
                  );
                })}
              </PlaceSelector>
              <ArrowDownIcon />
            </PlaceSelectorWrapper>
            <TextStandBy
              name="contents_description"
              value={data.contents_description}
              onChange={handleSelect}
              placeholder="사진에 대해 설명해주세요."
            />
          </TextUploadContainer>
        </UploadContainer>
        <UploadButton type="submit">추가하기</UploadButton>
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
const RoomOptionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin: 0 5px 50px;
`;
const OnTopSelector = styled.select`
  appearance: none;
  width: 150px;
  height: 40px;
  padding: 0 30px 0 15px;
  font-size: 14px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  transition: background-color 0.1s ease 0s;
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
const InsertTagButton = styled.button`
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
const TagButton = styled.button`
  all: unset;
  position: absolute;
  display: inline-block;
  cursor: pointer;
`;
const TagSvg = styled.svg`
  width: 24px;
  height: 24px;
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
const SIZE_PRESET = [
  { id: 1, value: 'underTen', name: '10평 이하' },
  { id: 2, value: 'fromTen', name: '10평' },
  { id: 3, value: 'fromTwenty', name: '20평' },
  { id: 4, value: 'fromThirty', name: '30평' },
  { id: 5, value: 'fromFourty', name: '40평' },
  { id: 6, value: 'overFifty', name: '50평 이상' },
];
const FAMILY_PRESET = [
  { id: 1, value: 'single', name: '싱글라이프' },
  { id: 2, value: 'couple', name: '부부' },
  { id: 3, value: 'roommate', name: '룸메이트' },
];
const WORKSPACE_PRESET = [
  { id: 1, value: 'homeStyling', name: '홈스타일링' },
  { id: 2, value: 'remodeling', name: '리모델링' },
  { id: 4, value: 'construction', name: '건설' },
];
const PLACE_PRESET = [
  { id: 1, value: 'oneRoom', name: '원룸' },
  { id: 2, value: 'livingRoom', name: '거실' },
  { id: 3, value: 'bedRoom', name: '침실' },
  { id: 4, value: 'kitchen', name: '주방' },
  { id: 5, value: 'bathRoom', name: '욕실' },
  { id: 6, value: 'kidsRoom', name: '아이방' },
  { id: 7, value: 'dressRoom', name: '드레스룸' },
  { id: 8, value: 'hobbyRoom', name: '서재&작업실' },
  { id: 9, value: 'Veranda', name: '베란다' },
  { id: 10, value: 'office', name: '사무공간' },
  { id: 11, value: 'commercial', name: '상업공간' },
  { id: 12, value: 'furnitureNProps', name: '가구&소품' },
  { id: 13, value: 'entrance', name: '현관' },
  { id: 14, value: 'outeriorNEtc', name: '외관&기타' },
];
