import Binary from '@/utility/binary'

export default (binary: Binary) => {
  binary.goto(36, true)

  binary.move(2)

  const is_hardcore = binary.flag()
  const is_dead = binary.flag()

  binary.move(1)

  const is_expansion = binary.flag()
  const is_ladder = binary.flag()

  return {
    is_hardcore,
    is_dead,
    is_expansion,
    is_ladder,
  }
}
