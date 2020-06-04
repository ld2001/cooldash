import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// functional react component 
const Record = props => (
    <tr>
        <td>{props.record.date.S}</td>
        <td>{props.record.ticker.S}</td>
        <td>{props.record.predicted.N}</td>
        <td>{props.record.actual.N}</td>
    </tr>
)

export default class ShowPrediction extends Component {
    constructor(props) {
        super(props);

        // state is like a big bag of variables
        this.state = {
            date: '',
            ticker: '',
            predicted: '',
            actual: '',
            search_key: '',
            records: [], 
            filteredRecords: []
        }
    }

    componentDidMount() { 
        axios.get('/adminPrediction')
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
            return <Record record={item} deleteRecord={this.deleteRecord}
            key={item.pred_id}/>
        });
    }

	render() {
        return (
            <div className="container">
                <div className="subtitle">Model Predictions</div>
                <div className="table">
                    <table className="table table-sm">
                        <thead className="thead-light">
                            <tr>
                                <th>Date</th>
                                <th>Ticker</th>
                                <th>Predicted</th>
                                <th>Actual</th>
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