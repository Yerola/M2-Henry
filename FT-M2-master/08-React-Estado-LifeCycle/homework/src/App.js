import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav.jsx';
import Cards from './components/Cards.jsx';

export default function App() {
  const [cities, setCities] = useState([]);
  var apiKey = '4ae2636d8dfbdc3044bede63951a019b'
  function onSearch(ciudad) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`)
      .then(r => r.json())
      .then((recurso) => {
        if(recurso.main !== undefined){
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          setCities(oldCities => [...oldCities, ciudad]);
        } else {
          alert("Ciudad no encontrada");
        }
      });

    }
    function onClose(id) {
      setCities(oldCities => oldCities.filter(c => c.id != id));
    }//repasar map y filter.... deja pasar todas las ciudades cuyo id es distinto del id al cual se activo el onCLose



  return (
    <div className="App">
      <Nav onSearch={onSearch}/>{/* LE PASO la funcion de esta manera */}
      <Cards cities={cities}onClose={onClose}/>
    </div>
  );
}

