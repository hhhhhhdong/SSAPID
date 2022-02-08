/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import style from "styles/BoardDetailForm.module.scss";
import { useParams } from "react-router-dom";
import axios from "api/axios";
import Button from "../common/Button";

type BoardDetail = {
  boardSeq: number;
  title: string;
  content: string;
  author: string;
  isLike: "true" | "false";
  createAt: string;
  deadline: string;
};

function BoardDetailForm() {
  const { boardSeq } = useParams();
  const [board, setBoard] = useState<BoardDetail>();
  const [isLikeState, setIsLikeState] = useState<boolean>(
    board?.isLike === "true"
  );

  const onClickLike = (e: React.MouseEvent) => {
    e.preventDefault();
    axios
      .get(`/board/favorite/${boardSeq}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        setIsLikeState((prev) => !prev);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  useEffect(() => {
    axios
      .get(`/board/${boardSeq}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setBoard({
          ...res.data,
          title: res.data.boardTitle,
          content: res.data.boardContent,
        });
        setIsLikeState(res.data.isLike === "true");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (board) {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <p>작성자: {board.author}</p>
            <p>
              마감일: {board.deadline}
              <span onClick={onClickLike}>
                {isLikeState ? (
                  <i className="fas fa-bookmark" />
                ) : (
                  <i className="far fa-bookmark" />
                )}
              </span>
            </p>
          </div>
          <h2>{board.title}</h2>
          <p>{board.content}</p>
          <div className={style.buttons}>
            <Button text="참여하기" />
          </div>
        </div>
      </div>
    );
  }
  return <div className={style.container}>데이터 받아오는중</div>;
}

export default BoardDetailForm;
