import React, {useState} from "react";

//import Form from "./Form";

const Login = ({ onLogin }) => {

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
    onLogin(email, password);
  };

  return(
    <div className="login section">
      <h2 className="login__title">Вход</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
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
          value={data.password}
          autoComplete="on"
          onChange={handleChange}/>
        <button className="form__button" type="submit">Войти</button>
      </form>
    </div>
  )
}
export default Login;
