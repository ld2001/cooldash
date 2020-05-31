import React, {PureComponent} from 'react'; 

export default class Newsapp extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data1: [],
			data2: [],
			ticker: "FMCC"
		};
	}

	render() {
		console.log(this.state.data1);
		let returnVals = [];

		for(let i = 0; i < 10; i++ ) {
			returnVals.push(<div>{this.state.data1[i]} <a href = {this.state.data2[i]}>Link</a></div>);
		}

		return (
			<div class = "newsbox">
				<h3>The Latest {this.state.ticker} News </h3>
				<div class = "news">{returnVals}</div>
			</div>
		);
	}

	getData(){
		
		let fetchval = "https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search?count=10&offset=0&mkt=en-US&q=" + this.state.ticker;
		
		fetch(fetchval, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
				"x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
				"useQueryString": true
			}
			})
			.then(response => response.json())
			.then (response => {
				var newData1 = [];
				var newData2 = [];
				for (const number in response.value) {
					newData1.push(response.value[number].name);
					newData2.push(response.value[number].url);
				}

				this.setState({data1: newData1});
				this.setState({data2: newData2});
				
		})
	}


	componentWillReceiveProps(nextProps) {
		if(!(this.props.value === nextProps)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
		{
		  this.setState({ticker: nextProps.ticker}, function () {
				this.getData();
		  		this.render();
		  });
		  
		}
	}
	

	componentDidMount(){
		this.getData();	// comment it out (try not to make API calls)
		this.render();
	}
  }