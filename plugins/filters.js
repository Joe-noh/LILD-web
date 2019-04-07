import Vue from 'vue'
import { parse, format } from 'date-fns'

Vue.filter('readableDate', (date) => {
  return format(parse(date), 'YYYY/M/D')
})
