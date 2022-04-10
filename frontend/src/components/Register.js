import React, {useState} from "react";
import {Link} from "react-router-dom";
//import Form from "./Form";

const Register = ({ onRegister }) => {

  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = data;
    onRegister(email, password);
  };

  return(
    <div className="register section">
      <h2 className="register__title">Регистрация</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input "
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          autoComplete="off"
          value={data.email}
          onChange={handleChange}/>
        <input
          className="form__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          autoComplete="on"
          value={data.password}
          onChange={handleChange}/>
        <button className="form__button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?&nbsp;
        <Link to="sign-in" className="register__link link">Войти</Link>
      </p>
    </div>
  )
}
export default Register
