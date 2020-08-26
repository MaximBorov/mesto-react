import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUser()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err)=>{
        console.log(`Ошибка запроса пользователя: ${err}`);
      });
    }, [])

  React.useEffect(() => {
     api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err)=>{
        console.log(`Ошибка запроса карточек: ${err}`);
      });
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card.cardId, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card.cardId ? newCard : c);
        setCards(newCards);
      })
      .catch((err)=>{
        console.log(`Ошибка лайка: ${err}`);
      });
  }

  function handleCardDelete(id) {
    api.deleteCard(id.cardId)
      .then(() => {
        const newCards = cards.filter((c) => {
          return !(c._id === id.cardId)
        });
        setCards(newCards);
      })
      .catch((err)=>{
        console.log(`Ошибка удаления карточки: ${err}`);
      });
  }

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
  };

  const handleUpdateUser = (data) => {
    api.updateProfileInfo(data)
      .then((newProfile) => {
        setCurrentUser(newProfile);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(`Ошибка обновления профиля: ${err}`);
      });
  };

  const handleUpdateAvatar = (data) => {
    api.updateProfileAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(`Ошибка обновления аватара: ${err}`);
      });
  };

  const handleAddPlace = (data) => {
    api.createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(`Ошибка создания карточки: ${err}`);
      });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <PopupWithForm  title="Вы уверены?" name="confirmPopup" submitButtonText="Да" isOpen={false} onClose={closeAllPopups} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
