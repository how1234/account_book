import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'



class CategorySelector extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedCategoryId : props.selectedCategory && props.selectedCategory.id
        }
    }
    changeSelectedCategory = (event,category) =>{
        event.preventDefault();
        this.setState({
            selectedCategoryId:category.id
        })
        this.props.onSelectCategory(category)
    
    }
    render(){
        const {categories} = this.props;
        const {selectedCategoryId} = this.state
        return(
            <div className="category-selector">
                <div className="row">
                    {categories.map((category,index) => {
                        const activeClass = selectedCategoryId === category.id ? 
                        "category-item col-3 active" : "category-item col-3"
                        return(
                            <div className={activeClass} key={index}
                            onClick={ (event) => {this.changeSelectedCategory(event,category)}}>
                            <Ionicon  className="rounded-circle"
                            fontSize="50px"
                            color="#555"
                            icon={category.iconName}/>

                      
                        </div>
                        )
                        
                        })
                    }
                </div>
            </div>
        )
       
    }
}
export default CategorySelector