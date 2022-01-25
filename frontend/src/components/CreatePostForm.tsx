import React, { useState } from "react";
import style from "styles/CreatePostForm.module.scss";
import Input from "./common/Input";

function CreatePostForm() {
  const [title, setTitle] = useState("");
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <div className={style.container}>
      <div>
        <Input
          name="search"
          placeHolder="제목 (100자 이내)"
          value={title}
          onChange={onChangeTitle}
          width={500}
        />
        <textarea name="sdf" id="asdf" cols={30} rows={10}>
          asdf
        </textarea>
      </div>
    </div>
  );
}

export default CreatePostForm;
