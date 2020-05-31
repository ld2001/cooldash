import React, { PureComponent } from 'react';
import {
    BarChart, Bar, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';

const data = [
    {
      name: 'Real Estate', performance: 1.25,
    },
    {
      name: 'Information Technology', performance: 2.25, 
    },
    {
      name: 'Consumer', performance: -1.25,
    },
  ];
export default class SectorPerformance extends PureComponent {

    constructor(props) { 
        super(props);
        this.state = { data: [] }
    }

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

    render() {
        return (
            <div class="sectorperformance">
                <div>
                    <h3>5-day Sector Performance</h3>
                </div>
                <BarChart
                    width={500}
                    height={300}
                    data={this.state.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label="%"/>
                <Tooltip />
                <Legend />
                        <Bar dataKey="performance" fill="#82ca9d" />
                        <LabelList dataKey="performance" angel="45"/>
                </BarChart>
          </div>

      );
    }

    getData(){
		let fetchval = "https://alpha-vantage.p.rapidapi.com/query?function=SECTOR";
   
        fetch(fetchval, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
			}
			})
			.then(response => response.json())
			.then(response => {
			console.log(response);
			return response;
			}) 
            .then(response => {
                var newData = [];

				for (const industry in response["Rank C: 5 Day Performance"]) {
					var temp = {};
                    temp["name"] = industry;
					temp["performance"] = parseFloat(response["Rank C: 5 Day Performance"][industry]);
					newData.push(temp);	
				}

                this.setState({ data: newData });
                console.log(this.state.data);
				
		})
	}

    componentDidMount() {
        this.getData();
        this.render();
    }        

}