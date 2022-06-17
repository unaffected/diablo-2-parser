import Binary from '@/utility/binary'

export default (binary: Binary) => ({
  prefix_id: binary.bits(11),
  suffix_id: binary.bits(11),
})
