import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (data) => {
    setSelectedCard(data);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(undefined);
  };

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm  title="Редактировать профиль" name="editPopup" submitButtonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input type="text" className="popup__input" id="name" minLength="2" maxLength="40" placeholder="Имя" defaultValue="" required name="name" />
          <span className="popup__text-error" id="name-error"></span>
          <input type="text" className="popup__input" defaultValue="" id="subject" placeholder="О себе" minLength="2" maxLength="200" required name="object" />
          <span className="popup__text-error" id="subject-error"></span>
        </PopupWithForm>
        <PopupWithForm  title="Новое место" name="addPopup" submitButtonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input type="text" className="popup__input" id="place" placeholder="Название" minLength="1" maxLength="30" required name="name" />
          <span className="popup__text-error" id="place-error"></span>
          <input type="url" className="popup__input" id="source" placeholder="Ссылка на картинку" required name="object" />
          <span className="popup__text-error" id="source-error"></span>
        </PopupWithForm>
        <PopupWithForm  title="Вы уверены?" name="confirmPopup" submitButtonText="Да" isOpen={false} onClose={closeAllPopups} />
        <PopupWithForm  title="Обновить аватар" name="avatarPopup" submitButtonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input type="url" className="popup__input popup__input_type_avatar" id="source" placeholder="Ссылка на аватарку" required name="object" />
        </PopupWithForm>
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </div>
  );
}

export default App;
