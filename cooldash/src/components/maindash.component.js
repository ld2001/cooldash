import React, { PureComponent } from 'react';
import Newsapp from './Newsapp.js';
import Pricegraph from './Pricegraph.js';
import SectorPerformance from './SectorPerformance.js';

function SplitPane(props) {
	return (
	  <div className="SplitPane">
			<span id = "leftplane" className = "Left">
				{props.left}
			</span>
			<span id = "rightplane" className = "Right">
				{props.right}
			</span>
			<span id = "middleleftplane" className = "MiddleLeft">
				{props.middleleft}
			</span>
			<span id = "middlerightplane" className = "MiddleRight">
				{props.middleright}
			</span>
			<span id="bottomleftplane" className = "BottomLeft">
				{props.bottomleft}
			</span>
			<span id="bottomrightplane" className = "BottomRight">
				{props.bottomright}
			</span>
	  </div>
	);
}

export default class MainDashboard extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: props.ticker,
			quote: "", 
			author: "", 
		};
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		let newTicker = document.getElementById("ticker_text").value;
		this.setState({value: newTicker});
	}

	render() {

		return (
			<div><h1 class = "titlebar">Welcome to Luke and Haeyoon's Trading Dashboard!</h1>	
				<div class="outterbox">
					<p id="quote">{this.state.quote}</p>
					<p id="author">{this.state.author}</p>
					<p>Ticker: <input type="text" id="ticker_text" name="ticker_text"></input> 
					<button onClick={this.handleClick}>
						Search
					</button> </p>
					<SplitPane
						left={<Newsapp id="newsapp" ticker={this.state.value} news={this.state.news}/>}
						middleleft={<Pricegraph id="pricegraph" ticker={this.state.value} />}
						middleright={<SectorPerformance />}
					/>
				</div>
			</div>
		);
	}

	getQuote() { 
		fetch("https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
			this.setState({
				quote: response.text,
				author: response.author,
			});
		})
		.catch(err => {
			console.log(err);
		});
	}

	componentDidMount() { 
		this.getQuote(); 
		this.render(); 
	}
}
