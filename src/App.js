import React, { Component } from 'react';
import Title from './components/Title'
import Form from './components/Form'
import Weather from './components/Weather'

// Get your apikey from https://openweathermap.org/api and replace here with your own key.
const API_KEY = "";
    
class App extends Component {

  state ={
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined  
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.city.value;
    
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.table(data);
    if (city && country){
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });  
    }
    else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter city and country!"
      });
    }
    
  }
  
  render() {
    return (
      <div className="App">
          <Title />
          <Form getWeather={this.getWeather} />
          <Weather 
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
            />
      </div>
    );
  }
}

export default App;
