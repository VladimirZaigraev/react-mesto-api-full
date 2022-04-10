import React, {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangeLink(event) {
    setLink(event.target.value)
  }

  return(
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText={props.isLoading ? "Сохранение..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>

      <input
        type="text"
        className="popup__input"
        id="input-place"
        name="name"
        placeholder="Название"
        required minLength={2}
        maxLength={30}
        autoComplete="off"
        value={name}
        onChange={handleChangeName}/>

      <span className="popup__input-erorr" id="input-place-error"></span>

      <input
        type="url"
        className="popup__input"
        id="input-link"
        name="link"
        placeholder="Сылка на кратинку"
        required
        autoComplete="off"
        value={link}
        onChange={handleChangeLink}/>

      <span className="popup__input-erorr" id="input-link-error"></span>

  </PopupWithForm>
  )
}
export default AddPlacePopup;
