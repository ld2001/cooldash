import React, { PureComponent } from 'react';
import Newsapp from './Newsapp.js';
import Pricegraph from './Pricegraph.js';

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
	  </div>
	);
}

export default class MainDashboard extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {value: props.ticker};
		this.handleClick = this.handleClick.bind(this);
		this.goToRecordTransaction = this.goToRecordTransaction.bind(this);
	}
	
	handleClick() {
		let newTicker = document.getElementById("ticker_text").value;
		this.setState({value: newTicker}, function () {
			
		});
	}

	goToRecordTransaction() { 
		window.location = "/admin";
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
				/>
				<br />
				<button onClick={this.goToRecordTransaction}>Record Transaction</button>
      		</div>
		);
	}
}
