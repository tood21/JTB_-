import React from "react";
import { FullPage, Slide } from "react-full-page";
import market from "../assets/images/gamMarket.gif";
import JTB from "../assets/images/JTB.gif";
import styled from "styled-components";

const PortfolioPage = () => {
  return (
    <FullPage>
      <Slide>
        <ProjectDiv>
          <ProjectImg
            width='350px'
            src={market}
            alt='감귤마켓프로젝트'
          ></ProjectImg>
          <InfoDiv marginLeft='150px'>
            <ProjectTitle>감귤마켓</ProjectTitle>
            <ProjectText>상품을 등록하고 홍보하는 SNS서비스</ProjectText>
            <ProjectInfo>
              <ProjectDesc>
                <p className='key'>팀 인원</p>
                <p className='value'>3인 팀프로젝트</p>
              </ProjectDesc>
              <ProjectDesc>
                <p className='key'>사용 스택</p>
                <p className='value'>HTML, CSS, JavaScript</p>
              </ProjectDesc>
              <ProjectDesc>
                <p className='key'>기여 부분 </p>
                <p className='value'>
                  로그인 | 홈(피드) | 포스트/프로필수정 | UI기능 구현
                </p>
              </ProjectDesc>
              <ProjectDesc>
                <p className='key'>주요 기능</p>
                <p className='value'>판매 상품 등록, 팔로우, 좋아요, 피드 </p>
              </ProjectDesc>
            </ProjectInfo>
            <LinkDiv>
              <a
                href='https://github.com/tood21/tangerine-market'
                target='_blank'
                rel='noopener noreferrer'
              >
                소스코드
              </a>
              <a
                href='https://iwipwq.github.io/tangerine-market/src/pages/splash.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                배포
              </a>
            </LinkDiv>
          </InfoDiv>
        </ProjectDiv>
      </Slide>
      <Slide>
        <ProjectDiv>
          <ProjectImg width='400px' src={JTB} alt='개인기술블로그'></ProjectImg>
          <InfoDiv marginLeft='100px'>
            <ProjectTitle>JTB (jeongbae's Technical Blog)</ProjectTitle>
            <ProjectText>개발 지식을 저장하고 공유하는 기술 블로그</ProjectText>

            <ProjectInfo>
              <ProjectDesc>
                <p className='key'>팀 인원</p>
                <p className='value'>개인 프로젝트</p>
              </ProjectDesc>
              <ProjectDesc>
                <p className='key'>사용 스택</p>
                <p className='value'>
                  HTML, CSS, JavaScript, React, Node.js, express{" "}
                </p>
              </ProjectDesc>
              <ProjectDesc>
                <p className='key'>주요 기능</p>
                <p className='value'>
                  글목록 읽기, 쓰기, 수정, 삭제, 회원가입, 로그인{" "}
                </p>
              </ProjectDesc>
              <ProjectDesc>
                <p className='key'>기여 부분 </p>
                <p className='value'>100% 풀스택</p>
              </ProjectDesc>
            </ProjectInfo>
            <LinkDiv>
              <a
                href='https://github.com/tood21/JTB_-'
                target='_blank'
                rel='noopener noreferrer'
              >
                소스코드
              </a>
              <a
                href='https://jtb-blog-1.herokuapp.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                배포
              </a>
            </LinkDiv>
          </InfoDiv>
        </ProjectDiv>
      </Slide>
    </FullPage>
  );
};

export default PortfolioPage;

const ProjectDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ProjectImg = styled.img`
  width: ${(props) => props.width};
`;

const InfoDiv = styled.div`
  margin-left: ${(props) => props.marginLeft};
`;

const ProjectTitle = styled.h3`
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const ProjectText = styled.p`
  margin-bottom: 50px;
`;

const ProjectInfo = styled.div`
  margin-bottom: 70px;
`;

const ProjectDesc = styled.div`
  display: flex;
  margin-bottom: 20px;
  .key {
    width: 100px;
    font-weight: bold;
    margin-right: 40px;
  }
`;

const LinkDiv = styled.div`
  a {
    display: inline-block;
    border: 1px solid black;
    width: 90px;
    padding: 10px;
    margin-right: 50px;
    margin-bottom: 20px;
    border-radius: 10px;
    text-align: center;
    &:hover {
      color: white;
      background-color: black;
    }
  }
`;
