import React, {useContext} from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext'


const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const cards = props.cards;

  return(
    <main className="content">
      <section className="profile section" aria-label="профиль">
        <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
          <div style={{ backgroundImage: `url('${currentUser.avatar}')` }} className="profile__avatar"/>
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
          <button className="button profile__button-edit" type="button" aria-label="Edit" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__button-add button button_type_add" type="button" aria-label="Add" onClick={props.onAddPlace}></button>
      </section>

      <section className="cards section" aria-label="карточки">
        <ul className="cards__list">
        {
            cards.map((card) =>{
              return(<Card
                key={card._id}
                card={card}
                onCardClick={() => props.onCardClick(card)}
                onCardLike={() => props.onCardLike(card)}
                onCardDelete={() => props.onCardDelete(card)}
                />)
            })
          }
        </ul>
      </section>
    </main>
  );
}
export default Main;
