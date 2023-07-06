import axios from "axios";
import { useState } from "react";

import "./App.css";
import Search from "./components/search/Search";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import Forcast from "./components/forcast/Forcast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

function App() {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);

	const handleOnSearchChange = async (searchData) => {

		const [lat, lon] = searchData.value.split(' ');
		const currentWeatherFetched = await axios.get(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&&units=metric`);
		const forecastFetch = await axios.get(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&&units=metric`);

		Promise.all([currentWeatherFetched, forecastFetch])
			.then((response) => {
				const weatherResponse = response[0];
				const forecastResponse = response[1];

				setCurrentWeather({ city: searchData.label, ...weatherResponse });
				setForecast({ city: searchData.label, ...forecastResponse });
			})
	}

	console.log(currentWeather);
	console.log(forecast);


	return (
		<div className="container">
			<Search onSearchChange={handleOnSearchChange} />
			{currentWeather && <CurrentWeather data={currentWeather}/>}
			{forecast && <Forcast data={forecast}/>}
		</div>
	);
}

export default App;
