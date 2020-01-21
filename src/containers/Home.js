import React from 'react'
import logo from '../logo.svg'
import Ionicon from 'react-ionicons'

import {withRouter} from 'react-router-dom'



import PriceList from '../components/PriceList'

import TotalPrice from '../components/TotalPrice'
import {LIST_VIEW,CHART_VIEW,TYPE_INCOME,TYPE_OUTCOME,parse2YearAndMonth,padMonth} from '../ultilities'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn';
import {Tabs,Tab} from '../components/Tab'
import {testCategories,testItems} from '../testData'
import WithContext from '../WithContext'



    const tabsList = [
        LIST_VIEW,
        CHART_VIEW
    ]
  class Home extends React.Component{
      constructor(props){
          super(props)
          this.state={
            items:[],
            currentDate:parse2YearAndMonth(),
            tabView:tabsList[0]
          }
      }
      changeView = (index) =>{
        this.setState({
            tabView:tabsList[index]
        })
      }
      changeDate = (year,month) =>{
          this.setState({
              currentDate:{year,month}
          })
      }
      editItem = (modifiedItem) =>{
        this.props.history.push(`/edit/${modifiedItem.id}`)
      }
      createItem = () => {
        this.props.history.push('/create')
        
      }
      deleteItem = (deletedItem) => {
          console.log(this.props.actions.deleteItem(deletedItem))
        this.props.actions.deleteItem(deletedItem)
      }
      render() {
          const {data} = this.props
          const {items,categories} = data
          const {currentDate,tabView} = this.state
          console.log(items)
          console.log(categories)
          const itemsWithCategory = Object.keys(items).map(id=>{
              items[id].category = categories[items[id].cid]
              return items[id]
          }).filter( item => {
              return (item.date.includes(`${currentDate.year}-${padMonth(currentDate.month)}`))
          })
          console.log(itemsWithCategory)
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

                                
                            <Tabs activeIndex={0} onTabChange={this.changeView}>
                                    <Tab>
                                        <Ionicon 
                                        className="rounded-circle mr-2" 
                                        fontSize="25px"
                                        color={'#007bff'}
                                        icon='ios-paper'
                                        />
                                        List
                                    </Tab>
                                    <Tab>
                                        <Ionicon 
                                        className="rounded-circle mr-2" 
                                        fontSize="25px"
                                        color={'#007bff'}
                                        icon='ios-pie'
                                        />
                                        Chart
                                    </Tab>
                            </Tabs>
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

  export default withRouter(WithContext(Home))