import { readableDate } from '@/filters/datetime'

describe('datetime filters', () => {
  describe('readableDate', () => {
    test('日付の文字列を0埋めのない/区切りに変換する', () => {
      expect(readableDate('2019-04-01')).toEqual('2019/4/1')
      expect(readableDate('2019-04-10')).toEqual('2019/4/10')
      expect(readableDate('2019-04-01 23:00:00')).toEqual('2019/4/1')
    })
  })
})
