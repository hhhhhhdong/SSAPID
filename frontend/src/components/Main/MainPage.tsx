/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from "react";
import axios from "api/axios";
import style from "../../styles/MainPage.module.scss";
import BoardCard from "./BoardCard";
import Input from "../common/Input";

type Board = {
  boardSeq: number;
  boardTitle: string;
  createAt: string;
  deadline: string;
  author: string;
  isLike: "true" | "false";
};

function MainPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [boards, setBoards] = useState<Board[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const targetRef = useRef<HTMLDivElement>(null);

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    getItems();
    setPage((prev) => prev + 1);
  }, []);

  const onClickSearch = () => {
    console.log(searchValue);
  };

  // 데이터 받아오기
  const getItems = () => {
    setIsLoading(true);
    setTimeout(() => {
      // page, size
      axios
        .get(`/board?page=${page}&size=3`)
        .then((res) => {
          if (res.data.last) setIsLast(true);
          setBoards((prev) => prev.concat(res.data.boardInfos));
          setIsLoading(false);
        })
        .catch((err) => {
          console.dir(err);
        });
    }, 500);
  };
  // 옵저버 설정 함수
  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        // 데이터 가져오기
        getItems();
        setPage((prev) => prev + 1);
      }
    });
  };

  const obsever = new IntersectionObserver(intersectionObserver);
  useEffect(() => {
    !isLast && targetRef.current && obsever.observe(targetRef.current);
    return () => obsever && obsever.disconnect();
  }, [boards]);

  return (
    <div className={style.container}>
      <div className={style.filter}>
        <Input
          name="search"
          placeHolder="게시글 검색"
          value={searchValue}
          onChange={onChangeSearchValue}
          buttonText="검색"
          onClickInputButton={onClickSearch}
        />
        <div className={style.checkbox}>
          <label htmlFor="backEnd">
            <input type="checkbox" name="backEnd" id="backEnd" />
            백엔드
          </label>
          <label htmlFor="frontEnd">
            <input type="checkbox" name="frontEnd" id="frontEnd" />
            프론트엔드
          </label>
          <label htmlFor="mobile">
            <input type="checkbox" name="mobile" id="mobile" />
            모바일
          </label>
        </div>
      </div>
      <div className={style.cards}>
        {boards.map((board, idx) => {
          if (boards.length - 1 === idx) {
            return (
              <div ref={targetRef} key={board.boardSeq}>
                <BoardCard
                  boardSeq={board.boardSeq}
                  title={board.boardTitle}
                  createAt={board.createAt}
                  deadline={board.deadline}
                  author={board.author}
                  isLike={board.isLike}
                />
              </div>
            );
          }
          return (
            <div key={board.boardSeq}>
              <BoardCard
                boardSeq={board.boardSeq}
                title={board.boardTitle}
                createAt={board.createAt}
                deadline={board.deadline}
                author={board.author}
                isLike={board.isLike}
              />
            </div>
          );
        })}
      </div>
      {isLoading && <div>데이터 가져오는 중..</div>}
    </div>
  );
}

export default MainPage;
