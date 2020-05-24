import React, {PureComponent} from 'react'; 

export default class Newsapp extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {data1: [],data2 : []};
	}

	render() {
		console.log(this.state.data1);
		let returnVals = new Array;
		let arrayab = ["a","b"]

		for(let i = 0; i < 10; i++ ) {
			returnVals.push(<div>{this.state.data1[i]} <a href = {this.state.data2[i]}>Link</a></div>);
			// returnVals.push(<div>{this.state.data2[i]}</div>);
		}

		return (
			<p class = "news">{returnVals}</p>
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

    
