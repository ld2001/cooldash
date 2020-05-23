import React, { PureComponent } from 'react';
import logo from './logo.svg';
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


class Newsapp extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {data1: [],data2 : []};
	}

	render() {
		console.log(this.state.data1);
		let returnVals = new Array;
		let arrayab = ["a","b"]

		for(let i = 0; i < 10; i++ ) {
			returnVals.push(<div>{this.state.data1[i]}</div>);
			returnVals.push(<div>{this.state.data2[i]}</div>);
		}

		return (
			<p>{returnVals}</p>
		);
	}

	getData(){
		 
		fetch("https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search?count=10&offset=0&mkt=en-US&q=Freddie%20Mac", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
				"x-rapidapi-key": "5447e4c19amsh97fe59f8c09fabdp127dfcjsn0d4259531f73",
				"useQueryString": true
			}
			})
			.then(response => response.json())
			.then(response => {
			console.log(response);
			return response;
			}) 
			.then (response => {
				var newData1 = [];
				var newData2 = [];
				for (const number in response.value) {
					// var temp = new Object();
					// newData.push(response.value[number].name)
					
					newData1.push(response.value[number].name);
					newData2.push(response.value[number].url);
					// newData.push(temp);	
				}

				this.setState({data1: newData1});
				this.setState({data2: newData2});
				
		})
	}
	  
	
	componentDidMount(){
		this.getData();	// comment it out (try not to make API calls)
		this.render();
	}
  }


class Example extends PureComponent {
	static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
  
	constructor(props) {
		super(props);
		this.state = {data: new Object()};
	}

	render() {
	  return (
		<LineChart
		  width={500}
		  height={300}
		  data={this.state.data}
		  margin={{
			top: 5, right: 30, left: 20, bottom: 5,
		  }}
		>
		  <CartesianGrid strokeDasharray="3 3" />
		  <XAxis dataKey="Date" tick={false}/>
		  <YAxis />
		  <Tooltip />
		  <Legend />
		  <Line type="monotone" dataKey="Price" stroke="#8884d8" activeDot={{ r: 0 }} dot={false} />
		</LineChart>
	  );
	}

	getData(){
		 
		fetch("https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/FMCC/1d", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
				"x-rapidapi-key": "5447e4c19amsh97fe59f8c09fabdp127dfcjsn0d4259531f73",
				"useQueryString": true
			}
			})
			.then(response => response.json())
			.then(response => {
			console.log(response);
			return response;
			}) 
			.then (response => {
				var newData = [];
				for (const day in response.items) {
					var temp = new Object();
					temp["Date"] = response.items[day].date;
					temp["Price"] = response.items[day].close;
					newData.push(temp);	
				}

				this.setState({data: newData});
				
		})
	}
	  
	
	componentDidMount(){
	// this.getData();
	this.render();
	}
  }
  

function App() {
  return (
    <SplitPane
      top={
        <Newsapp />
      }
      mid={
        <Mid />
      }
      bottom={
        <Example />
      } />
  );
}







// fetch("https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/FMCC/1d", {
//   "method": "GET",
//   "headers": {
//     "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
//     "x-rapidapi-key": "5447e4c19amsh97fe59f8c09fabdp127dfcjsn0d4259531f73",
//     "useQueryString": true
//   }
// })
// .then(response => response.json())
// .then(response => {
//   console.log(response);
//   return response;
// }) 
// .then (response => {
//   for (const day in response.items) {
//     console.log(`${day}: ${response.items[day].close}`);
//   }
// })
// .catch(err => { console.log(err); 
// });




export default App;
