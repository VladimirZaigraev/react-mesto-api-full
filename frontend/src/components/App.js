import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip.js';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoToolTipData, setInfoToolTipData] = useState({ message: "", icon: false });
  const history = useHistory();

  // Проверка токена пользователя ДУБЛЬ
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    console.log('token', token)
    if (token) {
      auth.checkToken(token)
        .then(() => {
          setLoggedIn(true);
          api.getUserInfo(token)
            .then((userData) => {
              console.log(userData)
              setEmail(userData.user.email);
              setCurrentUser(userData.user);
              history.push('/');
            })
          api.getInitialCards(token)
            .then((card) => {
              console.log(card)
              setCards(card.reverse());
            })
          history.push('/');
        })
        .catch(api.showError)
    }
  }, [loggedIn, history]);

  // useEffect(() => {
  //   api.getUserInfo()
  //     .then(userData => setCurrentUser(userData))
  //     .catch(api.showError)
  // }, [])

  // useEffect(() => {
  //   api.getInitialCards()
  //     .then(card => setCards(card))
  //     .catch(api.showError)
  // }, [])

  // изменение информации о пользователе
  const handleUpdateUser = (userData) => {
    setIsLoading(true)
    const token = localStorage.getItem('jwt');
    api.editUserInfo(userData, token)
      .then((userData) => {
        // console.log('then', userData)
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(api.showError)
      .finally(() => setIsLoading(false))
  }

  // обновление аватара
  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true)
    const token = localStorage.getItem('jwt');
    api.editUserAvatar(avatar, token)
      .then(newUserInfo => {
        setCurrentUser(newUserInfo)
        closeAllPopups()
      })
      .catch(api.showError)
      .finally(() => setIsLoading(false))
  }

  // добавление карточки
  const handleAddPlaceSubmit = (newCard) => {
    setIsLoading(true)
    const token = localStorage.getItem('jwt');
    api.addCard(newCard, token)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(api.showError)
      .finally(() => setIsLoading(false))
  }
  // лайк\дизлайк
  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    const token = localStorage.getItem('jwt');
    api.changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards(state => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(api.showError)
  }

  const handleCardDelete = (card) => {
    const token = localStorage.getItem('jwt');
    api.deleteCard(card._id, token)
      .then(_ => {
        setCards(state => state.filter(c => c._id !== card._id))
      })
      .catch(api.showError)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  // useEffect(() => {
  //   tokenCheck();
  // }, []);

  // const tokenCheck = () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     auth
  //       .checkToken(token)
  //       .then((res) => {
  //         if (res.data.email) {
  //           setEmail(res.data.email);
  //           setLoggedIn(true);
  //           history.push("/");
  //         }
  //       })
  //       .catch((err) => {
  //         if (err === 400)
  //           return auth.showError(err, "Токен не передан или передан не в том формате");
  //         if (err === 401) return auth.showError(err, "Переданный токен некорректен");
  //       });
  //   }
  // }

  // регистрация пользователя
  const onRegister = (email, password) => {
    return auth
      .register(email, password)
      .then((email) => {
        console.log(email)
        if (email) {
          setLoggedIn(true);
          setInfoToolTipData({
            icon: true,
            message: "Вы успешно зарегистрировались!"
          });
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        setInfoToolTipData({
          icon: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        if (err === "Ошибка: 400")
          auth.showError(err, " некорректно заполнено одно из полей ");
      })
      .finally(() => setIsInfoTooltipOpen(true))
  }

  // авторизация пользователя
  const onLogin = (email, password) => {
    //console.log(email, password, localStorage.getItem('jwt'))
    return auth
      .authorize(email, password, localStorage.getItem('jwt'))
      .then((res) => {
        // console.log(res);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          api.getUserInfo(res.token)
            .then((res) => {
              console.log(res)
              setEmail(res.user.email);
              setCurrentUser(res.user);
              history.push('/');
              setIsInfoTooltipOpen(false);
            })
          api.getInitalCards(res.token)
            .then((res) => {
              setCards(res.cards);
            })
          history.push('/');
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoToolTipData({
          icon: false,
          message: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        if (err === "Ошибка: 400") {
          auth.showError(err, "не передано одно из полей");
        } else if (err === "Ошибка: 401") {
          auth.showError(err, "Пользователь с данным email не найден");
        }
      });
  }

  const onSignOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setEmail("");
    history.push("/sign-in");
  }

  const handleEscClose = (event) => {
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }

  const closeOverlay = (event) => {
    if (event.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", closeOverlay);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", closeOverlay);
    };
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header
          loggedIn={loggedIn}
          userEmail={email}
          onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            setCards={setCards}
          />
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />
      </div>
      <InfoToolTip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        message={infoToolTipData.message}
        icon={infoToolTipData.icon}
        loggedIn={loggedIn}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />
    </CurrentUserContext.Provider>
  );
}

export default App;
