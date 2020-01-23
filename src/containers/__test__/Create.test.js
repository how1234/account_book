import React from 'react'
import {mount} from 'enzyme'
import {parse2YearAndMonth, flattenArray} from '../../ultilities'
import  {CreatePage} from '../Create'
import {testCategories, testItems} from '../../testData'
import Loader from '../../components/Loader';
import CategorySelector from '../../components/CategorySelector';
import PriceForm from '../../components/PriceForm';

const testItem = testItems[0]
const match = {params:{id:testItem.id}}
const history = { push: ()=>{}}
const createMatch = { params:{id:''}}
const initData = {
    categories: {},
    items:{},
    isLoading:false,
    currentDate:parse2YearAndMonth()
}

const withLoadedData = {
    categories : flattenArray(testCategories),
    items:flattenArray(testItems),
    isLoading:false,
    currentDate:parse2YearAndMonth()
}

const loadingData = {
    ...initData,isLoading:true
}

const actions = {
    //Mock the return value by Promise
    getEditData:jest.fn().mockReturnValue(Promise.resolve({editItem:testItem,categories:flattenArray(testCategories)})),
    createItem:jest.fn().mockReturnValue(Promise.resolve({})),
    updateItem:jest.fn().mockReturnValue(Promise.resolve({}))
}
describe('test component initital behavior', ()=>{
    it('test Create page for the first render, getEditData should be called with the right  paramaters', () => {
        const wrapper = mount(
            <CreatePage data={initData} actions={actions} match={match} />
        )
        expect(actions.getEditData).toHaveBeenCalledWith(testItem.id)
    })

    it('should show loading component when isLoading is true', ()=>{
        const wrapper = mount(
            <CreatePage data={loadingData} actions={actions} match={match} />
        )
        expect(wrapper.find(Loader).length).toEqual(1)
    } )

})

describe('test component in create mode', ()=> {
    const wrapper = mount(
        <CreatePage data={withLoadedData} actions={actions} match={createMatch} history={history}/>
    )
    const setInputValue = (selector,newValue) => {
        wrapper.find(selector).instance().value = newValue
    }
    it('should pass null to props selectedCategory for SelectedCategory', ()=>{
        expect(wrapper.find(CategorySelector).props().selectedCategory).toEqual(null)
    })
    it('should pass emp[t object for PriceForm', ()=>{
        expect(wrapper.find(PriceForm).props().item).toEqual({})
    })
    it('when submit an empty form, the createItem action should not be triggered', ()=> {
        wrapper.find('form').simulate('submit')
        expect(actions.createItem).not.toHaveBeenCalledWith()
    })

    it('fill all blanks then submit the form, the createItem action should not be triggered', ()=> {
        setInputValue('#title',"new title")
        setInputValue('#price',"200")
        setInputValue('#date',"2020-01-22")
        wrapper.find('.category-item').first().simulate('click')
        wrapper.find('form').simulate('submit')

        const testData = {
            title:'new title',
            price:200,
            date:'2020-01-22'
        }
        expect(actions.createItem).toHaveBeenCalledWith(testData,testCategories[0].id)
    })
})

describe('test component in edit mode', ()=> {
    const wrapper = mount(
        <CreatePage data={withLoadedData} actions={actions} match={match} history={history}/>
    )
    const setInputValue = (selector,newValue) => {
        wrapper.find(selector).instance().value = newValue
    }
    const selectedCategory = testCategories.find(category => testItem.cid === category.id)
    it('should pass the right category props selectedCategory for SelectedCategory', ()=>{
        wrapper.update()
        expect(wrapper.find(CategorySelector).props().selectedCategory).toEqual(selectedCategory)
    })

    it('modify some inputs, submit the form, then the editItem method should be called', () => {
        setInputValue('#title',"new title")
        wrapper.find('form').simulate('submit')
        const testData = {...testItem,title:'new title'}
        expect(actions.updateItem).toHaveBeenCalledWith(testData,selectedCategory.id)

    })
})