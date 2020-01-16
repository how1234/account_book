export const LIST_VIEW = "list"
export const CHART_VIEW = "chart"

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