const modifiers = (
  data: Record<string, any>,
  count: number,
  prefix?: string,
  suffix?: string
): any[] => {
  return Array
    .from(new Array(count))
    .reduce((acc, _, i) => {
      const num = i + 1

      const prop_key = [prefix, `prop${num}`, suffix].filter(Boolean).join('')
      const key = data[prop_key]

      if (!key) {
        return acc
      }

      const param_key = [prefix, `par${num}`, suffix].filter(Boolean).join('')
      const param = data[param_key]

      const min_key = [prefix, `min${num}`, suffix].filter(Boolean).join('')
      const min = data[min_key]

      const max_key = [prefix, `max${num}`, suffix].filter(Boolean).join('')
      const max = data[max_key]

      acc.push({
        key,
        param_id: num,
        param: (Boolean(param) && parseInt(param, 10)) || undefined,
        min: (Boolean(min) && parseInt(min, 10)) || undefined,
        max: (Boolean(max) && parseInt(max, 10)) || undefined
      })

      return acc
    }, [])
}

const transformer = (config: Record<string, any>) => {
  return (entries: Record<string, any>[]) => {
    return entries.map((data, index) => ({
      index,
      key: data.index?.trim(),
      set_code: data.set,
      base_code: data.data,
      level: data.lvl ?? 1,
      modifiers: [
        ...modifiers(data, 9),
        ...modifiers(data, 5, 'a', 'a'),
        ...modifiers(data, 5, 'a', 'b'),
      ],
      requirements: {
        level: data['lvl req'],
      },
    }))
  }
}

export default transformer
