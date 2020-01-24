import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'

import axios from 'axios'
import Home from './containers/Home';
import Create from './containers/Create';

import {flattenArray,ID, parse2YearAndMonth} from './ultilities'


export const AppContext = React.createContext();

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      items:{},
      categories:{},
      currentDate:parse2YearAndMonth(),
      isLoading:false,
      
    }
    const withLoading = (cb) => {
      return (...args) =>{
        this.setState({
          isLoading:true
        })
        return cb(...args)
      }
      
    }
    this.actions = {
      getInitialData: withLoading(async () => {
        this.setState({
          isLoading:true
        })
        const {currentDate} = this.state
        const getURLWithData = `/items/?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
        const results = await Promise.all([axios.get('/categories'),axios.get(getURLWithData)])
      
        const [categories,items] = results
        this.setState({
          items:flattenArray(items.data),
          categories:flattenArray(categories.data),
          isLoading:false
        })
        
      }),
      getEditData: withLoading(async (id) => {
        const {items,categories} = this.state
        

        let promiseArr = []

        if(Object.keys(categories).length ===0) {
          promiseArr.push(axios.get('/categories'))
        } 

        const itemAlreadyFetch = (Object.keys(items).indexOf(id) > -1)
        

        
        if(id && !itemAlreadyFetch) {
          const getURLWithID = `/items/${id}`
          promiseArr.push(axios.get(getURLWithID))
        }

        const [ fetchedCategories , editItem] = await Promise.all(promiseArr)
        const finalCategories = fetchedCategories ? flattenArray(fetchedCategories.data) : categories
        const finalItem = editItem ? editItem.data : items[id]
        if (id) {
          this.setState({
            categories:finalCategories,
            isLoading:false,
            items:{...this.state.items, [id]:finalItem}
          })
        }else{
          this.setState({
            categories:finalCategories,
            isLoading:false
          })
        }
        return{
          categories:finalCategories,
          editItem: finalItem
        }
      }),
      deleteItem: async (item) => {
        const deletedItem = await axios.delete(`/items/${item.id}`)
        
        
        delete this.state.items[item.id]
        this.setState({
            items:this.state.items
        })
        return deletedItem
        
      },
      createItem:  withLoading(async (data,categoryID)=>{
        const newID = ID()
        const parsedDate = parse2YearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.month}`
        data.timestamp = new Date(data.date).getTime()

       
        const newItem = await axios.post('/items',{ ...data,id:newID,cid:categoryID})
        this.setState({
          items:{...this.state.items,[newID]:newItem.data},
          isLoading:false
        })
        return newItem.data
      }),
      updateItem: withLoading(async(item,updatedCategoryId) => {
        const updatedData = {
          ...item,
          cid:updatedCategoryId,
          timestamp:new Date(item.date).getTime()
        }
        const modifiedItem = await axios.put(`/items/${item.id}`,updatedData )
        this.setState({
          items:{...this.state.items, [modifiedItem.id]:modifiedItem.data}
        })
        return modifiedItem.data
      }),
      selectNewMonth:withLoading(async (year,month) =>{
        const getURLWithData = `/items/?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        const items = await axios.get(getURLWithData)
      
        this.setState({
          items:flattenArray(items.data),
          currentDate: {year,month},
          isLoading:false
        })
        return items
    })
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
