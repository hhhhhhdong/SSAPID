/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from "react";
import axios from "api/axios";
import Spinner from "components/layout/Spinner";
import style from "styles/MainPage.module.scss";
import BoardCard from "./BoardCard";
import Input from "../common/Input";

type Board = {
  boardSeq: number;
  boardTitle: string;
  createAt: string;
  deadline: string;
  author: string;
  isLike: "true" | "false";
  boardStatus: boolean;
};
const SIZE_OF_BOARDS_PER_REQ = 15;

function MainPage() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [keywordType, setKeywordType] = useState<string>("keyword");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const page = useRef(1);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const targetRef = useRef<HTMLDivElement>(null);

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKeywordType(e.target.value);
  };

  useEffect(() => {
    getItems();
  }, []);

  const onClickSearch = async (e: React.MouseEvent) => {
    e.preventDefault();

    // 입력값 없이 검색버튼을 클릭하면 검색상태를 해제되고 모든 리스트를 불러온다.
    if (!searchValue) {
      setIsSearching(false);
      page.current = 1;
      getItems();
    } else {
      setIsSearching(true);
      page.current = 1;
      getItems(true);
    }
  };

  // 데이터 받아오기
  const getItems = (search = false) => {
    setIsLoading(true);
    const token = sessionStorage.getItem("accessToken");
    // 검색 중이면 검색된 데이터들을 받아오고 검색중이아니면 전체 리스트를 받아온다.
    axios
      .get(
        search
          ? `/board/search?keyword=${keywordType}&content=${searchValue}&page=${page.current}&size=${SIZE_OF_BOARDS_PER_REQ}`
          : `/board?page=${page.current}&size=${SIZE_OF_BOARDS_PER_REQ}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsLast(res.data.last);
        if (page.current === 1) {
          setBoards(res.data.boardInfos);
        } else {
          setBoards((prev) => prev.concat(res.data.boardInfos));
        }
        setIsLoading(false);
        page.current += 1;
      })
      .catch((err) => {
        console.dir(err);
      });
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
        getItems(isSearching);
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
        <div className={style.search}>
          <select
            name="keywordType"
            id="keywordType"
            onChange={onChangeSelect}
            value={keywordType}
          >
            <option value="keyword">제목+내용</option>
            <option value="author">작성자</option>
          </select>
          <Input
            name="search"
            placeHolder="게시글 검색"
            value={searchValue}
            onChange={onChangeSearchValue}
            buttonText="검색"
            onClickInputButton={onClickSearch}
          />
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
                  boardStatus={board.boardStatus}
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
                boardStatus={board.boardStatus}
              />
            </div>
          );
        })}
      </div>
      {isLoading && (
        <div style={{ padding: "20px" }}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default MainPage;
