import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      fetchCities();
    }
  }, [selectedState]);

  const fetchCountry = async () => {
    try {
      const data = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const response = await data.json();
      setCountry(response);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchStates = async () => {
    try {
      const data = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      const response = await data.json();

      setStates(response);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCities = async () => {
    try {
      const data = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      const response = await data.json();

      setCities(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div className="container">
        <select
          name="country"
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>
          {country.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          name="state"
          id="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          name="city"
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city, index) => (
            <option value={city} key={index}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <h4>
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </h4>
      )}
    </div>
  );
}

export default App;