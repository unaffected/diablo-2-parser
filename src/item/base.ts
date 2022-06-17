import config from '!/config'
import Binary from '@/utility/binary'

export class ItemBaseNotFound extends Error {}

const parse = (binary: Binary) => {
  binary.load('item', 76)

  const chars = [
    binary.bits(8),
    binary.bits(8),
    binary.bits(8),
    binary.bits(8),
  ]

  const id = chars
    .map(x => String.fromCharCode(x))
    .join('')
    .replace(' ', '')

  const armor = config.item.base.armor.firstWhere('key', id)

  if (armor) return {
    id,
    category: 'armor',
    name: config.label[armor.name_code] ?? name,
    stackable: armor.stack?.stackable ?? false,
    type_code: armor.type_code,
  }

  const misc = config.item.base.misc.firstWhere('key', id)

  if (misc) return {
    id,
    category: 'misc',
    name: config.label[misc.name_code] ?? name,
    stackable: misc.stack?.stackable ?? false,
    type_code: misc.type_code,
  }


  const weapon = config.item.base.weapon.firstWhere('key', id)

  if (weapon) return {
    id,
    category: 'weapon',
    name: config.label[weapon.name_code] ?? name,
    stackable: weapon.stack?.stackable ?? false,
    type_code: weapon.type_code,
  }

  throw new ItemBaseNotFound(`id: ${id}`)
}

export default parse
