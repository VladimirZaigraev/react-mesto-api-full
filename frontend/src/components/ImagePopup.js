import React from 'react';

const ImagePopup = (props) => {

    return(
    <div className={`popup section image-popup ${props.card.link && 'popup_active'}`}>
      <div className="popup__container popup__container-image" id="popupContainerImage">
        <button className="popup__close image-popup__close" type="button" aria-label="Close" onClick={props.onClose}></button>
        <img src={`${props.card.link}`} alt={`${props.card.name}`} className="image-popup__preview"/>
        <span className="popup__text">{props.card.name}</span>
      </div>
    </div>
  )
}
export default ImagePopup;
