import { parse as csv, Options } from 'csv-parse/sync'
import path from 'path'
import fs from 'fs'

export const DEFAULT_INPUT_PATH = path.resolve(__dirname, '../../config/txt')
export const DEFAULT_OUTPUT_PATH = path.resolve(__dirname, '../../config/json')

export const DEFAULT_CONFIG_FILES = {
  'Armor.txt': 'armor.json',
  'AutoMagic.txt': 'magic.json',
  'ItemStatCost.txt': 'modifier.json',
  'Properties.txt': 'property.json',
  'CubeMain.txt': 'cube.json',
  'ItemTypes.txt': 'item-types.json',
  'Gems.txt': 'socketable.json',
  'MagicPrefix.txt': 'magic-prefix.json',
  'MagicSuffix.txt': 'magic-suffix.json',
  'Misc.txt': 'misc.json',
  'PlayerClass.txt': 'class.json',
  'RarePrefix.txt': 'rare-prefix.json',
  'RareSuffix.txt': 'rare-suffix.json',
  'Runes.txt': 'runeword.json',
  'SetItems.txt': 'set-item.json',
  'Sets.txt': 'set.json',
  'Skills.txt': 'skill.json',
  'UniqueItems.txt': 'unique.json',
  'Weapons.txt': 'weapon.json',
}

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
  files: Record<string, string>,
  csv: Options,
} = {
  input: DEFAULT_INPUT_PATH,
  output: DEFAULT_OUTPUT_PATH,
  files: DEFAULT_CONFIG_FILES,
  csv: DEFAULT_CSV_OPTIONS,
}) => {
  fs.mkdirSync(options.output, { recursive: true })

  Object
    .entries(options.files)
    .map(([input, output]) => ([
      path.resolve(options.output, output),
      path.resolve(options.input, input)
    ]))
    .map(([output, filepath]) => ([
      output,
      fs.readFileSync(filepath as string)
    ]))
    .map(([output, buffer]) => ([
      output,
      csv(buffer as Buffer, options.csv)
    ]))
    .map(([output, config]) => ([
      output,
      JSON.stringify(config, undefined, 2)
    ]))
    .forEach(([output, json]) => {
      fs.writeFileSync(output, json)
    })
}

export default convert
