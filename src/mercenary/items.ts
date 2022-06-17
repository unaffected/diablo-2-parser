import items from '@/items'
import Binary from '@/utility/binary'

const parse = (binary: Binary) => {
  if (binary.eof()) {
    return undefined
  }

  return items(binary)
}

export default parse
