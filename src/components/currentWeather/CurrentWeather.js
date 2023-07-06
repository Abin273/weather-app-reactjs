import React from "react";
import "./CurrentWeather.css";

function CurrentWeather({data}) {
	return (
		<div className="weather">
			<div className="top">
				<div>
					<p className="city">{data.city}</p>
					<p className="weather-description">{data.data.weather[0].main}</p>
				</div>
				<img
					src={`icons/${data.data.weather[0].icon}.png`}
					className="weather-icon"
					alt="weather icon"
				/>
			</div>
            <div className="bottom">
                <p className="temperature">{Math.round(data.data.main.temp)}°C</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels like</span>
                        <span className="parameter-value">{Math.round(data.data.main.feels_like)}°C</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">{Math.round(data.data.wind.speed)} m/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">humidity</span>
                        <span className="parameter-value">{data.data.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value">{data.data.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
		</div>
	);
}

export default CurrentWeather;
