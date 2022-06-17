import Binary from '@/utility/binary'

const parse = (binary: Binary) => {
  const data: Record<string, any> = {}

  data.id = binary.goto(179, true).uint32()

  if (!data.id) {
    return undefined
  }

  data.name_id = binary.goto(183, true).uint16()
  data.type = binary.goto(185, true).uint16()
  data.experience = binary.goto(187, true).uint32()

  return data
}

export default parse
