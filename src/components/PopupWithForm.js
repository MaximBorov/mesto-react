import React from 'react';

function PopupWithForm({title, name, subButton, isOpen, onClose, children}) {
  return (
    <div className={isOpen ? 'popup popup_opened': 'popup'} id={name}>
      <form className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className="popup__submit-button">{subButton}</button>
      </form>
    </div>
  );
}

export default PopupWithForm;
