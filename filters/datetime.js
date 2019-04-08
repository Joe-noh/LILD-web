import { parse, format } from 'date-fns'

export function readableDate(date) {
  return format(parse(date), 'YYYY/M/D')
}
