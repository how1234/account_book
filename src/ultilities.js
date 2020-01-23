export const LIST_VIEW = "list"
export const CHART_VIEW = "chart"
export const TYPE_INCOME = "income"
export const TYPE_OUTCOME = "outcome"
export const padMonth = (n) => {
    return n<10 ? '0'+n : n;
}

export const range = (size,startAt=0) => {
    const arr = []
    for(let i=0;i<size;i++){
        arr[i] =startAt+i
    }
    return arr
}

export const activeDropdownItem = (selectedItem,listItem) => {
    return selectedItem === listItem?  "dropdown-item active":  "dropdown-item"

}
export const parse2YearAndMonth = (str) => {
    const date = str ? new Date(str) : new Date();
    return {
        year:date.getFullYear(),
        month:date.getMonth() + 1
    }
}

export const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/
    if(!dateString.match(regEx)) return false;
    const d = new Date(dateString)
    if(Number.isNaN(d.getTime())) return false;
    return d.toISOString().slice(0,10)===dateString
}
export const flattenArray = (arr) => {
    return arr.reduce((prev,curr) => {
        prev[curr.id] = curr
        return prev
    },{})
}

export const ID = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }


export const COLORS = {
    blue:'#347eff',
    deepBlue:'#61dafb',
    green:'#28a745',
    red:'#dc3535',
    grey:'#555',
    lightGray:'#efefef',
    white:'#fff'
}
