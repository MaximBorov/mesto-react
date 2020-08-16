import React from 'react';

function Card({cardUrl, myId, handleCardClick, cardOwner, cardName, cardLikes}) {
  function handleClick() {
    handleCardClick({cardName, cardUrl});
  }

  return (
      <div className="card">
        <img className="card__image" src={cardUrl} alt={cardName} onClick={handleClick} />
        {myId === cardOwner ? (<button type="button" className="card__trash-button"></button>) : (<></>) }
        <p className="card__text">{cardName}</p>
        <button type="button" className="card__like-button" id="like"></button>
        <p className="card__like-counter">{cardLikes.length}</p>
      </div>
  );
}

export default Card;
