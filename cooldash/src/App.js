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

let data = [
	{Date : 5,
	Price : 6}
];
  
class Example extends PureComponent {
	static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
  
	render() {
	  return (
		<LineChart
		  width={500}
		  height={300}
		  data={data}
		  margin={{
			top: 5, right: 30, left: 20, bottom: 5,
		  }}
		>
		  <CartesianGrid strokeDasharray="3 3" />
		  <XAxis dataKey="Date" />
		  <YAxis />
		  <Tooltip />
		  <Legend />
		  <Line type="monotone" dataKey="Price" stroke="#8884d8" activeDot={{ r: 8 }} />
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
				for (const day in response.items) {
					var temp = new Object();
					temp["Date"] = response.items[day].date;
					temp["Price"] = response.items[day].close;
					data.push(temp);
					
					
				}
				console.log(data);
				
		})
	}
	  
	
	componentDidMount(){
	this.getData();
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
