/* eslint-disable jsx-a11y/media-has-caption */
import React, { ReactNode } from "react";
import style from "../../styles/VideoBackground.module.scss";

type Props = {
  children: ReactNode;
};
function VideoBackground({ children }: Props) {
  return (
    <div className={style.bg}>
      <video muted autoPlay loop>
        <source src="/video/office.mp4" type="video/mp4" />
      </video>
      <div className={style.wrapper}>{children}</div>
    </div>
  );
}

export default VideoBackground;
