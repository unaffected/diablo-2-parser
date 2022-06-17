import config from '!/config'
import Binary from '@/utility/binary'

export class ItemQualityNotFound extends Error {}

export default (binary: Binary) => {
  const id = binary.load('item', 150).bits(4)
  const quality = config.item.quality.firstWhere('id', id)

  if (!quality) {
    throw new ItemQualityNotFound(`id: ${id}`)
  }

  return quality
}