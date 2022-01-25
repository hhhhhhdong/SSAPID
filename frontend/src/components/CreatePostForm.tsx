import React, { useEffect, useState } from "react";
import style from "styles/CreatePostForm.module.scss";
import DatePicker from "react-datepicker";
import axios from "api/axios";
import Input from "./common/Input";
import Button from "./common/Button";
import Spacer from "./common/Spacer";
import "react-datepicker/dist/react-datepicker.css";

// 일정 날짜 이후의 Date 객체를 반환하는 함수
function addDays(date: Date, days: number) {
  const clone = new Date(date);
  clone.setDate(date.getDate() + days);
  return clone;
}

function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [disabled, setDisabled] = useState(true);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (title && content && startDate) {
      setDisabled(false);
    }
  }, [title, content, startDate]);

  const onClickSubmit = () => {
    const date = `${startDate?.getFullYear()}-${
      Number(startDate?.getMonth()) + 1
    }-${startDate?.getDate()}`;
    axios
      .post("/board", {
        boardTitle: title,
        boardContent: content,
        deadline: date,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.dir(err);
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
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>
      <Spacer size={50} />
      <Button text="작성" Disabled={disabled} handleClick={onClickSubmit} />
    </div>
  );
}

export default CreatePostForm;
