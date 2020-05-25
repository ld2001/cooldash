import React, { PureComponent } from 'react';
import Newsapp from './Newsapp.js';
import Pricegraph from './Pricegraph.js';
import './App.css';
import RecordTransaction from "./components/record-transaction.component";
import ShowTransactions from "./components/show-transactions.component";

function SplitPane(props) {
	return (
	  <div className="SplitPane">
		  <div className="SplitPane-left">
			  {props.top}
		  </div>
		  <div className="SplitPane-mid">
			  {props.mid}
		  </div>
		  <div className="SplitPane-right">
			  {props.bottom}
		  </div>
		  <div className="SplitPane-bottom2">
			  {props.bottomtwo}
		  </div>
		  <div className="SplitPane-bottom3">
			  {props.bottomthree}
		  </div>
			
	  </div>
	);
}

export default class App extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {value: props.ticker};
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		let newTicker = document.getElementById("ticker_text").value;
		this.setState({value: newTicker}, function () {
			
		});
	}

	render() {

		return (	
			<div>
				<p>Ticker: <input type="text" id="ticker_text" name="ticker_text"></input> 
				<button onClick={this.handleClick}>
        			Search
      			</button> </p>
				<SplitPane
					top={
						<Newsapp id="newsapp" ticker={this.state.value} />
					}
					bottom={
						<Pricegraph id="pricegraph" ticker={this.state.value} />
					}
					bottomtwo={
						<RecordTransaction />
					}
					bottomthree={
						<ShowTransactions />
					}
				/>
      		</div>
		);
	}
}
