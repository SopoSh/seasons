import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
import './SeasonDisplay.css';


class App extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {lat: null, errorMessage: '', time: new Date().toLocaleTimeString()};
    }

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({lat: position.coords.latitude}),
            err => this.setState({ errorMessage: err.message}),
        );
        setInterval( ()=> {
            this.setState({time: new Date(). toLocaleTimeString()})
        }, 1000)
    }
    renderContent(){
        if (this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}
            </div>
        }
        if(!this.state.errorMessage && this.state.lat){
         return <SeasonDisplay lat={this.state.lat}/>
        }
        return <Spinner message="please accept location request"/>  
     
        }

    render(){
       return(
            <div className="border red">
            <h1 className="Time">{this.state.time}</h1>
        {this.renderContent()}
        </div>
       )
    }
}
ReactDOM.render(<App />, document.querySelector('#root'));