import Binary from '@/utility/binary'

export default (binary: Binary) => ({
  header: binary.goto(0).uint32() as number,
  version: binary.goto(4, true).uint32() as number,
  filesize: binary.goto(8, true).uint32() as number,
  checksum: binary.goto(12, true).uint32() as number,
  updated_at: binary.goto(48, true).uint32() as number,
})
