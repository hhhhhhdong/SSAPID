import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import queryStirng from "query-string";
import style from "styles/CreateBoardForm.module.scss";
import axios from "api/axios";
import FormHeader from "components/layout/FormHeader";
import Input from "../common/Input";
import Button from "../common/Button";
import Spacer from "../common/Spacer";
import "react-datepicker/dist/react-datepicker.css";

function CreateBoardForm() {
  const navigate = useNavigate();
  const edit = useRef(
    window.location.search
      ? queryStirng.parse(window.location.search).edit
      : null
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [disabled, setDisabled] = useState(true);

  // 수정 페이지 확인
  useEffect(() => {
    if (edit.current) {
      axios
        .get(`/board/${edit.current}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setTitle(res.data.boardTitle);
          setContent(res.data.boardContent);
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
    }
  }, [edit]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (title && content && deadline) {
      setDisabled(false);
    }
  }, [title, content, deadline]);

  const onClickSubmit = () => {
    const date = `${deadline?.getFullYear()}-${
      Number(deadline?.getMonth()) + 1 < 10
        ? `0${Number(deadline?.getMonth()) + 1}`
        : Number(deadline?.getMonth()) + 1
    }-${
      Number(deadline?.getDate()) < 10
        ? `0${deadline?.getDate()}`
        : deadline?.getDate()
    }`;
    if (edit.current) {
      axios
        .put(
          `/board/${edit.current}`,
          {
            boardTitle: title,
            boardContent: content,
            deadline: date,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(() => {
          navigate(`/board/${edit.current}`);
        })
        .catch((err) => {
          console.log("에러: ", err);
          alert("게시글 수정에 실패했습니다.");
        });
    } else {
      axios
        .post(
          "/board",
          {
            boardTitle: title,
            boardContent: content,
            deadline: date,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log("에러: ", err);
          alert("게시글 생성에 실패했습니다.");
        });
    }
  };

  return (
    <div className={style.container}>
      <FormHeader text="CREATE POST" width={500} />
      <div>
        <Input
          name="search"
          placeHolder="제목을 입력해주세요."
          value={title}
          onChange={onChangeTitle}
          width={500}
          noBackground
        />
        <div className={style.textAreaDiv}>
          <span
            className={
              content
                ? `${style.inValueSpan} ${style.inputSpan}`
                : style.inputSpan
            }
          >
            내용을 입력해 주세요.
          </span>
          <textarea
            value={content}
            onChange={onChangeContent}
            name="sdf"
            id="asdf"
          >
            asdf
          </textarea>
        </div>
        <div className={style.datePickerWrapper}>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            closeOnScroll
            placeholderText="마감 날짜 선택"
            selected={deadline}
            onChange={(date) => setDeadline(date)}
          />
        </div>
      </div>
      <Spacer size={50} />
      <Button text="작성" Disabled={disabled} handleClick={onClickSubmit} />
    </div>
  );
}

export default CreateBoardForm;
