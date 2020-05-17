import React from 'react';
import logo from './logo.svg';
import './App.css';



function Twitter() {
  return <h1> Tweets! </h1>;
}

function Mid() {
  return <div class="wrapper">
  <News></News>
  <Stocks></Stocks>
</div>;
}

function News() {
  return <div class="box a">News</div>;
}

function Stocks() {
  return <div class="box b">Stock</div>;
}

function Graphs() {
  return <h1> Graphs! </h1>;;
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.top}
      </div>
      <div className="SplitPane-mid">
        {props.mid}
      </div>
      <div className="SplitPane-right">
        {props.bottom}
      </div>
    </div>
  );
}


function App() {
  return (
    <SplitPane
      top={
        <Twitter />
      }
      mid={
        <Mid />
      }
      bottom={
        <Graphs />
      } />
  );
}

export default App;
