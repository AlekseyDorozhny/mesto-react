import api from '../utils/API.js'
import React from 'react';
import Card from './Card.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

const [userName, changeUserName] = React.useState('');
const [userDescription, changeUserDescription] = React.useState('');
const [userAvatar, changeUserAvatar] = React.useState('');
const [cards, changeCards] = React.useState([]);


React.useEffect(() => {
  Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then((res)=> {
    const userInfoData = res[1];
    const cardsData = res[0];
    changeUserDescription(userInfoData.about);
    changeUserAvatar(userInfoData.avatar);
    changeUserName(userInfoData.name);
    changeCards(cardsData)
    })
    .catch((err) => {console.log(err)})
}, [])


  return (
    <main>
      <section className="profile">
        <div className="profile__avatar"
        onClick={() => {onEditAvatar(true)}}
        style={{ backgroundImage: `url(${userAvatar})` }} ></div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__activity">{userDescription}</p>
          <button className="profile__edit-button"
          type="button"
          aria-label="редактирование профиля"
          onClick={() => {onEditProfile(true)}}></button>
        </div>
        <button className="profile__add-button"
        type="button"
        aria-label="добавить картинку"
        onClick={() => {onAddPlace(true)}}></button>
      </section>
      <section className="elements">
        {cards.map((card, i) => {
        return(<Card
          likes = {card.likes}
          _id = {card._id}
          name = {card.name}
          link = {card.link}
          owner = {card.owner}
          key = {card._id}
          onCardClick = {onCardClick}
          />)
        })}
      </section>
    </main>
  );
}

export default Main;



