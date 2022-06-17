import Binary from '@/utility/binary'

export default (binary: Binary) => ({
  name: {
    prefix_id: binary.bits(8),
    suffix_id: binary.bits(8),
  },
  affixes: Array
    .from(new Array(6))
    .map(() => binary.flag() && binary.bits(11))
    .filter(Boolean),
})
