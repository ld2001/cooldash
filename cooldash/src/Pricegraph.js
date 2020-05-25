import React, {PureComponent} from 'react';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts'; 

export default class Pricegraph extends PureComponent {
	static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
  
	constructor(props) {
		super(props);
		this.state = {data: new Object(), ticker : props.ticker};
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

	componentWillReceiveProps(nextProps) {
		if(!(this.props.value == nextProps)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
		{
		  
	
		  this.setState({ticker: nextProps.ticker}, function () {
				this.getData();
		  		this.render();
		  });
		  
		}
	}

	getData(){
		let fetchval = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/" + this.state.ticker + "/1d";
   
        fetch(fetchval, {
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
	this.getData();
	this.render();
	}
  }