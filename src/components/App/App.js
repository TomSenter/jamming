import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import './App.css';
import React from 'react';




class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{name:'name 1',artist:'artist 1',album:'album 1',id:'1'},
      {name:'name 2',artist:'artist 2',album:'album 2',id:'2'},
      {name:'name 2',artist:'artist 2',album:'album 2',id:'3'}
    ],
      playlistName: 'My Playlist',
      playlistTracks: [{name:'name 1',artist:'artist 1',album:'album 1',id:'1'},
      {name:'name 2',artist:'artist 2',album:'album 2',id:'2'},
      {name:'name 2',artist:'artist 2',album:'album 2',id:'3'}
    ]
    };
  }
  render(){
    return (
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults}/>
      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
    </div>
  </div>
</div>
    );
  }
}

export default App;
