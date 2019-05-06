import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import { buildDream } from '@/test/fixtures'
import DreamCard from '@/components/dumb/DreamCard.vue'
import { readableDate } from '~/filters/datetime'
import Vuetify from "vuetify"

const stubs = { NuxtLink: RouterLinkStub }
const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.filter('readableDate', readableDate)

describe('DreamCard', () => {
  const dream = buildDream()

  test('shows given dream', () => {
    const wrapper = mount(DreamCard, { localVue, stubs, propsData: { dream } })
    const text = wrapper.text()

    expect(text).toEqual(expect.stringContaining(dream.body))
    expect(text).toEqual(expect.stringContaining(readableDate(dream.date)))
    dream.tags.forEach(tag => {
      expect(text).toEqual(expect.stringContaining('#' + tag.name))
    })
  })
})
