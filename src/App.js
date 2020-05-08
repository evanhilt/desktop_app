import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: 30,
      cloudCover: '',
      precipitation: '',
      wind: 0,
      submit: false
    }
  }

  onChangeTemp(newTemp) {
    this.setState({
      temp: newTemp
    });
  }

  onChangeWind(newWind) {
    this.setState({
      wind: newWind
    });
  }

  onChangeCloudCover(newCloudCover) {
    this.setState({
      cloudCover: newCloudCover
    });
  }

  onChangePrecipitation(newPrecipitation) {
    this.setState({
      precipitation: newPrecipitation
    });
  }

  onChangeSubmit(boolVal) {
    this.setState({
      submit: boolVal
    });
  }

  handleReset() {
    this.setState({
      temp: 30,
      cloudCover: '',
      precipitation: '',
      wind: 0,
      submit: false
    });
    window.location = "#Home";
    window.location.reload();
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <a href="#Home" className="headerText WeatherFinder">Weather Finder</a>
          <div className="tabs">
            <a href="#Temperature" className="headerText Categories">Temperature</a>
            <a href="#CloudCover" className="headerText Categories">Cloud Cover</a>
            <a href="#Precipitation" className="headerText Categories">Precipitation</a>
            <a href="#Wind" className="headerText Categories">Wind</a>
            <a href="#Find" className="headerText Categories">Find</a>
          </div>
        </header>
        <body>
          <div id="Home" className="App-section home">
            <p className="logoText">Weather Finder</p>
            <p className="bigText descriptonText">Describe the weather you want and find
            locations!</p>
            <img className="icons arrowIcon" src={require('./images/arrow.svg')} />
          </div>
          <div id="Temperature" className="App-section temperature">
            <p className="bigText">Temperature</p>
            <TemperatureBox
              temp={this.state.temp}
              onTempChange={this.onChangeTemp.bind(this)}
            />
          </div>
          <div id="CloudCover" className="App-section cloudCover">
            <p className="cloudText bigText">Cloud Cover</p>
            <CloudBox
              cloudCover={this.state.cloudCover}
              onCloudCoverChange={this.onChangeCloudCover.bind(this)}
            />
          </div>
          <div id="Precipitation" className="App-section precipitation">
            <p className="bigText precipitationText">Precipitation</p>
            <PrecipBox
              precipitation={this.state.precipitation}
              onPrecipitationChange={this.onChangePrecipitation.bind(this)}
            />
          </div>
          <div id="Wind" className="App-section wind">
            <p className="bigText">Wind</p>
            <WindBox
              wind={this.state.wind}
              onWindChange={this.onChangeWind.bind(this)}
            />
          </div>
          <div id="Find" className="App-Section home extendingSection">
            {(() => {
              if(this.state.submit == false) {
                return(<p className="bigText">Find locations with this weather</p>)
              } else {
                return(<p className="bigText">Results</p>)
              }
            })()}
            <FindBox
              temp={this.state.temp}
              cloudCover={this.state.cloudCover}
              precipitation={this.state.precipitation}
              wind={this.state.wind}
              submit={this.state.submit}
              onSubmitChange={this.onChangeSubmit.bind(this)}
            />
            {(() => {
              if(this.state.submit == true) {
                return(
                  <div className="cloudContainer weather">
                    <form ref="form" onSubmit={this.handleReset.bind(this)}>
                      <button
                        type="submit"
                        id="reset"
                        className="button">
                        Reset
                      </button>
                    </form>
                  </div>
                )
              }
            })()}
          </div>
        </body>
      </div>
    );
  }
}

class TemperatureBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: this.props.temp
    }
  }
  handleChange(event) {
    this.props.onTempChange(event.target.value);
    console.log("TempChanged");
  }
  render() {
    return(
      <div className="cloudContainer windTempSelect">
        <input
          type="range"
          className="slider tempSlider"
          min="-65"
          max="125"
          id="tempSlider"
          value={this.props.temp}
          onChange={this.handleChange.bind(this)}>
        </input>
        <p className="bigText windTempText">{this.props.temp + "° F"}</p>
      </div>
    );
  }
}

class CloudBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCloudCover: this.props.cloudCover,
    };
  }
  handleChange(event) {
    this.props.onCloudCoverChange(event.target.value);
  }
  render() {
    return(
      <div className="cloudContainer cloudCoverSelect">
        <img className="icons" src={require('./images/sunny.svg')} />
        <img className="icons cloudIcons" src={require('./images/partly_cloudy.svg')} />
        <img className="icons cloudIcons" src={require('./images/cloudy.svg')} />
        <div className="emptyDiv"></div>
        <div className="radio-toolbar cloudRadio">
          <input
            type="radio"
            id="radioSunny"
            name="radio"
            value="Sunny"
            onChange={this.handleChange.bind(this)}/>
          <label for="radioSunny">Sunny</label>
          <input
            type="radio"
            id="radioPartlyCloudy"
            name="radio"
            value="Partly Cloudy"
            onChange={this.handleChange.bind(this)}/>
          <label for="radioPartlyCloudy">Partly Cloudy</label>
          <input
            type="radio"
            id="radioCloudy"
            name="radio"
            value="Cloudy"
            onChange={this.handleChange.bind(this)}/>
          <label for="radioCloudy">Cloudy</label>
        </div>
      </div>
    );
  }
}

class PrecipBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPrecipitation: ""
    };
  }
  handleChange(event) {
    this.props.onPrecipitationChange(event.target.value);
  }
  render() {
    return(
      <div className="cloudContainer cloudCoverSelect precipitationSelect">
        <img className="icons_small" src={require('./images/rain.svg')} />
        <img className="icons_small" src={require('./images/sleet.svg')} />
        <img className="icons_small" src={require('./images/snow.svg')} />
        <img className="icons_small" src={require('./images/hail.svg')} />
        <img className="icons_small" src={require('./images/none.svg')} />
        <div className="emptyDiv"></div>
        <div id="toolbar" className="radio-toolbar precipRadio">
          <input
            type="radio"
            id="radioRain"
            name="radio"
            value="Rain"
            onChange={this.handleChange.bind(this)}/>
          <label for="radioRain">Rain</label>
          <input
            type="radio"
            id="radioSleet"
            name="radio"
            value="Sleet"
            onChange={this.handleChange.bind(this)}/>
          <label for="radioSleet">Sleet</label>
          <input
            type="radio"
            id="radioSnow"
            name="radio"
            value="Snow"
            onChange={this.handleChange.bind(this)}/>
          <label for="radioSnow">Snow</label>
          <input
            type="radio"
            id="radioHail"
            name="radio"
            value="Hail"
            onChange={this.handleChange.bind(this)}/>
          <label for="radioHail">Hail</label>
          <input
            type="radio"
            id="radioNone"
            name="radio"
            value="None"
            onChange={this.handleChange.bind(this)}/>
          <label for="radioNone">None</label>
        </div>
      </div>
    );
  }
}

class WindBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wind: this.props.wind
    }
  }
  handleChange(event) {
    this.props.onWindChange(event.target.value);
  }
  render() {
    return(
      <div className="cloudContainer windTempSelect">
        <input
          type="range"
          className="slider windSlider"
          min="0"
          max="200"
          id="tempSlider"
          value={this.props.wind}
          onChange={this.handleChange.bind(this)}>
        </input>
        <p className="bigText windTempText">{this.props.wind + " mph"}</p>
      </div>
    );
  }
}

class FindBox extends Component {
  constructor(props) {
    super(props)
    this.finalTemp = ''
    this.finalCloud = ''
    this.finalPrecip = ''
    this.finalWind = ''
    this.state = {
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    var message = "";
    if (this.props.cloudCover == '' || this.props.precipitation == '') {
      message = "Fill all fields before submitting";
      window.location = "#Find"
    } else {
      this.finalTemp = this.props.temp;
      this.finalCloud = this.props.cloudCover;
      this.finalPrecip = this.props.precipitation;
      this.finalWind = this.props.wind;
      this.props.onSubmitChange(true);
    }
    this.setState({
      message: message
    });
  }

  render() {
    return(
      <div className="cloudContainer weather">
        {(() => {
          if(this.props.submit == false) {
            return(
              <div>
                <p className="weather-text">{"Temperature: " + this.props.temp}</p>
                <p className="weather-text">{"CloudCover: " + this.props.cloudCover}</p>
                <p className="weather-text">{"Precipitation: " + this.props.precipitation}</p>
                <p className="weather-text">{"Wind Speed: " + this.props.wind}</p>
                <p className="message-text">{this.state.message}</p>
                <form ref="form" onSubmit={this.handleSubmit}>
                  <button
                    type="submit"
                    id="submitWeather"
                    className="button">
                    Submit
                  </button>
                </form>
              </div>
            )
          } else {
            return(
              <div>
                <p className="weather-text">{"Temperature: " + this.finalTemp}</p>
                <p className="weather-text">{"CloudCover: " + this.finalCloud}</p>
                <p className="weather-text">{"Precipitation: " + this.finalPrecip}</p>
                <p className="weather-text">{"Wind Speed: " + this.finalWind}</p>
                <p className="message-text">{this.state.message}</p>
                <p className="bigText">Locations:</p>
                <div className="results">
                  <p className="weather-text">Provo Utah, USA</p>
                  <p className="weather-text">Salt Lake City Utah, USA</p>
                  <p className="weather-text">Wichita Kansas, USA</p>
                  <p className="weather-text">Memphis Tennessee, USA</p>
                  <p className="weather-text">Taos New Mexico, USA</p>
                  <p className="weather-text">Buenos Aires, Argentina</p>
                </div>
              </div>
            )
          }
        })()}
      </div>
    )
  }
}

export default App;
