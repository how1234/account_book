import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'


import Home, { categories } from './containers/Home';
import Create from './containers/Create';
import {testCategories, testItems} from './testData'
import {flattenArray,ID, parse2YearAndMonth} from './ultilities'


export const AppContext = React.createContext();

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      items:flattenArray(testItems),
      categories:flattenArray(testCategories)
    }
    this.actions = {
      deleteItem: (item) => {
        delete this.state.items[item.id]
        this.setState({
          items:this.state.items
        })
      },
      createItem: (data,categoryID)=>{
        const newID = ID()
        const parsedDate = parse2YearAndMonth(data.date)
        data.monthCategory = `${parsedDate.yaer}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()

        const newItem = { ...data,id:newID,cid:categoryID}
        this.setState({
          items:{...this.state.items,[newID]:newItem}
        })
      },
      updateItem: (item,updatedCategoryId) => {
        const modifiedItem = {
          ...item,
          cid:updatedCategoryId,
          timestamp:new Date(item.date).getTime()
        }
        this.setState({
          items:{...this.state.items, [modifiedItem.id]:modifiedItem}
        })
      }
    }
  }
  render(){
    return (
      <AppContext.Provider value={{
        state:this.state,
        actions:this.actions
      }}>
        <Router>
          <div className="App">
            <div className="container pb-5">
                <Route path="/" exact component={Home} />
                <Route path="/create" exact component={Create} />
                <Route path="/edit/:id" component={Create} />
            </div>
          
          </div>
        </Router>
        </AppContext.Provider>
    );
  }
  

}

export default App;
