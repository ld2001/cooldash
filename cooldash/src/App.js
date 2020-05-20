import React, { PureComponent } from 'react';
import './App.css';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import RecordTransaction from "./components/record-transaction.component";
import ShowTransactions from "./components/show-transactions.component";


var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



function Twitter() {
  return <h1> Tweets! </h1>;
}

function Mid() {
  return <div className="wrapper">
  <News></News>
  <Stocks></Stocks>
  
</div>;
}

function News() {
  return <div className="box a">News</div>;
}

function Stocks() {
  return <div className="box b">Stock</div>;
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
		<div className="SplitPane-bottom2">
			{props.bottomtwo}
		</div>
		<div className="SplitPane-bottom3">
			{props.bottomthree}
		</div>
		  
    </div>
  );
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
					temp["Date"] = day;
					temp["Price"] = response.items[day].close;
					newData.push(temp);	
				}

				this.setState({data: newData});
				
		})
	}
	  
	
	componentDidMount(){
	// this.getData();	// comment it out (try not to make API calls)
	this.render();
	}
  }




function App() {
	return (
    <SplitPane
			top={
				<Twitter />
			}
			mid={
				<Mid />
			}
			bottom={
				<Example />
			}
			bottomtwo={
				<RecordTransaction />
			}
			bottomthree={
				<ShowTransactions />
			}
		>
	</SplitPane>
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
