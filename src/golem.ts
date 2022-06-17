import items from '@/items'
import Binary from '@/utility/binary'

export class GolemNotFound extends Error {}

export default (binary: Binary) => {
  const header = binary.text(2)

  if (header !== 'kf') {
    throw new GolemNotFound(`header: ${header}`)
  }

  return binary.uint8() && items(binary)
}
