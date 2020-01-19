import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import MonthPicker from '../MonthPicker'


let props = {
    year:2020,
    month:1,
    onChange:jest.fn()
    
}
let wrapper
describe('test MonthPicker component',()=>{
    beforeEach(()=>{
            wrapper = mount(<MonthPicker {...props}/>)
        }
    )

    it('should render the component to match the snapshot', ()=>{
        expect(wrapper).toMatchSnapshot();

    })

    it('render correct year and month, show correct dropdown menu', ()=>{
        const text = wrapper.find('.dropdown-toggle').first().text()
        expect(text).toEqual('2020/01')
        expect(wrapper.find('.dropdown-menu').length).toEqual(0)
        expect(wrapper.state('isOpen')).toEqual(false)
        expect(wrapper.state('selectedYear')).toEqual(props.year)
    })

    it('after click the button, dropdown should show, year list&month list should have the correct items', () => {
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.state('isOpen')).toEqual(true)
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        expect(wrapper.find('.years-range .dropdown-item').length).toEqual(9)
        expect(wrapper.find('.months-range .dropdown-item').length).toEqual(12)
        expect(wrapper.find('.years-range .dropdown-item.active').text())
        .toEqual('2020')
        expect(wrapper.find('.months-range .dropdown-item.active').text())
        .toEqual('1')
        // the first year should be the current year minus 4
        expect(wrapper.find('.years-range .dropdown-item').first().text())
        .toEqual(`${props.year - 5}`)
        expect(wrapper.find('.months-range .dropdown-item').first().text())
        .toEqual('1')
        
      })

      it('click the year&month item, should trigger the right status change',()=>{
          wrapper.find('.dropdown-toggle').simulate('click')
          wrapper.find('.years-range .dropdown-item').first().simulate('click')
          expect(wrapper.find('.years-range .dropdown-item').first().hasClass('active')).toEqual(true)
          expect(wrapper.state('selectedYear')).toEqual(2015)


          wrapper.find('.months-range .dropdown-item').first().simulate('click')
          expect(wrapper.state('isOpen')).toEqual(false)
          expect(props.onChange).toHaveBeenCalledWith(2015,1)
      })

      it('after the dropdown is shown, click the document should close the dropdown', ()=>{
          let eventMap = {}
          document.addEventListener = jest.fn((event,cb)=>{
              eventMap[event] = cb;
          })
        const wrapper = mount(<MonthPicker {...props}/>) // Reload the month picker
        wrapper.find('.dropdown-toggle').simulate('click')
        expect(wrapper.state('isOpen')).toEqual(true)
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)

        eventMap.click({
            target:ReactDOM.findDOMNode(wrapper.instance())
        })

        expect(wrapper.state('isOpen')).toEqual(true)


        eventMap.click({
            target:document
        })

        expect(wrapper.state('isOpen')).toEqual(false)
      })
})