import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Веломаршруты</h1>
      <p>Добро пожаловать в наше приложение для велосипедистов!</p>
      <Link to="/catalog">Посмотреть каталог маршрутов</Link>
    </div>
  );
}

export default Home;