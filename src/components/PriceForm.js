import React from 'react'
import PropTypes from 'prop-types'
import {isValidDate} from '../ultilities'


class PriceForm extends React.Component{
    static propTypes = {
        onFormSubmit:PropTypes.func.isRequired,
        onCancelSubmit:PropTypes.func.isRequired,
        item:PropTypes.object
    }

    static defaultProps = {
        item:{}
    }
    state = {
        validatePass:true,
        errorMessage:''
    }
    submitForm = (event) => {
        
        const {item,onFormSubmit} = this.props
        const editMode = !!item.id
        const price = this.priceInput.value.trim() * 1
        const date = this.dateInput.value.trim()
        const title = this.titleInput.value.trim()
        event.preventDefault()
        if(price&&date&&title){
            if(price < 0){
                this.setState({
                    validatePass:false,
                    errorMessage:'Price must larger than 0'
                })
            }else if(!isValidDate(date)){
                this.setState({
                    validatePass:false,
                    errorMessage:'Date format is not correct'
                })
            }else{
                this.setState({
                    validatePass:true,
                    errorMessage:''
                })
                if(editMode){
                    onFormSubmit({...item,title,price,date},editMode)
                }else{
                    onFormSubmit({title,price,date},editMode)
                }
            }
        }else{
             
            this.setState({
                validatePass:false,
                errorMessage:"Input can't be empty"
            })
        }
        
    }
    render() {
        const {title,price,date} = this.props.item
   
        return( 
            
            <form onSubmit={(event) => {this.submitForm(event)}} noValidate>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input id="title" 
                    type="text" 
                    className="form-control" 
                    placeholder="please input the title"
                    defaultValue={title}
                    ref = {(input) => {this.titleInput = input}}></input>

                </div>
                  
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input id="price" 
                        type="text" 
                        className="form-control" 
                        placeholder="please input the title"
                        defaultValue={price}
                        ref = {(input) => {this.priceInput = input}}></input>
                    </div>
                    
                </div>
                    
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date"
                    className="form-control"
                    id="date"
                    placeholder="Please input the date"
                    defaultValue={date}
                    ref={(input)=>{this.dateInput = input}}/>
              
                </div>





                <button type="submit" className="btn btn-primary">Submit</button>
                <button className="btn btn-secondary" onClick={this.props.onCancelSubmit}>Cancel</button>
                {!this.state.validatePass && <div className="alert alert-danger mt-5" role="alert"> 
                    {this.state.errorMessage}
                </div>}


            </form>
        )
    }
  

}

export default PriceForm