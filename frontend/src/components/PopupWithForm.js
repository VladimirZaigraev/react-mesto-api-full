import React from 'react';

const PopupWithForm = (props) => {

  return(
    <div className={`popup section ${props.name}-popup ${props.isOpen && "popup_active"}`}>
      <div className="popup__container" id={`${props.name}PopupContainer`}>
        <button className={`popup__close ${props.name}-popup__close`} type="button" aria-label="Close" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form action="#" className="popup__form" name={`${props.name}PopupForm`} id={`${props.name}PopupForm`} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__button" type="submit" name="popupButton" >{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm

