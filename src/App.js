import React from 'react';
import logo from './logo.svg';
import './App.css';

import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab';
import TotalPrice from './components/TotalPrice'
import {LIST_VIEW,CHART_VIEW} from './ultilities'
import MonthPicker from './components/MonthPicker'

const items = [
  {
    "id":1,
    "title":"travel in Sydney",
    "price":"1000",
    "date":"2020-01-10",
    "category":{
      "id":"1",
      "name":"Travel",
      "type":"outcome",
      "iconName":"ios-plane"
    }
  },
  {
    "id":2,
    "title":"travel in Sydney",
    "price":"500",
    "date":"2020-01-10",
    "category":{
      "id":"1",
      "name":"Travel",
      "type":"outcome",
      "iconName":"ios-plane" 
    }
  }
]
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <ViewTab
      activeTab={CHART_VIEW}
      onTabChange={(view) => {console.log(view)}}>
        
      </ViewTab>
      <TotalPrice income={600}
      outcome={800}/>

      <MonthPicker year={2020} month={5}></MonthPicker>
      <PriceList items={items}
      onModifyItem={ (item) => {alert(item.id)}}
      onDeleteItem={(item) => {alert(item.id)}
      }></PriceList>

    
      
    </div>
  );
}

export default App;
