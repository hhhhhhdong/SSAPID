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
    console.log(e.target.value);
  };

  useEffect(() => {
    getItems();
  }, []);

  const onClickSearch = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!searchValue) {
      setIsSearching(false);
      page.current = 1;
      getItems();
    } else {
      setIsSearching(true);
      page.current = 1;
      getItems(true);
    }
    /*
    검색 버튼 클릭
      내용이 있으면
        검색중 true
        page=1
      없으면
        검색중 false
        page=1
    검색 관련 게시글 리스트 받아옴
    메인페이지에 보여줌
    타겟걸림, 옵저버 걸림
    다음 데이터 받아옴 (검색중이라면 검색관련 다음 페이지를 받아와야함)
    */
  };

  // 데이터 받아오기
  const getItems = (search = false) => {
    setIsLoading(true);
    const token = sessionStorage.getItem("accessToken");
    if (search) {
      axios
        .get(
          `/board/search?keyword=${keywordType}&content=${searchValue}&page=${page.current}&size=3`,
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
    } else {
      axios
        .get(`/board?page=${page.current}&size=3`, {
          headers: { Authorization: `Bearer ${token}` },
        })
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
    }
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
