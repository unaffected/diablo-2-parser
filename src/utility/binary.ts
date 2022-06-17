class Binary {
  public buffer: any
  public cursor: number
  public saved: Record<string, number>

  constructor(buffer: Buffer) {
    this.buffer = buffer
    this.cursor = 0
    this.saved = {}
  }

  align(): Binary {
    this.cursor = ((this.cursor + 7) & (~7))

    return this
  }

  bit(): 0 | 1 {
    const bit = ((this.buffer[this.cursor >> 3] >> (this.cursor & 7)) & 1) as 0 | 1

    this.cursor += 1

    return bit
  }

  bits(count = 1): number {
    let bits = 0
    let shift = 0

    while (count) {
      const byte = this.cursor >> 3
      const bit = this.cursor & 7
      const size = Math.min(count, 8 - bit)
      const value = (this.buffer[byte] >> bit) & ((1 << size) - 1)

      bits |= value << shift
      shift += size
      count -= size

      this.cursor += size
    }

    return bits
  }

  eof(): boolean {
    return (this.cursor === this.buffer.length * 8)
  }

  flag(): boolean {
    return Boolean(this.bit())
  }

  load(name: string, move = 0, bytes = false): Binary {
    this.cursor = this.saved[name] ?? this.cursor

    if (move > 0) {
      this.move(move, bytes)
    }

    return this
  }

  goto(position: number, byte = false): Binary {
    this.cursor = byte ? (position << 3) : position

    return this
  }

  move(count = 1, bytes = false): Binary {
    this.cursor += bytes ? count * 8 : count

    return this
  }

  save(name: string): Binary {
    this.saved[name] = this.cursor

    return this
  }

  text(size = 1): string {
    return String
      .fromCharCode(...this.uint8(size) as number[])
      .replace(/\u0000/g, '')
  }

  uint8(count?: number): number | number[] {
    if (count) {
      return Array
        .from(new Array(count))
        .map(() => this.uint8() as number)
    }

    const byte = this.buffer[this.cursor >> 3]

    this.cursor += 8

    return byte
  }

  uint16(count?: number): number | number[] {
    if (count) {
      return Array
        .from(new Array(count))
        .map(() => this.uint16() as number)
    }

    const idx = this.cursor >> 3
    const bytes = [
      this.buffer[idx],
      this.buffer[idx + 1],
    ]

    this.cursor += 16

    return bytes[0] | (bytes[1] << 8)
  }

  uint32(count?: number): number |  number[] {
    if (count) {
      return Array
        .from(new Array(count))
        .map(() => this.uint32() as number)
    }

    const idx = this.cursor >> 3

    const bytes = [
      this.buffer[idx],
      this.buffer[idx + 1],
      this.buffer[idx + 2],
      this.buffer[idx + 3],
    ]

    this.cursor += 32

    return ((bytes[0]
      | (bytes[1] << 8)
      | (bytes[2] << 16)
      | (bytes[3] << 24)
    ) >>> 0)
  }
}

export default Binary
