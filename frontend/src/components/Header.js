import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import logo from '../images/header/logo-white.svg';


const Header = (props) => {
  return (
  <header className="header section">
    <img src={logo} alt="Логотип: Mesto" className="header__logo"/>

    <Switch>
      <Route exact path="/">
        <div className="header__wrapper">
          <p className="header__email">{props.userEmail}</p>
          <Link
            to="/sign-in"
            onClick={props.onSingOut}
            className="header__link link"
          >Выйти</Link>
        </div>
      </Route>

      <Route path="/sign-in">
        <Link to="/sign-up" className="header__link link">Зарегистрироваться</Link>
      </Route>

      <Route path="/sign-up">
        <Link to="/sign-in" className="header__link link">Войти</Link>
      </Route>
    </Switch>
  </header>
  );
}

export default Header;
