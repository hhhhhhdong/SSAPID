import React, { useEffect, useState } from "react";
import axios from "api/axios";
import style from "../../styles/MainPage.module.scss";
import BoardCard from "./BoardCard";
import Input from "../common/Input";

type Board = {
  boardSeq: number;
  boardTitle: string;
  createAt: string;
  deadline: string;
  userNickname: string;
  islike: boolean;
};

function MainPage() {
  const [searchValue, setSearchValue] = useState("");
  const [boards, setBoards] = useState<Board[]>([]);
  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    axios
      .get("/board")
      .then((res) => {
        setBoards(res.data.boardInfos);
        console.log(res);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, []);

  const onClickSearch = () => {
    console.log(searchValue);
  };
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
        {boards.map((board) => (
          <BoardCard key={board.boardSeq} boardId={board.boardSeq} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
