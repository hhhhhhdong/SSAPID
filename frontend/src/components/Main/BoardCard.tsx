import React, { useEffect, useState } from "react";
import axios from "api/axios";
import style from "../../styles/BoardCard.module.scss";

type Props = {
  boardId: number;
};
type Board = {
  boardSeq: number;
  boardTitle: string;
  boardContent: string;
  createAt: string;
  deadline: string;
  userNickname: string;
  islike: boolean;
};

function BoardCard({ boardId }: Props) {
  const [board, setBoard] = useState<Board | undefined>(undefined);
  useEffect(() => {
    axios
      .get(`/board/${boardId}`)
      .then((res) => {
        setBoard(res.data);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <p>{board?.userNickname}</p>
        <span>좋아요</span>
      </div>
      <div>{board?.boardTitle}</div>
      <div>{board?.boardContent}</div>
    </div>
  );
}

export default BoardCard;
