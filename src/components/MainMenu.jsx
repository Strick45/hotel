import React from 'react';
import './MainMenu.css';

const MainMenu = () => {
  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long' });

  return (
    <div className="main-menu">
      <button className="profile-btn">Профиль</button>
      <div className="center-buttons">
        <button className="today-btn">Сегодняшний день</button>
        <div className="small-buttons">
          <button className="all-days-btn">Все дни</button>
          <button className="change-route-btn">Изменить маршрут</button>
        </div>
      </div>
      <button className="note-btn">Написать заметку</button>
    </div>
  );
};

export default MainMenu;