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
        <td>
            <Link to="#" onClick={ () => props.deleteRecord(props.record.trans_id)}>delete</Link>
        </td>
    </tr>
)

export default class Prediction extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTicker = this.handleTicker.bind(this);
        this.handlePredicted = this.handlePredicted.bind(this);
        this.handleActual = this.handleActual.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);

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

    handlePredicted(e) { 
        this.setState({
            predicted: e.target.value
        });
    }

    handleActual(e) { 
        this.setState({
            actual: e.target.value
        });
    }
 
    onSubmit(e) { 
        e.preventDefault(); 

        const dailyrecord = {
            pred_id: Date.now().toString(), 
            date: this.state.date,  
            ticker: this.state.ticker,
            predicted: this.state.predicted,
            actual: this.state.actual,
        }

        // post it in the backend 
        axios.post('/adminPrediction/add', dailyrecord)
            .then(res => {
                console.log(res.data);
            });
        
        window.location = '/model';

    }

    deleteRecord(id) { 
        console.log(id.S);
        axios.delete('/adminPrediction/'+id.S)
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
                <form className="" onSubmit={this.onSubmit}>
                    <section>
                    <h3 className="trade-header">Prediction</h3>
                    </section>
                    <section>
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" onChange={this.handleDate}/>
                    </section>
                    <section>
                        <label htmlFor="ticker">Ticker</label>
                        <input type="text" id="ticker" onChange={this.handleTicker}/>
                    </section>
                    <section>
                        <label htmlFor="predicted">Predicted</label>
                        <input type="number" step=".01" id="predicted" onChange={this.handlePredicted} />
                    </section>
                    <section>
                        <label htmlFor="actual">Actual</label>
                        <input type="number" step=".01" id="actual" onChange={this.handleActual}/>
                    </section>		
                    <section className="button-container">
                        <button className="button btn btn-primary" type="submit">Submit</button>
                        <button className="button btn btn-secondary" type="reset">Reset</button>
                    </section>
                </form>
                <br /> 
                <div className="table">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Date</th>
                                <th>Ticker</th>
                                <th>Predicted</th>
                                <th>Actual</th>
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