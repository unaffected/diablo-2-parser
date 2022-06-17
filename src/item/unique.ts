import Binary from '@/utility/binary'

export default (binary: Binary) => {
  const bits = binary.bits(12)

  // NOTE: Account for "Expansion" row in txt config
  // TODO: consider filtering out unique items missing key data
  const id = bits >= 129 ? bits + 1 : bits

  return { id }
}
