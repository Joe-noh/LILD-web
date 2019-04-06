import applyConverters from 'axios-case-converter'

export default function ({ $axios, redirect }) {
  $axios = applyConverters($axios)
}
