import Binary from '@/utility/binary'

export default (binary: Binary) => {
  const personalization = []

  while (true) {
    const code = binary.bits(7)

    if (code === 0) {
      break
    }

    personalization.push(String.fromCharCode(code))
  }

  return personalization
}