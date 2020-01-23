import React from 'react'
import PropTypes from 'prop-types'

import { ResponsiveContainer,Tooltip,PieChart,Pie,Cell} from 'recharts'

import {COLORS} from '../ultilities'

/** Data Sample
 [
    0:{
        name: "Work"
        value: 1000
        items: ["3"]
    }
    1:{
        name: "Investment"
        value: 300
        items: ["4"]
    },
    "category id":{
        name:"category name",
        value:"total value"
        items:[recordID1,recordID2]
    }
    
**/

const colorsArr = Object.keys(COLORS).map( (key) => COLORS[key])

const CustomizedPieChart = ({title,categoryData}) => {
    console.log(categoryData)
    if(categoryData.length===0){
        return <h3 className ="text-center mx-3"> No data!</h3>

    }
    return (
        <div className="pie-chart-component">
            <h3 style={{textAlign: 'center'}} className="mt-3">{title}</h3>
            <h3 className="text-center mt-3">
                <ResponsiveContainer width={'100%'} height={300}>
                <PieChart>
                        <Pie 
                            isAnimationActive={true} 
                            data={categoryData}
                            dataKey="value"
                            cx='50%' cy='50%' 
                            outerRadius={100} fill={COLORS.blue} label
                        >
                        {
                            categoryData.map((entry, index) => <Cell key={index} fill={colorsArr[index % colorsArr.length]}/>)
                        }
                        </Pie>
                        <Tooltip/>
                        </PieChart>
                </ResponsiveContainer>
            </h3>
        </div>
    )
}

CustomizedPieChart.propTypes ={
    title:PropTypes.string,
    categoryData : PropTypes.array
}

export default CustomizedPieChart