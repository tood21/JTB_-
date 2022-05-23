import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Pagination = ({
  setNextDisabled,
  nextDisabled,
  setCurrentPage,
  currentPage,
  totalPage,
  pageNum,
}) => {
  const [prevDisabled, setPrevDisabled] = useState(false);

  const onClickNextHandler = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const onClickPrevHandler = () => {
    setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    if (currentPage === 1) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }

    if (currentPage === totalPage) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
  }, [currentPage]);

  return (
    <Container>
      <PageButton disabled={prevDisabled} onClick={onClickPrevHandler}>
        이전
      </PageButton>
      {pageNum.map((data, idx) => (
        <PageNuberButton
          type='button'
          active={data === currentPage ? true : false}
          onClick={() => {
            setCurrentPage(data);
          }}
          key={idx}
        >
          {data}
        </PageNuberButton>
      ))}
      <PageButton disabled={nextDisabled} onClick={onClickNextHandler}>
        다음
      </PageButton>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  margin-bottom: 150px;
`;

const PageNuberButton = styled.button`
  background-color: ${(props) => (props.active ? "black" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  border-radius: 50%;
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
`;

const PageButton = styled.button`
  cursor: pointer;
  font-size: 20px;
  margin-right: 10px;
`;
