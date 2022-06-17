import config from '!/config'
import Binary from '@/utility/binary'
import { isMapIterator } from 'util/types'

export default (binary: Binary) => {
  const bits = binary.bits(12)

  // NOTE: Account for "Expansion" row in txt config
  // TODO: consider filtering out unique items missing key data
  const item_id = bits >= 62 ? bits + 1 : bits
  const item = config.item.set_item.firstWhere('id', item_id)
  const set = config.item.set.firstWhere('key', item.set_code)

  if (!item || !set) {
    console.log(console.log(bits))
  }

  return {
    item_id,
    item_name: config.label[item.key] ?? item.key,
    set_name: config.label[set.key] ?? set.key,
  }
}
