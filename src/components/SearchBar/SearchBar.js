
import './SearchBar.css';
import React from 'react';

export class SearchBar extends React.Component{

    constructor(props){
        super(props);

        

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(e){
       const value = e.target.value;
       this.setState({
           term: value
       });
    }

    search(){
        this.props.onSearch(this.state.term);
    }
    render(){
        return (
            <div className="SearchBar">
            <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
            <button onClick={this.search} className="SearchButton">SEARCH</button>
          </div>
        );
    }


    

}