import React from 'react'
import { mount } from 'enzyme'
import { items } from '../../containers/Home';
import CategorySelector from '../CategorySelector'
import Ionicon from 'react-ionicons'

 export const categories = [
    { 
        "id":1,
        "name":"Travel",
        "type":"outcome",
        "iconName":"ios-plane" 
    },
    {
        "id":2,
        "name":"Investment",
        "type":"income",
        "iconName":"logo-yen"
    }


]

  let props = {
      categories,
      onSelectCatergory : jest.fn()
  }

  let propsWithHighlight = {
    categories,
    onSelectCategory: jest.fn(),
    selectedCategory:categories[0]
}
  describe('test CategorySelect component', ()=>{
    it('it renders with categories, should render the correct item', ()=>{
        const wrapper = mount(<CategorySelector {...props}/>)
        expect(wrapper.find('.category-item').length).toEqual(categories.length)
        expect(wrapper.find('.category-item .active').length).toEqual(0)

        const firstIcon = wrapper.find('.category-item').first().find(Ionicon)
        expect(firstIcon.length).toEqual(1)
        expect(firstIcon.props().icon).toEqual(categories[0].iconName)
    })
    it('rnder selectedCategory with category item with highlight', ()=>{
        const wrapper = mount(<CategorySelector {...propsWithHighlight}/>)
        expect(wrapper.find(".category-item").first().hasClass("active")).toEqual(true)
    })

    it('click the item should add active class and triiger the callback',()=>{
        const wrapper = mount(<CategorySelector {...propsWithHighlight}/>)
        wrapper.find(".category-item").at(1).simulate('click')
        expect(wrapper.find('.category-item').at(1).hasClass('active')).toEqual(true)
        expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(false)
       
        expect(propsWithHighlight.onSelectCategory).toHaveBeenCalledWith(categories[1])
    })
  })