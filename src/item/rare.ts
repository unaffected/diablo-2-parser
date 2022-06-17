import config from '!/config'
import Binary from '@/utility/binary'

export default (binary: Binary) => {
  const prefix_id = binary.bits(8)
  const suffix_id = binary.bits(8)

  const affixes = Array
    .from(new Array(6))
    .map(() => binary.flag() && binary.bits(11))
    .filter(Boolean)

  return {
    affixes,
    name: [prefix_id, suffix_id]
  }
}
