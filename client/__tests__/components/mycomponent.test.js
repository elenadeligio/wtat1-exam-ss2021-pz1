// Import the `mount()` method from Vue Test Utils
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/Mycomponent.vue'


test('displays message', () => {
    // mount() returns a wrapped Vue component we can interact with
    const wrapper = mount(MyComponent,{
        propsData: {
            msg: 'Hello world'
        }
    })

    // Assert the rendered text of the component
    expect(wrapper.text()).toContain('This is the Mycomponent component')
})
