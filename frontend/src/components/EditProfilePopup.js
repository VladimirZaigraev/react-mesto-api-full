import React, {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

const EditProfilePopup = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription ] = useState('');

  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser,  props.isOpen]);

  function handleSubmit(event) {
      // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
      // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  return(
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>

      <input
        type="text"
        className="popup__input"
        id="input-name"
        name="inputName"
        placeholder="Имя"
        required
        minLength={2}
        maxLength={40}
        autoComplete="off"
        value={name || ""}
        onChange={handleChangeName}
        />
      <span className="popup__input-erorr" id="input-name-error"></span>
      <input
        type="text"
        className="popup__input"
        id="input-profession"
        name="inputProfession"
        placeholder="О себе"
        required
        minLength={2}
        maxLength={200}
        autoComplete="off"
        value={description || ""}
        onChange={handleChangeDescription}/>
      <span className="popup__input-erorr" id="input-profession-error"></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup;
