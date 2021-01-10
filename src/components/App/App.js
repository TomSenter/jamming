import {SearchBar} from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify';
import './App.css';
import React from 'react';




class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [{name:'name 1',artist:'artist 1',album:'album 1',id:'4'},
      {name:'name 2',artist:'artist 2',album:'album 2',id:'5'},
      {name:'name 2',artist:'artist 2',album:'album 2',id:'6'}
    ]
    };
     

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    
    let tracks = this.state.playlistTracks;
     if(tracks.find(savedTrack=>{
       
      return savedTrack.id === track.id;
    })){
      return;
    } else{
      tracks.push(track);

      // it takes out the array, and this.setState fills it back in
      this.setState({
        playlistTracks: tracks
      });
    }
   
  }

  removeTrack(track){
    
    let tracks = this.state.playlistTracks;
     if(tracks.find(savedTrack=>{
          return savedTrack.id !== track.id;
     })){
       tracks.pop(track);
       this.setState({playlistTracks: tracks});
     } else{
       return;
     }

  }

  // playlist methods

  updatePlaylistName(name){
      this.setState({playlistName:name});
  }
  
  savePlaylist(){
    this.state.playlistTracks.map(track=> track.uri);
  }


  // search func
  search(term){
    Spotify.search(term).then(searchResults=>{
      console.log(searchResults);
      this.setState({
        
        searchResults: searchResults
      });
    });
  }


  render(){
    return (
<div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search} />
    <div className="App-playlist">
      <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
      <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
    </div>
  </div>
</div>
    );
  }
}
//when using function like addTrack in props, no () is required because you don't want to call it straight away
export default App;
