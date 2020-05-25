import React, { PureComponent } from 'react';
import logo from './logo.svg';
import Newsapp from './Newsapp.js';
import Pricegraph from './Pricegraph.js';
import './App.css';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Twitter() {
  return <h1> Tweets! </h1>;
}

function Mid() {
  return <div class="wrapper">
  <News></News>
  <Stocks></Stocks>
  
</div>;
}

function News() {
  return <div class="box a">News</div>;
}

function Stocks() {
  return <div class="box b">Stock</div>;
}

function Graphs() {
  return <h1> Graphs! </h1>;;
}

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
		// this.News = <Newsapp ticker = {this.state.value} />;
		// this.Price = <Pricegraph ticker = {this.state.value} />;
		
		

		return (	
			<div>
				<p>Ticker: <input type="text" id="ticker_text" name="ticker_text"></input> 
				<button onClick={this.handleClick}>
        			Search
      			</button> </p>
				<SplitPane
				top={
					<Newsapp id = "newsapp" ticker = {this.state.value} />
				}
				bottom={
					<Pricegraph id = "pricegraph" ticker = {this.state.value}/>
				} />
      		</div>
		);
	}

	  
	// constructor(props) {
	// 	super(props);
	// 	this.state = {quote: "FMCC"};
	// 	this.handleChange = this.handleChange.bind(this);
    // 	this.handleSubmit = this.handleSubmit.bind(this);
	// }
  
	// // Write search function that onclick changes the value
	// handleChange(event) {
	// 	this.setState({value: event.target.value});
	// }
	
	// handleSubmit(event) {
	// 	alert('A name was submitted: ' + this.state.value);
	// 	event.preventDefault();
	// }
	

	// // Pass props down to the children
	// render() {
	// var News = <Newsapp />;
	// var Price = <Pricegraph />;
    // return (
		
	// 	<form onSubmit={this.handleSubmit}>
	// 		<label>
	// 			Quote:
	// 		<input type="text" value={this.state.value} onChange={this.handleChange} />
	// 		</label>
	// 		<input type="submit" value="Search" />
	// 	</form>
	// 	// <SplitPane
	// 	// top={
	// 	// 	News
	// 	// }
	// 	// mid={
			
	// 	// }
	// 	// bottom={
	// 	// 	Price
	// 	// } />
	// 	);
	// }
}
