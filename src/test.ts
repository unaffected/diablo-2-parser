import 'module-alias/register'
import fs from 'fs'
import path from 'path'
import parse from '@/index'

const CHARACTER = 'dclone'

const log = (name: string) => path.resolve(__dirname, '..', name)
const character = (name: string) => path.resolve(__dirname, '../data', name)
const file = (name: string) => fs.readFileSync(character(name))

try {
  const data = parse(file(CHARACTER))
  const json = JSON.stringify(data, undefined, 2)

  fs.writeFileSync(log(`output/${CHARACTER}.json`), json)
} catch (error) {
  console.error((error as Error)?.stack)
  fs.writeFileSync(log('error.log'), (error as Error).toString())
  throw error
}

