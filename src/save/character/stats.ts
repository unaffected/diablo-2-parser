import config from '!/config'
import Binary from '@/utility/binary'

const parse = (binary: Binary) => {
  const stats: any = {}
  const header = binary.goto(765, true).text(2)

  if (header !== 'gf') {
    throw 'stats header not found'
  }

  while (true) {
    const id = binary.bits(9)

    if (id === 511) {
      break
    }

    const stat = config.item.modifier.firstWhere('id', id)

    stats[stat.name] = binary.bits(stat.bits.csv)
  }

  binary.align()

  return {
    attributes: {
      strength: stats.strength,
      dexterity: stats.dexterity,
      vitality: stats.vitality,
      energy: stats.energy,
    },
    gold: {
      character: stats.gold || 0,
      stash: stats.goldbank || 0,
      total: (stats.gold || 0 ) + (stats.goldbank || 0),
    },
    points: {
      stat: stats.statpts || 0,
      skill: stats.newskills || 0,
    },
    life: Math.round(stats.hitpoints / 256),
    mana: Math.round(stats.mana / 256),
    stamina: Math.round(stats.stamina / 256),
    experience: stats.experience,
    level: stats.level,
  }
}

export default parse
