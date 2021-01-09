import React from 'react';
import './TrackList.css';

export class TrackList extends React.Component{
    render(){
        return (
    <div className="TrackList">
       {this.props.tracks.map((track)=>{
           return (
        <ul>
           <li key={track.id}>{track.name}</li>
           <li key={track.id}>{track.artist}</li>
           <li key={track.id}>{track.album}</li>
           
        </ul>);
       })}
    </div>
        );
    }
}