import {SearchBar} from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify';
import './App.css';
import React from 'react';


// think it doesn't have the access token loaded sometimes so it reloads the page


// spotify object is passed down 


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
     

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    
    let tracks = this.state.playlistTracks;
    let search = this.state.searchResults;
    
     if(tracks.find(savedTrack=>{
       // if already in playlist add
      return savedTrack.id === track.id;
    })){
      return;
    } else{
      let index = search.indexOf(track);
      tracks.push(track);
      search.splice(index,1);

      // it takes out the array, and this.setState fills it back in
      this.setState({
        playlistTracks: tracks,
        searchResults: search
      });
    }

    
   
  }

  removeTrack(track){
    
    let tracks = this.state.playlistTracks;
    let search = this.state.searchResults;
     /*if(tracks.find(savedTrack=>{
          return savedTrack.id !== track.id;
     })){
       // this gets rid of the specific item at that index
       let index = tracks.indexOf(track);
       tracks.splice(index,1);
       this.setState({playlistTracks: tracks});
     } else if(tracks.find(savedTrack=>{
      return savedTrack.id === track.id;
     })){
       let index = tracks.indexOf(track);
      tracks.splice(index,1);
      this.setState({playlistTracks: tracks});
         
     } else{
       return;
     }*/
       


       // found a better solution for the deletion of tracks
     if(tracks.find(savedTrack=>{
      return savedTrack.id === track.id;
     })){
       let index = tracks.indexOf(track);
      tracks.splice(index,1);
      search.unshift(track);
      this.setState({playlistTracks: tracks,
      searchResults:search});
         
     } else{
       return;
     }

  }

  // playlist methods

  updatePlaylistName(name){
      this.setState({playlistName:name});
  }
  
  savePlaylist(){
    const trackUris= this.state.playlistTracks.map(track=> track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackUris).then(()=>{
        this.setState({
          playlistName:'New Playlist',
          playlistTracks: []
        })
    });
  }
   

  

  // it would get access token each time it searched was the problem
  search(term){
    Spotify.search(term).then(searchResults=>{
      
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

  componentDidMount(){
    Spotify.getAccessToken();
  }


  
  
}
//when using function like addTrack in props, no () is required because you don't want to call it straight away
export default App;
