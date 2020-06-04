import React, { PureComponent } from 'react';
import Newsapp from './Newsapp.js';
import Pricegraph from './Pricegraph.js';
import SectorPerformance from './SectorPerformance.js';
import Transactions from './Transactions.js';
import ShowPrediction from './Predictions.js';

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
			<div id="bigbox">
				<div id="title">STOCK DASHBOARD</div>
				<div class="outterbox">
					<div className="item1" id="quote">{this.state.quote} <span id="author">-{this.state.author}</span></div>
					<div className="item2" id="ticker">
						{/* <label htmlFor="ticker_text">Which Stock News? </label> */}
						<input type="text" id="ticker_text" name="ticker_text" placeholder="Enter stock ticker to view related news and prices"></input> 
						<button onClick={this.handleClick}><i class="fa fa-search"></i></button> 
					</div>
					<div className="item3">
						<Newsapp id="newsapp" ticker={this.state.value} news={this.state.news} />
					</div>
					<div className="item4">
						<Pricegraph id="pricegraph" ticker={this.state.value} />
					</div>
					<div className="item5">
						<SectorPerformance />
					</div>
					<div className="item6">
						<Transactions />
					</div>
					<div className="item7">
						<ShowPrediction />
					</div>
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
