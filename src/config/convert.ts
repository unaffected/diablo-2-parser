import { parse as csv, Options } from 'csv-parse/sync'
import path from 'path'
import fs from 'fs'
import * as transform from './transformer'

export const DEFAULT_INPUT_PATH = path.resolve(__dirname, '../../config/txt')
export const DEFAULT_OUTPUT_PATH = path.resolve(__dirname, '../../config/json')

export const DEFAULT_CONFIG_FILES = [{
  key: 'armor',
  input: 'Armor.txt',
  output: 'armor.json',
  transformer: transform.base,
}, {
  key: 'modifier',
  input: 'ItemStatCost.txt',
  output: 'modifier.json',
  transformer: transform.modifier,
}, {
  key: 'property',
  input: 'Properties.txt',
  output: 'property.json',
  transformer: transform.property,
}, {
  key: 'cube',
  input: 'CubeMain.txt',
  output: 'cube.json',
  transformer: transform.cube,
}, {
  key: 'type',
  input: 'ItemTypes.txt',
  output: 'type.json',
  transformer: transform.type,
}, {
  key: 'socketable',
  input: 'Gems.txt',
  output: 'socketable.json',
  transformer: transform.socketable,
}, {
  key: 'magic_prefix',
  input: 'MagicPrefix.txt',
  output: 'magic-prefix.json',
  transformer: transform.magic,
}, {
  key: 'magic_suffix',
  input: 'MagicSuffix.txt',
  output: 'magic-suffix.json',
  transformer: transform.magic,
}, {
  key: 'misc',
  input: 'Misc.txt',
  output: 'misc.json',
  transformer: transform.base,
}, {
  key: 'class',
  input: 'PlayerClass.txt',
  output: 'class.json',
  transformer: transform.class,
}, {
  key: 'rare_prefix',
  input: 'RarePrefix.txt',
  output: 'rare-prefix.json',
  transformer: transform.rare,
}, {
  key: 'rare_suffix',
  input: 'RareSuffix.txt',
  output: 'rare-suffix.json',
  transformer: transform.rare,
}, {
  key: 'runeword',
  input: 'Runes.txt',
  output: 'runeword.json',
  transformer: transform.runeword,
}, {
  key: 'set_item',
  input: 'SetItems.txt',
  output: 'set-item.json',
  transformer: transform.set_item,
}, {
  key: 'set',
  input: 'Sets.txt',
  output: 'set.json',
  transformer: transform.set,
}, {
  key: 'skill',
  input: 'Skills.txt',
  output: 'skill.json',
  transformer: transform.skill,
}, {
  key: 'unique',
  input: 'UniqueItems.txt',
  output: 'unique.json',
  transformer: transform.unique,
}, {
  key: 'weapon',
  input: 'Weapons.txt',
  output: 'weapon.json',
  transformer: transform.base,
}]

export const DEFAULT_CSV_OPTIONS = {
  columns: true,
  skip_empty_lines: true,
  delimiter: '\t',
  relax_quotes: true,
  cast: true,
}

export const convert = (options: {
  input: string ,
  output: string,
  files: [Record<string, string>],
  csv: Options,
} = {
  input: DEFAULT_INPUT_PATH,
  output: DEFAULT_OUTPUT_PATH,
  files: DEFAULT_CONFIG_FILES,
  csv: DEFAULT_CSV_OPTIONS,
}) => {
  fs.mkdirSync(options.output, { recursive: true })

  options.files
    .map((config) => {
      const input = path.resolve(options.input, config.input)
      const output = path.resolve(options.output, config.output)
      const file = fs.readFileSync(input)

      const data = csv(file)
      const json = JSON.stringify(data, undefined, 2)

      fs.writeFileSync(output, json)

      return data
    })
}

export default convert
