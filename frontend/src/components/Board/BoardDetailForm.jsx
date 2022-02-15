/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import style from "styles/BoardDetailForm.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "api/axios";
import OpenViduSession from "openvidu-react";
import Spinner from "components/layout/Spinner";
import { isLikeString, openSidebar } from "redux/_actions/actions";
import FormHeader from "components/layout/FormHeader";
import { useDispatch, useSelector } from "react-redux";
import Button from "../common/Button";

function BoardDetailForm() {
  const { boardSeq } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState();
  const [isLikeState, setIsLikeState] = useState(board?.isLike === "true");
  const [isSession, setIsSession] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const likeBool = useSelector((state) => state.userReducer.isLikeBool);
  const userNickname = sessionStorage.getItem("userNickname");
  const onClickJoin = () => {
    setLoading(true);
    dispatch(openSidebar(false));
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
    if (!board.boardStatus && !isLikeState) return;
    axios
      .post(
        `/board/favorite`,
        { boardSeq },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        setIsLikeState((prev) => !prev);
        dispatch(isLikeString(res));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("즐겨찾기 등록은 10개까지만 가능합니다.");
        } else {
          console.dir(err);
        }
      });
  };

  const onClickDelete = () => {
    axios
      .delete(`/board/${boardSeq}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.dir(err);
        alert("게시글을 삭제할 수 없습니다.");
      });
  };

  const onClickEdit = () => {
    navigate(`/createboard?edit=${boardSeq}`);
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
        navigate("/");
      });
  }, [boardSeq]);

  useEffect(() => {
    if (Number(boardSeq) === likeBool[1]) {
      setIsLikeState(false);
    }
  }, [likeBool]);

  if (board) {
    return (
      <div>
        {!isSession ? (
          <div className={style.container}>
            <FormHeader text="POST DETAIL" widthPer={80} />
            <div className={style.wrapper}>
              <div className={style.header}>
                <p>작성자: {board.author}</p>
                <div className={style.author}>
                  마감일: {board.deadline}
                  <span onClick={onClickLike}>
                    {isLikeState ? (
                      <i className="fas fa-bookmark" />
                    ) : (
                      <i className="far fa-bookmark" />
                    )}
                  </span>
                  {board.author === userNickname && (
                    <div>
                      <span className={style.edit} onClick={onClickEdit}>
                        수정
                      </span>
                      {" | "}
                      <span className={style.delete} onClick={onClickDelete}>
                        삭제
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <h2>{board.title}</h2>
              <p>{board.content}</p>
              <div className={style.buttons}>
                <Button
                  text="참여하기"
                  handleClick={onClickJoin}
                  Disabled={!board.boardStatus}
                />
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
