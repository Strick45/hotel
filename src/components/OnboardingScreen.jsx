// src/components/Onboarding/OnboardingScreen.jsx
import React, { useState, useEffect } from 'react';
import './OnboardingScreen.css';

const OnboardingScreen = ({ onComplete }) => {
  // Настройка адреса backend. Измените эту переменную, чтобы указать ваш сервер.
  // Например: 'https://your-api.com' или 'http://localhost:3001'
  // Все запросы будут отправляться на BACKEND_URL + '/api/onboarding'
  const BACKEND_URL = '26.249.143.10:8000'; // Оставьте пустым для относительного пути или укажите полный URL

  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [canProceed, setCanProceed] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('image1');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userData, setUserData] = useState({
    phone: '',
    gender: '',
    name: '',
    age: '',
    season: '',
    duration: '',
    budget: '',
    restType: '',
    tripFormat: '',
    accommodation: '',
    cuisine: '',
    diningFormat: '',
    foodBudget: '',
    interests: '',
    nonStandardRoutes: '',
    cityTransport: '',
    routeFormat: '',
    tripMood: '',
    placePreference: '',
    weatherTimeRoutes: '',
  });
  const [isChatMode, setIsChatMode] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [showSeasonButtons, setShowSeasonButtons] = useState(false);
  const [showDurationButtons, setShowDurationButtons] = useState(false);
  const [showBudgetButtons, setShowBudgetButtons] = useState(false);
  const [showRestTypeButtons, setShowRestTypeButtons] = useState(false);
  const [showTripFormatButtons, setShowTripFormatButtons] = useState(false);
  const [showAccommodationButtons, setShowAccommodationButtons] = useState(false);
  const [showCuisineButtons, setShowCuisineButtons] = useState(false);
  const [showDiningFormatButtons, setShowDiningFormatButtons] = useState(false);
  const [showFoodBudgetButtons, setShowFoodBudgetButtons] = useState(false);
  const [showInterestsButtons, setShowInterestsButtons] = useState(false);
  const [showNonStandardRoutesButtons, setShowNonStandardRoutesButtons] = useState(false);
  const [showCityTransportButtons, setShowCityTransportButtons] = useState(false);
  const [showRouteFormatButtons, setShowRouteFormatButtons] = useState(false);
  const [showTripMoodButtons, setShowTripMoodButtons] = useState(false);
  const [showPlacePreferenceButtons, setShowPlacePreferenceButtons] = useState(false);
  const [showWeatherTimeRoutesButtons, setShowWeatherTimeRoutesButtons] = useState(false);

  // Function to send data to backend
  const sendToBackend = async (data) => {
    try {
      const url = BACKEND_URL ? `${BACKEND_URL}/api/onboarding` : '/api/onboarding';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Data sent to backend successfully');
      } else {
        console.error('Failed to send data to backend');
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };


  const steps = [
    { text: 'Здравствуйте', emoji: null },
    { text: 'Ваш номер телефона', emoji: null, input: true},
    { text: 'Для начала', emoji: null },
    { text: 'Как вас зовут?', emoji: null, input: true, placeholder: 'Введите ваше имя...' },
    { text: 'Приятно познакомиться', emoji: 'Happy.png' },
    { text: 'Сколько вам лет?', emoji: null, input: true, placeholder: 'Введите ваш возраст...' },
    { text: 'У вас прекрасный возраст', emoji: 'Heart.png' },
    { text: 'Давайте поговорим', emoji: null },
    { text: 'Чат с ботом', emoji: null, chat: true },
  ];

  const current = steps[currentStep] || {};

  useEffect(() => {
    if (currentStep < steps.length - 1 && !current.input && !current.chat) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
          setIsVisible(true);
          setCanProceed(false);
          setUserInput('');
          if (currentStep + 1 >= 7) {
            setIsTransitioning(true);
            setTimeout(() => {
              setBackgroundImage('image8');
              setIsTransitioning(false);
              if (steps[currentStep + 1]?.chat) {
                setTimeout(() => {
                  setIsChatMode(true);
                  setChatMessages([{ type: 'bot', text: 'Укажите ваш пол' }]);
                }, 500);
              }
            }, 1000);
          }
        }, 300);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, current.input, current.chat]);

  if (isChatMode) {
    return (
      <div className={`onboarding-fullscreen ${backgroundImage}`}>
        <div className="chat-container">
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.type === 'bot' && (
                  <div className="bot-avatar">
                    <img src={require('./Ellipse 2.png')} alt="bot" />
                  </div>
                )}
                {msg.type === 'user' && (
                  <div className="user-avatar">
                    <img src={require('./Group 2.png')} alt="user" />
                  </div>
                )}
                <div className="message-content">
                  <p>{msg.text}</p>

                  {/* Пол */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    !showSeasonButtons && (
                      <div className="gender-buttons">
                        <button
                          className="gender-btn"
                          onClick={() => {
                            setChatMessages((prev) => [
                              ...prev,
                              { type: 'user', text: 'Мужской' },
                            ]);
                            setUserData((prev) => ({ ...prev, gender: 'Мужской' }));
                            setTimeout(() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'bot', text: 'Когда вы планируете приехать в Ростов?' },
                              ]);
                              setShowSeasonButtons(true);
                            }, 500);
                          }}
                        >
                          Муж
                        </button>
                        <button
                          className="gender-btn"
                          onClick={() => {
                            setChatMessages((prev) => [
                              ...prev,
                              { type: 'user', text: 'Женский' },
                            ]);
                            setUserData((prev) => ({ ...prev, gender: 'Женский' }));
                            setTimeout(() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'bot', text: 'Когда вы планируете приехать в Ростов?' },
                              ]);
                              setShowSeasonButtons(true);
                            }, 500);
                          }}
                        >
                          Жен
                        </button>
                      </div>
                    )}


                  {/* Сезон */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showSeasonButtons &&
                    !showDurationButtons && (
                      <div className="season-buttons">
                        {['Зимой', 'Весной', 'Летом', 'Осенью'].map((season) => (
                          <button
                            key={season}
                            className="season-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: season },
                              ]);
                              setUserData((prev) => ({ ...prev, season }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'На сколько планируете поездку?' },
                                ]);
                                setShowDurationButtons(true);
                              }, 500);
                            }}
                          >
                            {season}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Длительность */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showDurationButtons &&
                    !showBudgetButtons && (
                      <div className="duration-buttons">
                        {['1 день', '2-3 дня', '4-7 дней', '>7 дней'].map((duration) => (
                          <button
                            key={duration}
                            className="duration-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: duration },
                              ]);
                              setUserData((prev) => ({ ...prev, duration }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Бюджет на 1 день' },
                                ]);
                                setShowBudgetButtons(true);
                              }, 500);
                            }}
                          >
                            {duration === '>7 дней' ? '>7 дней' : duration}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Бюджет */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showBudgetButtons &&
                    !showRestTypeButtons && (
                      <div className="budget-buttons">
                        {[
                          { label: 'Эконом до 3000', value: 'Эконом до 3000' },
                          { label: 'Средний до 7000', value: 'Средний до 7000' },
                          { label: 'Комфорт до 15000', value: 'Комфорт до 15000' },
                          { label: 'Премиум >15000', value: 'Премиум >15000' },
                        ].map((budget) => (
                          <button
                            key={budget.value}
                            className="budget-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: budget.label },
                              ]);
                              setUserData((prev) => ({ ...prev, budget: budget.value }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Тип отдыха' },
                                ]);
                                setShowRestTypeButtons(true);
                              }, 500);
                            }}
                          >
                            {budget.label}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Тип отдыха — 3 кнопки */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showRestTypeButtons &&
                    !showTripFormatButtons && (
                      <div className="rest-type-buttons">
                        {['Активный', 'Спокойный', 'Смешанный'].map((type) => (
                          <button
                            key={type}
                            className="rest-type-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: type },
                              ]);
                              setUserData((prev) => ({ ...prev, restType: type }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Формат поездки' },
                                ]);
                                setShowTripFormatButtons(true);
                              }, 500);
                            }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Формат поездки — 4 кнопки */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showTripFormatButtons &&
                    !showAccommodationButtons && (
                      <div className="trip-format-buttons">
                        {['В одиночку', 'С партнёром', 'С друзьями', 'С семьёй'].map(
                          (format) => (
                            <button
                              key={format}
                              className="trip-format-btn"
                              onClick={() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'user', text: format },
                                ]);
                                setUserData((prev) => ({ ...prev, tripFormat: format }));
                                setTimeout(() => {
                                  setChatMessages((prev) => [
                                    ...prev,
                                    { type: 'bot', text: 'Проживание' },
                                  ]);
                                  setShowAccommodationButtons(true);
                                }, 500);
                              }}
                            >
                              {format}
                            </button>
                          )
                        )}
                      </div>
                    )}

                  {/* Проживание — 3 кнопки */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showAccommodationButtons &&
                    !showCuisineButtons && (
                      <div className="accommodation-buttons">
                        {[
                          'Нужен отель/хостел',
                          'Уже есть жильё',
                          'Рассматриваю варианты',
                        ].map((accommodation) => (
                          <button
                            key={accommodation}
                            className="accommodation-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: accommodation },
                              ]);
                              setUserData((prev) => ({ ...prev, accommodation }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Предпочитаемая кухня' },
                                ]);
                                setShowCuisineButtons(true);
                              }, 500);
                            }}
                          >
                            {accommodation}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Предпочитаемая кухня — 7 кнопок */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showCuisineButtons &&
                    !showDiningFormatButtons && (
                      <div className="cuisine-buttons">
                        {[
                          'Русская',
                          'Кавказская',
                          'Европейская',
                          'Азиатская',
                          'Американская',
                          'ЗОЖ',
                          'Нет предпочтений',
                        ].map((cuisine) => (
                          <button
                            key={cuisine}
                            className="cuisine-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: cuisine },
                              ]);
                              setUserData((prev) => ({ ...prev, cuisine }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Формат питания' },
                                ]);
                                setShowDiningFormatButtons(true);
                              }, 500);
                            }}
                          >
                            {cuisine}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Формат питания — 5 кнопок */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showDiningFormatButtons &&
                    !showFoodBudgetButtons && (
                      <div className="dining-format-buttons">
                        {['Кафе', 'Ресторан', 'Фастфуд', 'Кофейни', 'Без разницы'].map(
                          (format) => (
                            <button
                              key={format}
                              className="dining-format-btn"
                              onClick={() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'user', text: format },
                                ]);
                                setUserData((prev) => ({ ...prev, diningFormat: format }));
                                setTimeout(() => {
                                  setChatMessages((prev) => [
                                    ...prev,
                                    { type: 'bot', text: 'Бюджет на еду' },
                                  ]);
                                  setShowFoodBudgetButtons(true);
                                }, 500);
                              }}
                            >
                              {format}
                            </button>
                          )
                        )}
                      </div>
                    )}

                  {/* Бюджет на еду — 4 кнопки */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showFoodBudgetButtons &&
                    !showInterestsButtons && (
                      <div className="food-budget-buttons">
                        {['до 500', 'до 1500', 'до 3000', '>3000'].map((budget) => (
                          <button
                            key={budget}
                            className="food-budget-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: budget },
                              ]);
                              setUserData((prev) => ({ ...prev, foodBudget: budget }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Что вам интересно в поездке' },
                                ]);
                                setShowInterestsButtons(true);
                              }, 500);
                            }}
                          >
                            {budget}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Что вам интересно в поездке — 6 кнопок */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showInterestsButtons &&
                    !showNonStandardRoutesButtons && (
                      <div className="interests-buttons">
                        {[
                          'История и культура',
                          'Природа',
                          'Развлечения',
                          'Красивые виды',
                          'Шопинг',
                          'Местная кухня',
                        ].map((interest) => (
                          <button
                            key={interest}
                            className="interests-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: interest },
                              ]);
                              setUserData((prev) => ({ ...prev, interests: interest }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Нестандартные маршруты' },
                                ]);
                                setShowNonStandardRoutesButtons(true);
                              }, 500);
                            }}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Нестандартные маршруты — 3 кнопки */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showNonStandardRoutesButtons &&
                    !showCityTransportButtons && (
                      <div className="non-standard-routes-buttons">
                        {['Да, хочу', 'Нелюбитель', 'Можно сочетать'].map((route) => (
                          <button
                            key={route}
                            className="non-standard-routes-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: route },
                              ]);
                              setUserData((prev) => ({ ...prev, nonStandardRoutes: route }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Перемещение по городу' },
                                ]);
                                setShowCityTransportButtons(true);
                              }, 500);
                            }}
                          >
                            {route}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Перемещение по городу — 4 кнопки */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showCityTransportButtons &&
                    !showRouteFormatButtons && (
                      <div className="city-transport-buttons">
                        {[
                          'Пешком',
                          'На общественном транспорте',
                          'На такси',
                          'На каршеринге',
                        ].map((transport) => (
                          <button
                            key={transport}
                            className="city-transport-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: transport },
                              ]);
                              setUserData((prev) => ({ ...prev, cityTransport: transport }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Формат маршрутов' },
                                ]);
                                setShowRouteFormatButtons(true);
                              }, 500);
                            }}
                          >
                            {transport}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Формат маршрутов — 3 кнопки */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showRouteFormatButtons &&
                    !showTripMoodButtons && (
                      <div className="route-format-buttons">
                        {[
                          'Короткие и удобные',
                          'Подлинее, но с красивыми видами',
                          'Без разницы',
                        ].map((format) => (
                          <button
                            key={format}
                            className="route-format-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: format },
                              ]);
                              setUserData((prev) => ({ ...prev, routeFormat: format }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Какое настроение вы хотите от поездки' },
                                ]);
                                setShowTripMoodButtons(true);
                              }, 500);
                            }}
                          >
                            {format}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Какое настроение вы хотите от поездки — 5 кнопок */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showTripMoodButtons &&
                    !showPlacePreferenceButtons && (
                      <div className="trip-mood-buttons">
                        {[
                          'Расслабиться',
                          'Вдохновиться',
                          'Получить новые впечатления',
                          'Провести время активно',
                          'Сделать красивое фото',
                        ].map((mood) => (
                          <button
                            key={mood}
                            className="trip-mood-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: mood },
                              ]);
                              setUserData((prev) => ({ ...prev, tripMood: mood }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Предпочитаете людные или спокойные места' },
                                ]);
                                setShowPlacePreferenceButtons(true);
                              }, 500);
                            }}
                          >
                            {mood}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Предпочитаете людные или спокойные места — 3 кнопки */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showPlacePreferenceButtons &&
                    !showWeatherTimeRoutesButtons && (
                      <div className="place-preference-buttons">
                        {[
                          'Оживлённые, с атмосферой',
                          'Тихие и уединённые',
                          'В зависимости от настроения',
                        ].map((preference) => (
                          <button
                            key={preference}
                            className="place-preference-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: preference },
                              ]);
                              setUserData((prev) => ({ ...prev, placePreference: preference }));
                              setTimeout(() => {
                                setChatMessages((prev) => [
                                  ...prev,
                                  { type: 'bot', text: 'Хотите, чтобы я подбирал маршруты по погоде и времени суток' },
                                ]);
                                setShowWeatherTimeRoutesButtons(true);
                              }, 500);
                            }}
                          >
                            {preference}
                          </button>
                        ))}
                      </div>
                    )}

                  {/* Хотите, чтобы я подбирал маршруты по погоде и времени суток — 2 кнопки */}
                  {msg.type === 'bot' &&
                    index === chatMessages.length - 1 &&
                    showWeatherTimeRoutesButtons && (
                      <div className="weather-time-routes-buttons">
                        {['Да', 'Нет'].map((answer) => (
                          <button
                            key={answer}
                            className="weather-time-routes-btn"
                            onClick={() => {
                              setChatMessages((prev) => [
                                ...prev,
                                { type: 'user', text: answer },
                              ]);
                              setUserData((prev) => ({ ...prev, weatherTimeRoutes: answer }));
                              setTimeout(() => {
                                setIsChatMode(false);
                                sendToBackend({ ...userData, weatherTimeRoutes: answer });
                                if (onComplete) onComplete();
                              }, 500);
                            }}
                          >
                            {answer}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`onboarding-fullscreen ${backgroundImage} ${
        isTransitioning ? 'transitioning' : ''
      }`}
    >
      <div className={`onboarding-content ${isVisible ? 'fade-in' : 'fade-out'}`}>
        <h1>{current.text}</h1>
        {current.emoji && (
          current.emoji.endsWith('.png') ? (
            <img
              src={require(`./${current.emoji}`)}
              alt="emoji"
              className="emoji"
            />
          ) : (
            <div className="emoji">{current.emoji}</div>
          )
        )}
        {current.input && (
          <>
            <input
              type="text"
              placeholder={current.placeholder || 'Введите...'}
              className="name-input"
              autoFocus
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && userInput.trim()) {
                  if (current.placeholder === 'Введите ваш номер телефона...') {
                    setUserData((prev) => ({ ...prev, phone: userInput.trim() }));
                  } else if (current.placeholder === 'Введите ваше имя...') {
                    setUserData((prev) => ({ ...prev, name: userInput.trim() }));
                  } else if (current.placeholder === 'Введите ваш возраст...') {
                    setUserData((prev) => ({ ...prev, age: userInput.trim() }));
                  }
                  setCanProceed(true);
                  setTimeout(() => {
                    setIsVisible(false);
                    setTimeout(() => {
                      setCurrentStep((prev) => prev + 1);
                      setIsVisible(true);
                      setCanProceed(false);
                      setUserInput('');
                      if (currentStep + 1 >= steps.length) {
                        sendToBackend(userData);
                      }
                    }, 300);
                  }, 500);
                }
              }}
            />
            {current.hasAccountButton && (
              <button
                className="account-btn"
                onClick={() => {
                  if (onComplete) onComplete();
                }}
              >
                У меня уже есть аккаунт
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OnboardingScreen;