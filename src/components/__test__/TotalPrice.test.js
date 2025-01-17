import React from 'react'
import { shallow } from 'enzyme'
import TotalPrice from '../TotalPrice'


const props = {
    income:1000,
    outcome:2000
}
// A group of testing cases
describe('test TotalPrice component', ()=> {
    //each test case
    it('component should render correct income&outcome',()=>{
        const wrapper = shallow(<TotalPrice {...props}/>);
        expect(wrapper.find('.income span').text() * 1).toEqual(1000)
        expect(wrapper.find('.outcome span').text() * 1).toEqual(2000)
    })
}) 