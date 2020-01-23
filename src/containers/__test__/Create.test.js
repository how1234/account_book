import React from 'react'
import {mount} from 'enzyme'
import {parse2YearAndMonth, flattenArray} from '../../ultilities'
import  {CreatePage} from '../Create'
import {testCategories, testItems} from '../../testData'

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
    getEditData:jest.fn() 
}
describe('test component initital behavior', ()=>{
    it('test Create page for the first render, getEditData should be called with the right  paramaters', () => {
        const wrapper = mount(
            <CreatePage data={initData} actions={actions} match={match} />
        )
        expect(actions.getEditData).toHaveBeenCalledWith(testItem.id)
    })
})