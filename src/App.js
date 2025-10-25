import React, { useState } from 'react';
import OnboardingScreen from './components/OnboardingScreen';
import MainMenu from './components/MainMenu';
import './App.css';

function App() {
  const [showMainMenu, setShowMainMenu] = useState(false);

  const handleOnboardingComplete = () => {
    setShowMainMenu(true);
  };

  return (
    <div className="App">
      {!showMainMenu ? (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      ) : (
        <MainMenu />
      )}
    </div>
  );
}

export default App;