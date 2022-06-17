import Binary from '@/utility/binary'

export default (binary: Binary) => {
  const bits = binary.bits(12)

  // NOTE: Account for "Expansion" row in txt config
  // TODO: consider filtering out unique items missing key data
  const item_id = bits >= 62 ? bits + 1 : bits

  return { item_id }
}
