import items from '@/items'
import Binary from '@/utility/binary'

export class CorpsesNotFound extends Error {}

const parse = (binary: Binary) => {
  const header = binary.text(2)

  if (header !== 'JM') {
    throw new CorpsesNotFound(`header: ${header}`)
  }

  const count = binary.uint16() as number

  if (count < 1) {
    return
  }

  binary.move(count * 12, true)

  return items(binary)
}

export default parse
