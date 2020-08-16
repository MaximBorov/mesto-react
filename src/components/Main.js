import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [myId, setMyId] = React.useState();
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUser().then((result) => {
      setMyId(result._id);
      setUserName(result.name);
      setUserDescription(result.about);
      setUserAvatar(result.avatar);
    });
    }, [])

    React.useEffect(() => {
      api.getInitialCards().then((data) => {
        setCards(
          data.map((obj) => ({
            id: obj._id,
            cardUrl: obj.link,
            cardOwner: obj.owner._id,
            cardName: obj.name,
            cardLikes: obj.likes
          }))
        );
      });
      }, [])

  return (
    <main className="main">
        <section className="profile">
          <div className="profile__avatar">
            <img className="profile__img" src={userAvatar} alt="Ваш аватар" />
            <div className="profile__overlay" onClick={onEditAvatar}></div>
          </div>
          <div className="profile__info">
            <p className="profile__author">{userName}</p>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
            <p className="profile__subject">{userDescription}</p>
          </div>
          <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="cards">
          {
          cards.map(({id, ...props}) => <Card key={id} handleCardClick={onCardClick} myId={myId} {...props} />)
          }
        </section>
      </main>
  );
}

export default Main;
