import successImg from "./../images/tooltip/success.svg";
import errorImg from "./../images/tooltip/error.svg";
import React from "react";

function InfoTooltip(props) {
  return (
    <section className={`popup popup-status ${props.isOpen && 'popup_active'}`}>
      <div className="popup__container popup-status__container">
        <img className="popup-status__image" src={props.icon ? successImg  : errorImg } alt="Статус" />
        <h2 className="popup__title popup-status__title">{props.message}</h2>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
