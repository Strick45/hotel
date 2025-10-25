import React, { useState } from 'react';
import './MainMenu.css';
import OnboardingScreen from './OnboardingScreen';

const MainMenu = () => {
  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long' });
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const handleCreateRoute = () => {
    setIsChatBotOpen(true);
  };

  const handleCloseChatBot = () => {
    setIsChatBotOpen(false);
  };

  if (isChatBotOpen) {
    return <OnboardingScreen onComplete={handleCloseChatBot} isChatOnly={true} />;
  }

  return (
    <div className="main-menu">
      <h1 className="main-title">МОЕ БОЛЬШОЕ СМЕЛОЕ КРАСИВОЕ ПУТЕШЕСТВИЕ</h1>
      <button className="profile-btn">
        <div className="user-avatar">
          <img src={require('./Group 2.png')} alt="user" />
        </div>
      </button>
      <div className="center-buttons">
        <button className="today-btn">Готовые маршруты</button>
        <button className="all-days-btn" onClick={handleCreateRoute}>Создай свой маршрут</button>
      </div>
      <input type="text" className="note-btn" placeholder="Написать заметку" />
    </div>
  );
};

export default MainMenu;