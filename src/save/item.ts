import Binary from '@/utility/binary'
import * as item from './item/index'

export class ItemHeaderNotFound extends Error {}

const parse = (binary: Binary) => {
  binary.align()
  binary.save('item')

  const header = binary.text(2)

  if (header !== 'JM') {
    throw new ItemHeaderNotFound(`item header not found: ${header}`)
  }

  const data: any = {}

  data.is_identified = binary.load('item', 20).flag()
  data.is_socketed = binary.load('item', 27).flag()
  data.is_new = binary.load('item', 29).flag()
  data.is_ear = binary.load('item', 32).flag()
  data.is_starter = binary.load('item', 33).flag()
  data.is_simple = binary.load('item', 37).flag()
  data.is_ethereal = binary.load('item', 38).flag()
  data.is_personalized = binary.load('item', 40).flag()
  data.is_runeword = binary.load('item', 42).flag()
  data.zone_id = binary.load('item', 58).bits(3)
  data.location_id = binary.load('item', 61).bits(4)
  data.storage_id = binary.load('item', 73).bits(3)
  data.column = binary.load('item', 65).bits(4)
  data.row = binary.load('item', 69).bits(4)

  if (data.is_ear) {
    binary.align()

    return { ...data, ...item.ear(binary) }
  }

  data.base = item.base(binary)

  if (data.is_simple) return binary.align() && data

  data.socketed_count = binary.load('item', 108).bits(3)
  data.id = item.id(binary)
  data.item_level = binary.load('item', 43).bits(7)
  data.quality = item.quality(binary)
  data.graphic_id = binary.flag() && binary.bits(3)
  data.class_specifics = binary.flag() && binary.bits(11)

  if ([1, 3].includes(data.quality.id)) {
    data.quality.sub_id = binary.bits(3)
  }

  if (['tbk', 'tsc', 'ibk', 'isc'].includes(data.base.id)) {
    data.skill_id = binary.bits(5)
  }

  if (data.base.type_code === 'body') {
    data.organ = binary.bits(12)
  }

  if (data.quality.id === 4) {
    data.magic = item.magic(binary)
  }

  if (data.quality.id === 5) {
    data.set = item.set(binary)
  }

  if (data.quality.id === 7) {
    data.unique = item.unique(binary)
  }

  if ([6, 8].includes(data.quality.id)) {
    data.rare = item.rare(binary)
  }

  if (data.is_runeword) {
    data.runeword = item.runeword(binary)
  }

  if (data.is_personalized) {
    data.personalization = item.personalization(binary)
  }

  if (binary.flag()) binary.move(40)

  if (data.base.category === 'armor') {
    data.defense = { base: binary.bits(11) - 10 }
  }

  if (['armor', 'weapon'].includes(data.base.category)) {
    data.durability = item.durability(binary)
  }

  if (data.base.stackable) {
    data.quantity = binary.bits(9)
  }

  if (data.is_socketed) {
    data.socket_count = binary.bits(4)
  }

  if (data.quality.id === 5) {
    data.set.size = binary.bits(5)
  }

  data.modifiers = item.modifiers(binary)

  if (data.quality.id === 5) {
    data.set.bonuses = [1, 2, 4, 8, 16]
      .filter(flag => data.set.size & flag)
      .reduce((acc: any[]) => ([...acc, item.modifiers(binary)]), [])
  }

  if (data.is_runeword) {
    data.modifiers = [...data.modifiers, item.modifiers(binary)]
  }

  if (data.socketed_count) {
    data.socketed = Array
      .from(new Array(data.socketed_count))
      .map(() => parse(binary))
  }

  binary.align()

  return data
}

export default parse
