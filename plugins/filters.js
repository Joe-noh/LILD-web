import Vue from 'vue'
import { readableDate } from '~/filters/datetime'

Vue.filter('readableDate', readableDate)
