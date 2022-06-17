import Binary from '@/utility/binary'
import * as character from './character/index'
import corpse from './corpse'
import file from './file'
import golem from './golem'
import items from './items'
import * as mercenary from './mercenary'

const parse = (buffer: Buffer) => {
  const binary = new Binary(buffer)
  const data: any = {}

  data.file = file(binary)

  data.character = {}
  data.character.name = binary.goto(20, true).text(16)
  data.character.status = character.status(binary)
  data.character.class = character.class(binary)
  data.mercenary = mercenary.stats(binary)
  data.character = { ...data.character, ...character.stats(binary) }
  data.character.skills = character.skills(binary, data.character.class.name)
  data.items = items(binary)
  data.corpse = corpse(binary)

  mercenary.header(binary)

  if (data.mercenary?.id) {
    data.mercenary.items = mercenary.items(binary)
  }

  if (binary.eof()) return data

  data.golem = golem(binary) || undefined

  return data
}

export default parse
