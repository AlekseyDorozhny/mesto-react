import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import React from "react";
import ImagePopup from './ImagePopup'
import api from '../utils/API.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {CardsDataContext} from '../contexts/CardsDataContext.js';





function App() {
  const [isEditProfilePopupOpen, onEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, onAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, onEditAvatar] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState('')
  const [currentUser, getUserInfo] = React.useState()
  const [cardsData, getCardsData] = React.useState()
  const [cards, changeCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then((res)=> {
      getCardsData(res[0])
      getUserInfo(res[1])
      })
      .catch((err) => {console.log(err)})
  }, [])

  React.useEffect(() => {
    if (cardsData) {
      changeCards(cardsData)
    }
  }, [cardsData])

  function closeAllPopups() {
    onEditProfile(false)
    onAddPlace(false)
    onEditAvatar(false)
    handleCardClick('')
  }

  function handleCardLike({likes, _id, currentUser}) {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api.likeHendler(_id, !isLiked).then((newCard) => {
      getCardsData((state) => state.map((c) => c._id === _id ? newCard : c));
    });
  }

  function handleCardDelete(id) {
    const cardsDataClone = cardsData.filter((e) => {
      if (e._id !== id) {
        return true;
      }
      return false;
    }).map(e => {return e})
    api.deleteCard(id).then(() => {
      getCardsData(cardsDataClone)
    });
  }

  function handleUpdateUser({name, about}) {
    api.sendUserInfo(name, about).then((res) => {
      getUserInfo(res);
      closeAllPopups();
    })
  }

  function handleUpdateAvatar(url) {
    api.sendUserAvatar(url).then((res) => {
      getUserInfo(res);
      closeAllPopups();
    })
  }

  function handleAddCard({link, name}) {
    console.log(link, name)
    api.sendCard(link, name).then((newCard) => {
      getCardsData([newCard, ...cards])

      closeAllPopups();
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsDataContext.Provider value={cardsData}>
        <Header/>
        <Main
        onEditProfile = {onEditProfile}
        onAddPlace = {onAddPlace}
        onEditAvatar = {onEditAvatar}
        onCardClick = {handleCardClick}
        onCardLike = {handleCardLike}
        onCardDelete = {handleCardDelete}
        cards = {cards}
        />
        <Footer />
        <AddPlacePopup
          isOpened={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}/>
        <PopupWithForm name = {'confirm'}
        title = {'Вы уверены?'}
        buttonText = {'Да'}
        onClose = {closeAllPopups}>
        </PopupWithForm>
        <EditProfilePopup
        isOpened={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}/>
        <EditAvatarPopup
        isOpened={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}/>
        <ImagePopup
        card = {selectedCard}
        onClose = {closeAllPopups}
        />
      </CardsDataContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
