import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// functional react component 
const Record = props => (
    <tr>
        <td>{props.record.date.S}</td>
        <td>{props.record.ticker.S}</td>
        <td>{props.record.order.S}</td>
        <td>{props.record.num_share.N}</td>
        <td>{props.record.per_share_price.N}</td>
        <td>
            <Link to="#" onClick={ () => props.deleteRecord(props.record.trans_id)}>delete</Link>
        </td>
    </tr>
)

export default class RecordTransaction extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTicker = this.handleTicker.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.handleNumShare = this.handleNumShare.bind(this);
        this.handleSharePrice = this.handleSharePrice.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);

        // state is like a big bag of variables
        this.state = {
            date: '',
            ticker: '',
            order: 'sell', 
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
            trans_id: Date.now().toString(), 
            date: this.state.date,  
            ticker: this.state.ticker,
            order: this.state.order, 
            num_share: this.state.num_share,
            per_share_price: this.state.per_share_price,
        }

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

    deleteRecord(id) { 
        console.log(id.S);
        axios.delete('/adminTransaction/'+id.S)
            .then(response => { console.log(response.data) });
        this.setState({
            records: this.state.records.filter(element => element.trans_id !== id)
        })
    }

    recordList() { 
        return this.state.records.map(item => {
            return <Record record={item} deleteRecord={this.deleteRecord}
            key={item.trans_id}/>
        });
    }

	render() {
        return (
            <div className="trade-container">
                <form className="item1" onSubmit={this.onSubmit}>
                    <h1>Log Today's Trade</h1>
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
                        <select name="" id="order" onChange={this.handleOrder} defaultValue="sell">
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
                    <section className="button-container">
                        <button className="button" type="submit">Submit</button>
                        <button className="button" type="reset">Reset</button>
                    </section>
                </form>
            
                <div className="item2">
                    <h1>Past Transactions</h1>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Date</th>
                                <th>Ticker</th>
                                <th>Order</th>
                                <th>No. of Shares</th>
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