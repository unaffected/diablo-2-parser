import Binary from '@/utility/binary'

export default (binary: Binary) => {
  const id = binary.bits(12)

  binary.move(4)

  return { id }
}