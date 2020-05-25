import React, { Component } from 'react';
import axios from 'axios';

export default class DataInput extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTicker = this.handleTicker.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.handleNumShare = this.handleNumShare.bind(this);
        this.handleSharePrice = this.handleSharePrice.bind(this);
        this.goToMainDashboard = this.goToMainDashboard.bind(this);

        this.state = {
            date: '',
            ticker: '',
            order: '', 
            num_share: '',
            per_share_price: '',
        }
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

        console.log("will it work?");
        const dailyrecord = {
            date: this.state.date,  
            ticker: this.state.ticker,
            order: this.state.order, 
            num_share: this.state.num_share,
            per_share_price: this.state.per_share_price,
        }

        console.log(dailyrecord);
        console.log("success");

        axios.post('/adminTransaction/add', dailyrecord)
            .then(res => {
                console.log(res.data);
            });
        
        window.location = '/admin';
    }

    goToMainDashboard() { 
        window.location = '/';
    }

	render() {
        return (
            <div className="container">
                <h3>Log Today's Transaction</h3>
                <form style={{ margin: 10 }} onSubmit={this.onSubmit}>
                    <h1> Daily Trading Log </h1>
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
                <button onClick={this.goToMainDashboard}>Go To Main Dashboard</button>
            </div>            
		);
	}
}