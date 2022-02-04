import React from "react";
import Button from "../common/Button";
import style from "../../styles/globalForm.module.scss";

function SessionForm() {
  const submitButtonType = "submit";
  const joinSession = () => {};
  return (
    <div>
      <h1>Join a video session</h1>
      <form>
        <p>
          <input type="text" id="nickName" required />
        </p>
        <p>
          <input type="text" id="sessionName" required />
        </p>
        <div className={style.btns}>
          <Button
            buttonType={submitButtonType}
            handleClick={joinSession}
            text="Join"
          />
        </div>
      </form>
    </div>
  );
}

export default SessionForm;
