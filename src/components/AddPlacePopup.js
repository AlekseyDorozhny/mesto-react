import React from 'react';
import PopupWithForm from "./PopupWithForm.js";


function AddPlacePopup({isOpened, onClose, onAddCard}) {
  const newCardNameRef = React.useRef();
  const newCardLinkRef = React.useRef();


  function handleSubmit(e) {
    e.preventDefault();
    const link = newCardLinkRef.current.value;
    const name = newCardNameRef.current.value;
    onAddCard({link, name});
  }

  return(
    <PopupWithForm name = {'add-card'}
        title = {'Новое место'}
        buttonText = {'Создать'}
        isOpened = {isOpened}
        onClose = {onClose}
        onSubmit= {handleSubmit}>
          <label className="popup__field">
            <input type="text"
            className="popup__input popup__input_type_card-name"
            id="cardName-input"
            placeholder="Название"
            name="cardNameForm"
            minLength="2"
            maxLength="30"
            required
            ref={newCardNameRef}
            defaultValue={''}/>
            <span className="popup__error cardName-input-error"></span>
          </label>
          <label className="popup__field">
            <input type="url"
            className="popup__input popup__input_type_card-Src"
            id="cardSource-input"
            placeholder="Ссылка на картинку"
            name="cardSrcForm"
            required
            ref={newCardLinkRef}
            defaultValue={''}/>
            <span className="popup__error cardSource-input-error"></span>
          </label>
        </PopupWithForm>
  )
}

export default AddPlacePopup
