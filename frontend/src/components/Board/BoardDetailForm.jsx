/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import style from "styles/BoardDetailForm.module.scss";
import { useParams } from "react-router-dom";
import axios from "api/axios";
import OpenViduSession from "openvidu-react";
import Spinner from "components/layout/Spinner";
import FormHeader from "components/layout/FormHeader";
import Button from "../common/Button";

function BoardDetailForm() {
  const { boardSeq } = useParams();
  const [board, setBoard] = useState();
  const [isLikeState, setIsLikeState] = useState(board?.isLike === "true");
  const [isSession, setIsSession] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const userNickname = sessionStorage.getItem("userNickname");
  const onClickJoin = () => {
    setLoading(true);
    axios
      .post("/session", { sessionName: boardSeq, userNickname })
      .then((res) => {
        setToken(res.data.token);
        setIsSession(true);
      })
      .catch((err) => {
        console.dir(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlerLeaveSessionEvent = () => {
    setIsSession(false);
  };

  const handlerErrorEvent = () => {
    alert("화상연결에 실패했습니다.");
  };

  const onClickLike = (e) => {
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
      <div>
        {!isSession ? (
          <div className={style.container}>
            <FormHeader text="POST DETAIL" widthPer={80} />
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
                <Button text="참여하기" handleClick={onClickJoin} />
              </div>
            </div>
            {loading && (
              <div className={style.joinSpinner}>
                <Spinner />
              </div>
            )}
          </div>
        ) : (
          <div id="session">
            <OpenViduSession
              id="opv-session"
              sessionName={boardSeq}
              user={userNickname}
              token={token}
              leaveSession={handlerLeaveSessionEvent}
              error={handlerErrorEvent}
            />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={style.container}>
      <Spinner />
    </div>
  );
}

export default BoardDetailForm;
