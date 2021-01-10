import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

 class Playlist extends React.Component{

    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e){
        let value = e.target.value;
        this.props.onNameChange(value);
    }

    render(){
        return (
        <div className="Playlist">
            <input onChange={this.handleNameChange} defaultValue={this.props.playlistName}/>
            <TrackList tracks={this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove} />
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div> 
        );
    }
}

export default Playlist;
// tracks needed to be passed as a prop in both tracklist components for some reason