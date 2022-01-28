import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "styles/CreatePostForm.module.scss";
import DatePicker from "react-datepicker";
import axios from "api/axios";
import Input from "../common/Input";
import Button from "../common/Button";
import Spacer from "../common/Spacer";
import "react-datepicker/dist/react-datepicker.css";

function CreatePostForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [disabled, setDisabled] = useState(true);

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
      Number(deadline?.getMonth()) + 1
    }-${deadline?.getDate()}`;

    axios
      .post("/board", {
        boardTitle: title,
        boardContent: content,
        deadline: date,
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        alert("게시글 생성에 실패했습니다.");
      });
  };

  return (
    <div className={style.container}>
      <h1>게시글 작성</h1>
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

export default CreatePostForm;
