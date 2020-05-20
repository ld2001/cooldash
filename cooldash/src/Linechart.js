
var React = require('react');
var Component = React.Component;
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];

class Linechart extends Component {
	render() {
		const options = {
			exportEnabled: true,
			title: {
				text: "Microsoft Corporation Stock Price - December 2017"
			},
			axisX: {
				valueFormatString: "D MMM"
			},
			axisY: {
				title: "Price",
				includeZero: false,
				prefix: "$"
			},
			data: [{
				type: "candlestick",
				name: "Microsoft Corporation Price",
				showInLegend: true,
				yValueFormatString: "$##0.00",
				xValueType: "dateTime",
				dataPoints: dataPoints
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	componentDidMount(){
		var chart = this.chart;
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
            
            dataPoints.push({
                        x: response.items[day].date,
                        y: response.items[day].close
            });
            
            console.log(`${response.items[day].date}: ${response.items[day].close}`);
        }
        chart.render();
        return response;
        })
        .catch(err => { console.log(err); 
        });
	}
}


export default Linechart;