import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState("Gandhinagar");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      background: 'linear-gradient(135deg,rgb(12, 0, 90) 0%,rgb(0, 23, 61) 90%)',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    },
    title: {
      color: 'white',
      marginBottom: '1.5rem',
      fontSize: '1.8rem',
      fontWeight: '600'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      marginBottom: '1rem',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#3498db'
    },
    button: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease, transform 0.1s ease'
    },
    buttonHover: {
      backgroundColor: '#2980b9'
    },
    error: {
      color: '#e74c3c',
      marginTop: '1rem',
      fontWeight: '500'
    },
    weatherInfo: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '8px',
      padding: '1.5rem',
      marginTop: '1.5rem',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
    },
    weatherInfoText: {
      margin: '0.5rem 0',
      color: '#34495e'
    }
  };

  const fetchWeather = async () => {
    // Only fetch weather if the city is exactly "Gandhinagar"
    if (city.toLowerCase() !== "gandhinagar") {
      setError("Weather data is only available for Gandhinagar");
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=23.2167&longitude=72.6833&hourly=temperature_2m"
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      const temperature = data.hourly.temperature_2m[0];
      setWeather({
        temperature: `${temperature}°C`,
        humidity: "65%",
        condition: "Partly Cloudy"
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather();  // eslint-disable-next-line
  }, []);


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Weather App</h2>
      <input
        style={styles.input}
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
        onBlur={(e) => e.target.style.borderColor = styles.input.border}
      />
      <button
        style={styles.button}
        onClick={fetchWeather}
        onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
      >
        Get Weather
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {weather && (
        <div style={styles.weatherInfo}>
          <p style={styles.weatherInfoText}>Temperature: {weather.temperature}</p>
          <p style={styles.weatherInfoText}>Humidity: {weather.humidity}</p>
          <p style={styles.weatherInfoText}>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;