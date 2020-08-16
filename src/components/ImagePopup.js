import React from 'react';

function ImagePopup({onClose, isOpen, card }) {
  return (
    <div className={isOpen ? 'popup popup_opened': 'popup'} id="photo">
      <div className="popup__photo-container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <img className="popup__photo-image" src={card.cardUrl} alt={card.cardName} />
        <p className="popup__photo-text">{card.cardName}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
