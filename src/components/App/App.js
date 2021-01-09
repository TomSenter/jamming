import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import './App.css';
import React from 'react';




class App extends React.Component{
  render(){
    return (
<div>
  <h1>Ja<span class="highlight">mmm</span>ing</h1>
  <div class="App">
    <SearchBar />
    <div class="App-playlist">
      <SearchResults/>
      <Playlist/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
