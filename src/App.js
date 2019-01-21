import React, {Component} from 'react';
import './App.css';
//import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/journal/bootstrap.css";

import {Col, Grid, Navbar, Row} from "react-bootstrap";

const PLACES = [
    {name: "Mexico City", zip: "94303"},
    {name: "San Jose", zip: "94088"},
    {name: "Santa Cruz", zip: "95062"},
    {name: "Honolulu", zip: "96803"}
];

class WeatherDisplay extends Component {

    constructor() {
        super();
        this.state = {
            weatherData: null
        };
    }

    componentDidMount() {
        const zip = this.props.zip;
        const URL = "http://api.openweathermap.org/data/2.5/weather?q=" + zip +
            "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";

        console.log("reloading api");

        fetch(URL)
            .then(res => res.json())
            .then(json => {
                    this.setState({weatherData: json});
                }
            );
    }

    render() {
        const weatherData = this.state.weatherData;
        if (!weatherData)
            return <div>Loading</div>;

        const weather = weatherData.weather[0];
        const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";

        return (
            //<div>{JSON.stringify(weatherData)}</div>
            <div>
                <h1>
                    {weather.main} in {weatherData.name}
                    <img src={iconUrl} alt={weather.description}/>
                </h1>
                <p>Current: {weatherData.main.temp}°</p>
                <p>High: {weatherData.main.temp_max}°</p>
                <p>Low: {weatherData.main.temp_min}°</p>
                <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
            </div>
        );
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            zip: "",
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({zip: event.target.value, submitted: false});
        console.log("handled change");
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({submitted: true});
        alert(this.state.zip + ' was submitted');
    }

    renderUserInfo() {
        return <WeatherDisplay zip={this.state.zip}/>
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            React Simple Weather App
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>

                <Grid>
                    <Row>
                        <Col md={4} sm={4}>
                            <h3>Search a city by Zip</h3>

                            <form onSubmit={this.handleSubmit}>
                                <fieldset className="form-group">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="inputDefault">Enter zip</label>
                                        <input type="text"
                                               className="form-control"
                                               placeholder="30345"
                                               value={this.state.zip}
                                               name="zip"
                                               onChange={this.handleChange}
                                               id="inputDefault"/>
                                        <button type="submit" className="btn btn-primary">Search</button>
                                    </div>
                                </fieldset>
                            </form>

                        </Col>
                        <Col md={8} sm={8}>
                            {this.state.submitted && this.renderUserInfo()}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
