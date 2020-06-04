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
    </tr>
)

export default class RecordTransaction extends Component {
    constructor(props) {
        super(props);

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

    recordList() { 
        return this.state.records.map(item => {
            return <Record record={item} key={item.trans_id}/>
        });
    }

	render() {
        return (
            <div className="container">
                <div className="subtitle">Transactions</div>
                <div className="table">
                    <table className="table table-sm">
                        <thead className="thead-light">
                            <tr>
                                <th>Date</th>
                                <th>Ticker</th>
                                <th>Order</th>
                                <th>No. of Shares</th>
                                <th>Per Share Price</th>
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