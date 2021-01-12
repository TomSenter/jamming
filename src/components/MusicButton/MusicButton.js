import './MusicButton.css';
import React from 'react';

export class MusicButton extends React.Component{
    constructor(props){
        super(props);

        this.state={
           play: false,
           pause: true
        };

        this.url = this.props.url;
        this.audio = new Audio(this.url);
         

         this.play = this.play.bind(this);
         this.pause = this.pause.bind(this);
        

    }

    play(){
        this.setState({
            play:true,
            pause: false
        });

        this.audio.play();
    }


    pause(){
        this.setState({
            play: false,
            pause: true
        });

        this.audio.pause();
    }

    render(){
        return (
            <div className="flex">
                <button onClick={this.play}>Play</button>
                <button onClick={this.pause}>Pause</button>

            </div>
        );
    }

}