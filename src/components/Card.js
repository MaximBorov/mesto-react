import React from 'react';

function Card({link, myId, cardId, handleCardClick, onCardLike, onCardDelete, owner, name, likes}) {
  const isLiked = likes.some(i => i._id === myId);

  function handleClick() {
    handleCardClick({name, link});
  }

  function handleLikeClick() {
    onCardLike({cardId, likes});
  }

  function handleDeleteClick() {
    onCardDelete({cardId});
  }

  return (
      <div className="card">
        <img className="card__image" src={link} alt={name} onClick={handleClick} />
        {myId === owner._id ? (<button type="button" className="card__trash-button" onClick={handleDeleteClick} ></button>) : (<></>) }
        <p className="card__text">{name}</p>
        <button type="button" className={isLiked ? 'card__like-button card__like-button_active' : 'card__like-button'} id="like" onClick={handleLikeClick} ></button>
        <p className="card__like-counter">{likes.length}</p>
      </div>
  );
}

export default Card;
