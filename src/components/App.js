import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import React from "react";
import ImagePopup from './ImagePopup'


function App() {
  const [isEditProfilePopupOpen, onEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, onAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, onEditAvatar] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState('')

  function closeAllPopups() {
    onEditProfile(false)
    onAddPlace(false)
    onEditAvatar(false)
    handleCardClick('')
  }


  return (
    <>
      <Header/>
      <Main
      onEditProfile = {onEditProfile}
      onAddPlace = {onAddPlace}
      onEditAvatar = {onEditAvatar}
      onCardClick = {handleCardClick}
      />
      <Footer />
      <PopupWithForm name = {'profile'}
      title = {'Редактировать профиль'}
      buttonText = {'Сохранить'}
      isOpened = {isEditProfilePopupOpen}
      onClose = {closeAllPopups}
      >
        <label className="popup__field">
          <input type="text" className="popup__input popup__input_type_name"  id="name-input" placeholder="Имя" name="profileNameForm" minLength="2" maxLength="40" required/>
          <span className="popup__error name-input-error"> </span>
        </label>
        <label className="popup__field">
          <input type="text" className="popup__input popup__input_type_activity" id="activity-input" placeholder="О себе" name="profileActivityForm" minLength="2" maxLength="200" required/>
          <span className="popup__error activity-input-error"> </span>
        </label>
      </PopupWithForm>
      <PopupWithForm name = {'add-card'}
      title = {'Новое место'}
      buttonText = {'Создать'}
      isOpened = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}>
        <label className="popup__field">
          <input type="text" className="popup__input popup__input_type_card-name" id="cardName-input" placeholder="Название" name="cardNameForm" minLength="2" maxLength="30" required/>
          <span className="popup__error cardName-input-error"></span>
        </label>
        <label className="popup__field">
          <input type="url" className="popup__input popup__input_type_card-Src" id="cardSource-input" placeholder="Ссылка на картинку" name="cardSrcForm" required/>
          <span className="popup__error cardSource-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name = {'avatar'}
      title = {'Обновить аватар'}
      buttonText = {'Сохранить'}
      isOpened = {isEditAvatarPopupOpen}
      onClose = {closeAllPopups}>
        <label className="popup__field">
          <input type="url" className="popup__input popup__input_type_avatar-src" id="avatarSrc-input" placeholder="Ссылка на аватар" name="avatarSrcForm" required/>
          <span className="popup__error avatarSrc-input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm name = {'confirm'}
      title = {'Вы уверены?'}
      buttonText = {'Да'}
      onClose = {closeAllPopups}>
      </PopupWithForm>
      <ImagePopup
      card = {selectedCard}
      onClose = {closeAllPopups}
      />
    </>
  );
}

export default App;
