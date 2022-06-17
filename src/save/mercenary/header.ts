import Binary from '@/utility/binary'

export class MercenaryNotFound extends Error {}

const parse = (binary: Binary) => {
  const header = binary.text(2)

  if (header === 'jf') return

  throw new MercenaryNotFound(`header: ${header}`)
}

export default parse
