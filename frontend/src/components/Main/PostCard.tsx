import React from "react";
import style from "styles/PostCard.module.scss";

function PostCard() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <p>username</p>
        <span>좋아요</span>
      </div>
      <div>title</div>
      <div>content</div>
    </div>
  );
}

export default PostCard;
