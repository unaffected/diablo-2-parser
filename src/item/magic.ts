import config from '!/config'
import Binary from '@/utility/binary'

export default (binary: Binary) => {
  const prefix_id = binary.bits(11)
  const suffix_id = binary.bits(11)

  const prefix = config.item.magic.prefix.firstWhere('id', prefix_id)
  const suffix = config.item.magic.suffix.firstWhere('id', suffix_id)

  return {
    prefix: {
      id: prefix.id,
      name: prefix.name,
    },
    suffix: {
      id: suffix.id,
      name: suffix.name,
    },
  }
}
