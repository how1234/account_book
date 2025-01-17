import React from 'react'
import PropTypes from 'prop-types'
import CategorySelector from '../components/CategorySelector'
import {Tabs,Tab} from '../components/Tab'
import {testCategories} from '../testData'
import {TYPE_INCOME,TYPE_OUTCOME} from '../ultilities'
import PriceForm from '../components/PriceForm'
import {withContext} from '../WithContext'
import {withRouter} from 'react-router-dom'
import {AppContext} from '../App'
import Loader from '../components/Loader';
const tabsText = [TYPE_INCOME,TYPE_OUTCOME]

export class CreatePage extends React.Component {
    constructor(props){
        super(props)
        const {id} = props.match.params
        const {categories,items} = props.data
        this.state = {
            selectedTab : (id && items[id]) ? categories[items[id].cid].type: TYPE_INCOME,
            selectedCategory:(id && items[id])? categories[items[id].cid]  : null,
            validation:true
        }
    }

    static propTypes = {
        data:PropTypes.object.isRequired,
        actions:PropTypes.object.isRequired,
    
    }
    componentDidMount() {
        const {id} = this.props.match.params
        this.props.actions.getEditData(id).then(data => {
            const {editItem,categories} = data 
            this.setState({
                selectedTab : (id && editItem) ? categories[editItem.cid].type: TYPE_OUTCOME,
                selectedCategory:(id && editItem)? categories[editItem.cid]  : null
            })
        })
    }
    formSubmit = (data,isEditMode) => {

        if(!this.state.selectedCategory){
            this.setState({
                validation:false
            })
            return
        }
        if(!isEditMode) {
            this.props.actions.createItem(data,this.state.selectedCategory.id).then( ()=>{
                this.props.history.push('/')
            })
        }else{
            this.props.actions.updateItem(data,this.state.selectedCategory.id).then( ()=>{
                this.props.history.push('/')
            })
        }
      
    }
    cancelSubmit = () => {
        this.props.history.push('/')
    }
    tabChange = (index) => {
        this.setState({
            selectedTab: tabsText[index]
        })
    }
    selectCategory = (category) =>{
        this.setState({
            selectedCategory:category
        })
    }   
    render(){
        const {data} = this.props
        const {items,categories} = data
        const {id} = this.props.match.params
        const editItem = (id && items[id]) ? items[id] : {}
        const {selectedTab,validation,selectedCategory} = this.state
        const filteredCategories = Object.keys(categories).filter(id=> categories[id].type === selectedTab)
        .map(id =>categories[id]) 
        const tabIndex = tabsText.findIndex(text => text === selectedTab)
        return(
            
            <div className="create-page py-3 px3 rounded mt-3" style={{background:'#fff'}}>
                { data.isLoading &&
                    <Loader />
                }
                <Tabs activeIndex={tabIndex} onTabChange={this.tabChange} >
                    <Tab>Income</Tab>
                    <Tab>Outcome</Tab>
                </Tabs>
                <CategorySelector categories={filteredCategories} 
                onSelectCategory={this.selectCategory}
                selectedCategory={selectedCategory} />
                <PriceForm 
                    onFormSubmit = {this.formSubmit}
                    onCancelSubmit = {this.cancelSubmit}
                    item={editItem}
                />
                {!validation && <div className="alert alert-danger mt-5" role="alert">
                        Please choose a valid category
                    </div>}
            </div>
                   
        )
    }
}

export default withRouter(withContext(CreatePage))