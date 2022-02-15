/* eslint-disable prefer-const */
import React, { useEffect, useState, useRef } from "react";
import { MdOutlineFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { isLikeBool, isLikeString } from "redux/_actions/actions";
import Button from "react-bootstrap/Button";
import { style } from "typestyle";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import { RootState } from "../../../redux/_reducers/index";

type likeList = {
  boardSeq: string;
  boardStatus: boolean;
  boardTitle: string;
};

const hoverColor = style({
  $nest: {
    "&:hover": {
      backgroundColor: "#ffffff45",
    },
  },
});

function Favorited() {
  const [state, setState] = useState({
    likeList: [],
  });
  const colorRef = useRef("");
  const isLike = useSelector(
    (state: RootState) => state.userReducer.isLikeString
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let completed = false;
    async function get() {
      const result = await axios.get("/board/favorite", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      if (!completed) setState({ likeList: result.data.boardInfos });
    }
    get();
    return () => {
      completed = true;
    };
  }, [isLike]);

  const goToBoard = (boardSeq: string, boardStatus: boolean) => {
    if (!boardStatus) {
      alert("마감이 된 게시물입니다.");
      return;
    }
    colorRef.current = boardSeq;
  };

  const clearBoard = (e: React.MouseEvent, boardSeq: string) => {
    e.stopPropagation();
    async function post() {
      const result = await axios.post(
        "/board/favorite",
        { boardSeq },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      dispatch(isLikeString(result));
      dispatch(isLikeBool([false, boardSeq]));
    }
    post();
  };

  const renderLikeList = (like: Array<likeList>) =>
    like.length > 0 &&
    like.map((data) => (
      <li
        key={data.boardSeq}
        aria-hidden="true"
        onClick={() => goToBoard(data.boardSeq, data.boardStatus)}
        style={{
          padding: 0,
          marginBottom: "1em",
        }}
      >
        <Link to={`/board/${data.boardSeq}`}>
          <span
            className={hoverColor}
            style={{
              textDecoration: !data.boardStatus ? "line-through" : "",
              height: "1.5em",
              width: "80%",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              display: "inline-block",
            }}
          >
            {data.boardTitle}
          </span>
        </Link>
        <Button
          variant="danger"
          style={{ marginLeft: "1em", fontSize: "0.5em", padding: 0 }}
          onClick={(e) => clearBoard(e, data.boardSeq)}
        >
          해제
        </Button>
      </li>
    ));

  return (
    <div
      style={{
        textAlign: "right",
        fontSize: "1.5em",
      }}
    >
      <div style={{ marginBottom: "0.6em" }}>
        <MdOutlineFavorite
          style={{ marginRight: "0.1em", marginBottom: "0.6em" }}
        />
        Favorite (
        {state.likeList.length === undefined ? 0 : state.likeList.length})
      </div>

      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: 0,
          cursor: "pointer",
          textAlign: "right",
          fontSize: "15px",
        }}
      >
        {renderLikeList(state.likeList)}
      </ul>
    </div>
  );
}

export default Favorited;
