import 'module-alias/register'
import fs from 'fs'
import path from 'path'
import parse from '@/save/index'


const log = (name: string) => path.resolve(__dirname, '..', name)
const character = (name?: string) => path.resolve(__dirname, '../data', name ? name : '')
const file = (name: string) => fs.readFileSync(character(name))

const files = fs.readdirSync(character())

const parseSaveFile = (name: string) => {
  try {
    const buffer = file(name)

    console.log('parsing savefile:', name)
    console.log(buffer)

    const data = parse(buffer)
    const json = JSON.stringify(data, undefined, 2)

    fs.writeFileSync(log(`output/${name}.json`), json)
  } catch (error) {
    console.error((error as Error)?.stack)
    fs.writeFileSync(log('error.log'), (error as Error).toString())
  }
}

files.forEach(parseSaveFile)

