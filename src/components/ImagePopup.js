import React from 'react';

function ImagePopup({onClose, card }) {
  return (
    <div className={card ? 'popup popup_opened': 'popup'} id="photo">
      <div className="popup__photo-container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <img className="popup__photo-image" src={card ? card.cardUrl : ''} alt={card ? card.cardName : ''} />
        <p className="popup__photo-text">{card ? card.cardName : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
