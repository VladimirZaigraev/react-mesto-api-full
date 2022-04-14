import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

const Card = (props) => {
  const card = props.card;

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  console.log(currentUser._id)
  console.log(card)
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `button card__delete ${isOwn ? 'card__delete-visible' : 'card__delete-hidden'}`
  )
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(id => id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `card__button button ${isLiked && 'card__button_active'}`
  );


  return (
    <li className="card" id={card._id}>
      <button className={cardDeleteButtonClassName} onClick={props.onCardDelete}></button>
      <img src={card.link} alt={card.name} className="card__img" onClick={props.onCardClick} />
      <div className="card__info">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" aria-label="Like" onClick={props.onCardLike}></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}
export default Card

