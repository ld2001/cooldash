import React, { Component } from 'react';
import axios from 'axios';

// functional react component 
const Record = props => (
    <tr>
        <td>{props.record.date.S}</td>
        <td>{props.record.ticker.S}</td>
        <td>{props.record.order.S}</td>
        <td>{props.record.num_share.N}</td>
        <td>{props.record.per_share_price.N}</td>
    </tr>
)

export default class InsertPrediction extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTicker = this.handleTicker.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.handleNumShare = this.handleNumShare.bind(this);
        this.handleSharePrice = this.handleSharePrice.bind(this);
        // this.goToMainDashboard = this.goToMainDashboard.bind(this);

        // state is like a big bag of variables
        this.state = {
            date: '',
            ticker: '',
            order: '', 
            num_share: '',
            per_share_price: '',
            search_key: '',
            records: [], 
            filteredRecords: []
        }
    }

    componentDidMount() { 
        axios.get('/adminTransaction')
            .then(response => { 
                console.log(response.data);
                this.setState({ records: response.data });
            })
            .catch((err) => { 
                console.log(err);
            })
    }

    handleDate(e) { 
        this.setState({
            date: e.target.value
        });
    }

    handleTicker(e) { 
        this.setState({
            ticker: e.target.value
        });
    }

    handleOrder(e) { 
        this.setState({
            order: e.target.value
        });
    }
 
    handleNumShare(e) { 
        this.setState({
            num_share: e.target.value
        });
    }

    handleSharePrice(e) { 
        this.setState({
            per_share_price: e.target.value
        });
    }
 
    onSubmit(e) { 
        e.preventDefault(); 

        const dailyrecord = {
            date: this.state.date,  
            ticker: this.state.ticker,
            order: this.state.order, 
            num_share: this.state.num_share,
            per_share_price: this.state.per_share_price,
        }

        // console.log(dailyrecord);

        // post it in the backend 
        axios.post('/adminTransaction/add', dailyrecord)
            .then(res => {
                console.log(res.data);
            });
        
        window.location = '/admin';

        // update the table with latest data input
        // this.setState({
        //     filteredRecords: this.state.records
        // })
    }

    // goToMainDashboard() { 
    //     window.location = '/';
    // }

    recordList() { 
        return this.state.records.map(item => {
            // console.log(item);
            return <Record record={item} />
        });
    }

	render() {
        return (
            <div className="container">
                <h1>Magic Box said... and turned out...</h1>
                <form style={{ margin: 10 }} onSubmit={this.onSubmit}>
                    <section>
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" onChange={this.handleDate}/>
                    </section>
                    <section>
                        <label htmlFor="ticker">Ticker</label>
                        <input type="text" id="ticker" onChange={this.handleTicker}/>
                    </section>
                    <section>
                        <label htmlFor="order">Order</label>
                        <select name="" id="order" onChange={this.handleOrder}>
                            <option value="sell">Sell</option>
                            <option value="buy">Buy</option>
                            <option value="hold">Hold</option>
                        </select>
                    </section>
                    <section>
                        <label htmlFor="num-share">Number of Shares</label>
                        <input type="number" id="num-share" onChange={this.handleNumShare} />
                    </section>				<section>
                        <label htmlFor="per-share-price">Per Share Price</label>
                        <input type="number" step=".01" id="per-share-price" onChange={this.handleSharePrice}/>
                    </section>		
                    {/* <section>
                        <label htmlFor="prediction">Prediction</label>
                        <input type="number" step=".01" id="prediction" onChange={this.handlePrediction}/>
                    </section>
                    <section>
                        <label htmlFor="actual">Actual Performance</label>
                        <input type="number" step=".01" id="actual" onChange={this.handleActual}/>
                    </section> */}
                    <section className="button-container">
                        <button className="button" type="submit">Submit</button>
                        <button className="button" type="reset">Reset</button>
                    </section>
                </form>
                {/* <button onClick={this.goToMainDashboard}>Go To Main Dashboard</button> */}
            
                <div>
                    <h3>Past Transactions</h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Date</th>
                                <th>Ticker</th>
                                <th>Order</th>
                                <th>Number of Shares</th>
                                <th>Per Share Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.recordList()}
                        </tbody>

                    </table>
                </div>
            
            </div>            
		);
	}
}