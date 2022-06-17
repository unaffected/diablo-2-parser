import config from '!/config'
import Binary from '@/utility/binary'

const CHAINED = [17, 48, 50, 52, 54, 55, 57, 58]

export class ModifierNotFound extends Error {}
export class ModifierMissingSaveBits extends Error {}

export const parse = (binary: Binary, id: number) => {
  const modifier = config.item.modifier.firstWhere('id', id)

  if (!modifier) {
    throw new ModifierNotFound(`id: ${id}`)
  }

  const values: number[] = []

  if (!modifier.bits.save) {
    throw new ModifierMissingSaveBits(`id: ${id}`)
  }

  if (modifier.encoding === 2) {
    values[0] = binary.bits(6) - modifier.bits.add
    values[1] = binary.bits(10) - modifier.bits.add
    values[2] = binary.bits(modifier.bits.save) - modifier.bits.add
  } else if (modifier.encoding === 3) {
    values[0] = binary.bits(6) - modifier.bits.add
    values[1] = binary.bits(10) - modifier.bits.add
    values[2] = binary.bits(8) - modifier.bits.add
    values[3] = binary.bits(8) - modifier.bits.add
  } else if (modifier.bits.param) {
    values[0] = binary.bits(modifier.bits.param) - modifier.bits.add
    values[1] = binary.bits(modifier.bits.save) - modifier.bits.add
  } else {
    values[0] = binary.bits(modifier.bits.save) - modifier.bits.add
  }

  if (CHAINED.includes(id)) {
    const chained: { id: number, values: number[], name: string } = parse(binary, id + 1)

    values.push(...chained.values)
  }

  return { id, values, name: modifier.name }
}

export default parse
