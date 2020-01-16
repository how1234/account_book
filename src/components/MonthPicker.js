import React from 'react'
import PropTypes from 'prop-types'
import {padMonth,range,activeDropdownItem} from '../ultilities'

class MonthPicker extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen:false,
            selectedYear:this.props.year,
            selectedMonth:this.props.month
        }
    }
    toggleDropdown =(event) =>{
        event.preventDefault();
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    selectYear = (event,yearNumber) => {
        event.preventDefault();
        this.setState({
            selectedYear:yearNumber
        })
    }

    selectMonth = (event,monthNumber) => {
        event.preventDefault();
        this.setState({
            isOpen:false,
            selectedMonth:monthNumber
        })
        this.props.onChange(this.state.selectedYear,monthNumber)

    }
    render() {
        const {year,month} = this.props;
        const {isOpen,selectedYear} = this.state;
        const monthRange = range(12,1)
        const yearRange = range(9,2015)
      

        return (
            <div className="dropdown month-picker-component">
                <h4>Choose month</h4>
                <button className="btn btn-lg btn-secondary dropdown-toggle"
                onClick={this.toggleDropdown}>
                    {`${year}/${padMonth(month)} `}
                </button>   
                {isOpen && 
                    <div className="dropdown-menu" style={{display:'block'}}> 
                        <div className="row">
                            <div className="col border-right"> 
                                {yearRange.map( (yearNumber,index) => (
                                    <a key={index} 
                                    href="#"
                                    onClick={(event) => {this.selectYear(event,yearNumber)}}
                                    className={activeDropdownItem(selectedYear,yearNumber)}>
                                        {yearNumber}
                                    </a>
                                ))}
                          
                            </div>

                            <div className="col ">  
                                {monthRange.map( (monthNumber,index) => (
                                    <a key={index} 
                                    href="#"
                                    onClick={(event) => {this.selectMonth(event,monthNumber)}}
                                    className={activeDropdownItem(month,monthNumber)}>
                                        {monthNumber}
                                    </a>
                                ))}     
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
    

}
MonthPicker.propTypes={
    year:PropTypes.number.isRequired,
    month:PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}
export default MonthPicker
