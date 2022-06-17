import Binary from '@/utility/binary'
import item from './item'

export class ItemsHeaderNotFound extends Error {}

export default (binary: Binary, number?: number, header = true) => {
  if (header && binary.text(2) !== 'JM') {
    throw new ItemsHeaderNotFound()
  }

  const count = number ?? binary.uint16()

  const items = Array
    .from(new Array(count))
    .map(() => item(binary))

  binary.align()

  return items
}
