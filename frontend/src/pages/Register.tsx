/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import style from "styles/Register.module.scss";
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <div className={style.bg}>
      <video muted autoPlay loop>
        <source src="/video/office.mp4" type="video/mp4" />
      </video>
      <RegisterForm />
    </div>
  );
}

export default Register;
