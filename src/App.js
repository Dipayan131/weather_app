import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBRadio,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

import backgroundImg from "./background_image.jpg"

const initialWeatherData = {
  name: "City",
  sys: { country: "Country Code" },
  main: {
    temp: 0,
    feels_like: 0,
    temp_max: 0,
    temp_min: 0,
    humidity: 0,
  },
  wind: { speed: 0, deg: 0 },
  weather: [{ description: "Weather description" }],
};

const weatherIcons = {
  "clear sky": "sun",
  "few clouds": "cloud-sun",
  "scattered clouds": "cloud-sun",
  "broken clouds": "cloud",
  "overcast clouds": "cloud",
  "light rain": "cloud",
  "moderate rain": "cloud-rain",
  "heavy intensity rain": "umbrella",
  "thunderstorm": "umbrella",
  "snow": "snowflake",
  "mist": "snowflake",
  "smoke": "snowfala",
  "haze": "smog",
  "dust": "smog",
  "fog": "smog",
  "sand": "smog",
  "ash": "smog",
  "squalls": "wind",
  "tornado": "wind",
  "Weather description": "cloud-sun"
};

export default function WeatherApp() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(initialWeatherData);
  const [unit, setUnit] = useState("Celsius");

  const searchPressed = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=0a789d0c294e3cc30c1f44cb4298bb15`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        setWeatherData(result);
        console.log(result);
      });
  };

  const handleRadioChange = (e) => {
    setUnit(e.target.id);
  };

  const convertTemperature = (temp) => {
    if (weatherData.name !== 'City') {
      if (unit === "Fahrenheit") {
        return (((temp - 273.15) * 9) / 5 + 32).toFixed(2); // Convert from Kelvin to Fahrenheit
      } else {
        return (temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
      }
    }
    else{
      return (temp)
    }
  };

  const unitData = unit === "Fahrenheit" ? "°F" : "°C";
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPressed();
    }
  };


  return (
    <section className="vh-100 main">
      <div className="background-container">
        <img src={backgroundImg} alt="Background" className="background-image" />
      </div>
      <MDBContainer className="h-100 py-5" style={{paddingLeft: '100px', paddingRight: '100px'}}>
        <MDBRow className="justify-content-center align-items-center h-100 main2">
          <MDBCol md="8" lg="6" xl="4">
            <MDBTypography tag="h3" className="mb-4 pb-2 fw-normal">
              Check the weather forecast
            </MDBTypography>

            <MDBInputGroup className="mb-3">
              <input
                className="form-control rounded"
                type="text"
                placeholder="City/Town"
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  border: "1px solid #ccc",
                  backgroundColor: "#f8f9fa",
                  color: "#333",
                  padding: "8px 12px",
                  borderRadius: "5px",
                }}
              />
              <a href="#!" type="button">
                <span
                  className="input-group-text border-0 fw-bold"
                  id="search-addon"
                  onClick={searchPressed}
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: "#3498db",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Search
                </span>
              </a>
            </MDBInputGroup>

            <div className="mb-4 p-2">
              <MDBRadio
                inline
                name="temperatureUnit"
                id="Celsius"
                label="Celsius"
                checked={unit === "Celsius"}
                onChange={handleRadioChange}
              />
              <MDBRadio
                inline
                name="temperatureUnit"
                id="Fahrenheit"
                label="Fahrenheit"
                checked={unit === "Fahrenheit"}
                onChange={handleRadioChange}
              />
            </div>

            <MDBCard className="shadow-100 border">
              <MDBCardBody className="p-4">
                <MDBTypography tag="h4" className="mb-1 sfw-normal">
                  {weatherData.name}
                </MDBTypography>
                <p className="mb-2">
                  Current temperature:{" "}
                  <strong>{convertTemperature(weatherData.main.temp)}{unitData}</strong>
                </p>
                <p>
                  Feels like:{" "}
                  <strong>{convertTemperature(weatherData.main.feels_like)}{unitData}</strong>
                </p>
                <p>
                  Max: <strong>{convertTemperature(weatherData.main.temp_max)}{unitData}</strong>, Min:{" "}
                  <strong>{convertTemperature(weatherData.main.temp_min)}{unitData}</strong>
                </p>
                <p>
                  Humidity: <strong>{weatherData.main.humidity}%</strong>
                </p>
                <p>
                  Wind Speed: <strong>{weatherData.wind.speed}m/s</strong>{" "}
                  <p>
                    Direction: <strong>{weatherData.wind.deg}°</strong>
                  </p>
                </p>

                <div className="d-flex flex-row align-items-center">
                  <p className="mb-0 me-4">
                    {weatherData.weather[0].description}
                  </p>
                  <MDBIcon
                    fas
                    icon={weatherIcons[weatherData.weather[0].description]}
                    size="3x"
                    style={{ color: "grey" }}
                  />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
