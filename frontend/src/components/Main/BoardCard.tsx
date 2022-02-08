/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import axios from "api/axios";
import { Link } from "react-router-dom";
import style from "../../styles/BoardCard.module.scss";

type Props = {
  boardSeq: number;
  title: string;
  createAt: string;
  deadline: string;
  author: string;
  isLike: "true" | "false";
};

function BoardCard({
  boardSeq,
  title,
  createAt,
  deadline,
  author,
  isLike,
}: Props) {
  const [isLikeState, setIsLikeState] = useState<boolean>(isLike === "true");
  const onClickLike = (e: React.MouseEvent) => {
    e.preventDefault();
    axios
      .get(`/board/favorite/${boardSeq}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIsLikeState((prev) => !prev);
      })
      .catch((err) => {
        console.dir(err);
      });
  };
  return (
    <div className={style.container}>
      <Link to={`/board/${boardSeq}`}>
        <div className={style.header}>
          <p>작성자: ADFFSED13DGSDR4</p>
          <span onClick={onClickLike}>
            {isLikeState ? (
              <i className="fas fa-bookmark" />
            ) : (
              <i className="far fa-bookmark" />
            )}
          </span>
        </div>
        <div className={style.footer}>마감일: 2022-05-24</div>
        <div className={style.content}>{title}</div>
      </Link>
    </div>
  );
}

export default BoardCard;
