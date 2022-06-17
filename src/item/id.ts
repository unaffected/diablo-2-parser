import Binary from '@/utility/binary'

export default (binary: Binary) => {
  const id = Array
    .from(new Array(8))
    .map(() => binary.bits(4))
    .join('')

  return parseInt(id, 10)
}