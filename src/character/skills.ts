import config from '!/config'
import Binary from '@/utility/binary'

export class SkillsNotFound extends Error {}

// these are the skill IDs for the placeholder
// class skills that exist because each character
// must have the same number of skills.
// because these skills are not actually used in-game
// we want to parse them out of the result in order
// to improve the cleaniness of our parsing output
const EXCLUDED_SKILL_IDS = [368, 372, 373, 375, 377, 379, 380, 382, 384]

const parse = (binary: Binary, klass: string) => {
  const header = binary.text(2)

  if (header !== 'if') {
    throw new SkillsNotFound(`header: ${header}`)
  }

  const skills: any[] = config.character.skill.where('class', klass).all()

  return Array
    .from(new Array(33))
    .map(() => binary.uint8())
    .map((level, index) => ({
      id: skills[index].id,
      name: skills[index].name,
      level,
    }))
    .filter((skill) => !EXCLUDED_SKILL_IDS.includes(skill.id))
}

export default parse
