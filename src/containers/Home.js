import React from 'react'
import logo from '../logo.svg'

import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab';
import TotalPrice from '../components/TotalPrice'
import {LIST_VIEW,CHART_VIEW,TYPE_INCOME,TYPE_OUTCOME,parse2YearAndMonth,padMonth} from '../ultilities'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn';


export const items = [
    {
      "id":1,
      "title":"travel in Sydney",
      "price":1000,
      "date":"2020-02-10",
      "cid":"1"
    },
    {
      "id":2,
      "title":"travel in Sydney",
      "price":500,
      "date":"2020-01-10",
      "cid":1
    },
    {
        "id":3,
        "title":"travel in Sydney",
        "price":500,
        "date":"2020-01-10",
        "cid":2

    }
  ]
  
 export const categories = {
    "1":{ 
        "id":"1",
        "name":"Travel",
        "type":"out come行·行·x",
        "iconName":"ios-plane" 
    },
    "2":{
        "id":2,
        "name":"Investment",
        "type":"income",
        "iconName":"logo-yen"
    }


  }

  export const newItem = {
    "id":4,
    "title":"travel in Sydney",
    "price":500,
    "date":"2020-01-10",
    "cid":2

}
  class Home extends React.Component{
      constructor(props){
          super(props)
          this.state={
            items,
            currentDate:parse2YearAndMonth(),
            tabView:LIST_VIEW
          }
      }
      changeView = (view) =>{
        this.setState({
            tabView:view
        })
      }
      changeDate = (year,month) =>{
          this.setState({
              currentDate:{year,month}
          })
      }
      editItem = (modifiedItem) =>{
        const modifiedItems = this.state.items.map( item => {
            if(item.id === modifiedItem.id) {
                return {...item, title:"modifed"}
            }else{
                return item
            }
        })
        this.setState({
            items:modifiedItems
        })
      }
      createItem = () => {
        this.setState({
            items:[newItem, ...this.state.items]
        })
      }
      deleteItem = (deletedItem) => {
        const filteredItems = this.state.items.filter( item => (
            item.id !== deletedItem.id
        ))
        this.setState({    
            items:filteredItems
        }
        )
      }
      render() {
          const {items,currentDate,tabView} = this.state
          const itemsWithCategory = items.map(item=>{
              item.category = categories[item.cid]
              return item
          }).filter( item => {
              return (item.date.includes(`${currentDate.year}-${padMonth(currentDate.month)}`))
          })
          let totalIncome = 0,totalOutcome = 0;

          itemsWithCategory.forEach( (item) => {
              if(item.category.type === TYPE_OUTCOME){
                    totalOutcome += item.price 
              }else{
                    totalIncome += item.price
              }
          })



          return(
              <React.Fragment>
                   <header className="App-header pb-5">
                       <div className="row mb-5 justify-content-center">
                         <img src={logo} className="App-logo" alt="logo" />
                       </div>
                        <div className="row">
                            <div className="col">
                                <MonthPicker 
                                    year={currentDate.year} 
                                    month={currentDate.month} 
                                    onChange={this.changeDate}/>
                            </div>

                            <div className="col">
                                <TotalPrice 
                                income={totalIncome}
                                outcome={totalOutcome}/>

                     
                            </div>

                        </div>
                      
                    </header>

                    <div className="container-area py-3 px-3">

                        <ViewTab
                            activeTab={tabView}
                            onTabChange={this.changeView}/>  
                        <CreateBtn onClick={this.createItem}></CreateBtn>    

                        {tabView ===LIST_VIEW && 
                        <PriceList items={itemsWithCategory}
                        onEditItem={this.editItem}
                        onDeleteItem={this.deleteItem}
                        ></PriceList>} 

                        {tabView ===CHART_VIEW && 
                        <h1 className="chart-title">Here is for chart</h1>} 
                        
                    </div>


                    <div>
                       

               
                      
                       

                    </div>
              </React.Fragment>
          )
      }
  }

  export default Home