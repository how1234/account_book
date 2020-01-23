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
import Loader from '../components/Loader'


    const tabsList = [
        LIST_VIEW,
        CHART_VIEW
    ]
  class Home extends React.Component{
      constructor(props){
          super(props)
          this.state={
            tabView:tabsList[0]
          }
      }
      componentDidMount() {
        this.props.actions.getInitialData()
      }
      
      changeView = (index) =>{
        this.setState({
            tabView:tabsList[index]
        })
      }
      changeDate = (year,month) =>{
          this.props.actions.selectNewMonth(year,month)
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
          const {items,categories,currentDate,isLoading} = data
          const {tabView} = this.state
        
       
          const itemsWithCategory = Object.keys(items).map(id=>{
              items[id].category = categories[items[id].cid]
              return items[id]
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
                        {isLoading && <Loader/>}
                        {!isLoading && 
                          <React.Fragment>
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
                            </React.Fragment>
                        }
                        </div>
                        
                        <div>
                        </div>

                        
                        
                </React.Fragment>
               
          )
      }
  }

  export default withRouter(WithContext(Home))