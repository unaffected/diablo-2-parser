import Binary from '@/utility/binary'

export default (binary: Binary) => {
  const durability: any = {
    maximum: binary.bits(8)
  }

  if (durability.maximum) {
    durability.current = binary.bits(9)
  }

  return durability
}