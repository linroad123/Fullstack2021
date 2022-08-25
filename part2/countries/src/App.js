import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryFinder = ({ countries, setFilteredCountries }) => {
  const searchCountries = (event) => {
    setFilteredCountries(countries.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  return (
    <>
      find countries:
      <input onChange={searchCountries} />
    </>
  );
}
const CountryViewer = ({ filteredCountries, setFilteredCountries }) => {
  if (filteredCountries.length === 1)
    return <CountryInfo country={filteredCountries[0]} />
  else if (filteredCountries.length <= 10)
    return (
      <>
        {filteredCountries.map(filteredCountry =>
          <p key={filteredCountry.name.common}>{filteredCountry.name.common}
            <button onClick={() => setFilteredCountries([filteredCountry])}>show</button>
          </p>)}
      </>
    )
  return (<p>Too many matches, specify another filter</p>)
}
const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) =>
          <li key={language}>{language}</li>)}
      </ul>
      <img style={{ height: 200 }}
        src={country.flags.svg}
        alt={'Flag of ' + country.name.common} />
      <Weather data={country.capitalInfo.latlng} />
    </div>
  )
}
const Weather = ({ data }) => {
  const [weather, setWeather] = useState(
    {
      main: {
        temp: 273.15
      },
      wind: {
        speed: 0
      },
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04n" }
      ]
    }
  )
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0]}&lon=${data[1]}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => setWeather(response.data))
  }, [])

  return (
    <div>
      <h3>Weather in {weather.name}</h3>
      <p>temperature {Math.round(weather.main.temp - 273.15)} Celsius</p>
      <img style={{ height: 200 }}
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])
  return (
    <div>
      <CountryFinder countries={countries} setFilteredCountries={setFilteredCountries} />
      <CountryViewer filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries} />
    </div>
  )
}

export default App;
