import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon }  from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      accessToken: 'BQCmY6mqldPQ0RK1ZbcmbdyaSWOqWVGNEo9C2eycbbv0_tEKoYxyOwf76B6td_02lZ89enPSBsPAtawofMB4-RsTd7rVrA5wgvRkXAUmkef2ffONfWrifCWNd5ktWnO_uQstrmJg3Us-hC2MsfWhJBELbX9dQw',
      artist: null
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
    fetch(FETCH_URL, {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + this.state.accessToken
      },
      mode: 'cors',
      cache: 'default'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      console.log('artist', artist);
      this.setState({artist: artist});
    });

  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <div>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search for an Artist"
                value={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                      this.search()
                    }
                  }
                }
                />
              <InputGroup.Addon onClick={() => this.search()}>
                <Glyphicon glyph="search" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          <input placeholder="search an artist..." />
          <button>Search</button>
        </div>
        <div className="Profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="Gallery">
          Gallery
        </div>
      </div>
    )
  }
}

export default App;
