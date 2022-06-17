import Binary from '@/utility/binary'
import modifier from './modifier'

export default (binary: Binary) => {
  const modifiers: any = []

  while (true) {
    const id = binary.bits(9)

    if (id === 0x1ff) break

    modifiers.push(modifier(binary, id))
  }

  return modifiers
}