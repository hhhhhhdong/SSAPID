import React, { useState } from "react";
import style from "styles/MainPage.module.scss";
import PostCard from "./PostCard";
import Input from "../common/Input";

function MainPage() {
  const [searchValue, setSearchValue] = useState("");
  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
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
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
}

export default MainPage;
