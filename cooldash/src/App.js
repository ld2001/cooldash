import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Sidebar from "./components/sidebar.component";
import MainDashboard from "./components/maindash.component";
import RecordTransaction from "./components/record-transaction.component";
import InsertPrediction from "./components/insert-prediction.component";

function App() { 
	return (
		<Router>
			<div className="container">
				<Sidebar />
				<br />
				<Route path="/" exact component={MainDashboard} />
				<Route path="/admin" component={RecordTransaction} />
				<Route path="/model" component={InsertPrediction} />
			</div>
		</Router>
	)
}

export default App;