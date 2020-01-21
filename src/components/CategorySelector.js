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
    static propTypes = {
        categories:PropTypes.array.isRequired,
        onSelectCategory:PropTypes.func.isRequired
    }
    static defaultProps = { 
        categories:[]
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
                        const iconColor = (category.id === selectedCategoryId) ? '#fff':'#555'
                        const backColor = (category.id === selectedCategoryId) ? '#347eff' : '#efefef'
                        const activeClass = selectedCategoryId === category.id ? 
                        "category-item col-3 active" : "category-item col-3"
                        return(
                            <div className={activeClass} key={index}
                            onClick={ (event) => {this.changeSelectedCategory(event,category)}}>
                            <Ionicon  className="rounded-circle"
                            style={{backgroundColor:backColor,padding:'5px'}}
                            fontSize="50px"
                            color={iconColor}
                            icon={category.iconName}/>

                            <p>{category.name}</p>
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