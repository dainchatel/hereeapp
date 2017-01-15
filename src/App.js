import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Match, Miss } from 'react-router';
import axios from 'axios';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Neighborhoods from './components/Neighborhoods';
import Contact from './components/Contact';
import EditEntry from './components/EditEntry';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentDest: '',
    }
    this.addDestination = this.addDestination.bind(this);
    this.addDestToList = this.addDestToList.bind(this);
    this.createNeighb = this.createNeighb.bind(this);
  }

  componentDidMount() {
    this.getTheNeighbs();
  }

  getTheNeighbs() {
    axios.get('https://wego-df1c5.firebaseio.com/.json')
      .then((res) => {
        this.setState({neighborhoods: res.data})
  })
      .catch((error) => {
        console.log(error);
  });
  }

  addDestination(dest) {
    this.setState({currentDest: dest});
  }

  addDestToList(dest) {
    const { neighborhoods } = this.state;
    let neighbKey;
    Object.keys(neighborhoods).map(key => {
      if (neighborhoods[key].name === dest.neighborhood) {
        neighbKey = key;
      }});
    axios.post('https://wego-df1c5.firebaseio.com/'+neighbKey+'.json', {
      name: dest.name,
      neighborhood: dest.neighborhood,
      cross1: dest.cross1,
      cross2: dest.cross2
    })
      .then((res) => {
        this.getTheNeighbs();
      });
  }

  createNeighb(neighbName) {
    axios.post('https://wego-df1c5.firebaseio.com/.json', neighbName)
      .then((res) => {
        let neighbs = this.state.neighborhoods;
        let newNeighbId = res.data.name;
        neighbs[newNeighbId] = neighbName;
        this.setState({neighborhoods: neighbs})

      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="main">
            <Match exactly pattern="/" component={() => <Home addDestination={this.addDestination} />}
            />
            <Match exactly pattern="/neighborhoods" component={() => <Neighborhoods createNeighb={this.createNeighb} neighborhoods={this.state.neighborhoods}/>}
            />
            <Match exactly pattern="/contact" component={Contact} />
            <Match exactly pattern="/editentry" component={() => <EditEntry addDestToList={this.addDestToList} currentDest={this.state.currentDest} neighborhoods={this.state.neighborhoods}/>}
            />
            <Miss component={NotFound} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
