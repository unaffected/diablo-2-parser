import config from '!/config'
import Binary from '@/utility/binary'

export class ClassNotFound extends Error {}

const parse = (binary: Binary) => {
  const id = binary.goto(40, true).uint8()
  const name = config.character.class.firstWhere('id', id).name

  if (!name) {
    throw new ClassNotFound(`id: ${id}`)
  }

  return { id, name }
}

export default parse
