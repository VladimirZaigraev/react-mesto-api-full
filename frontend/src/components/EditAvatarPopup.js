import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

const  EditAvatarPopup = (props) => {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>

      <input type="url" ref={avatarRef} className="popup__input" id="input-avatar" name="link" placeholder="Сылка на фото для аватара" required autoComplete="off"/>
      <span className="popup__input-erorr" id="input-avatar-error"></span>

    </PopupWithForm>
  )
}
export default EditAvatarPopup;
