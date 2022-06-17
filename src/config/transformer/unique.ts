const modifiers = (data: Record<string, any>): any[] => {
  return Array
    .from(new Array(12))
    .reduce((acc, _, i) => {
      const num = i + 1
      const key = data[`prop${num}`]

      if (!key) {
        return acc
      }

      const param = data[`par${num}`]
      const min = data[`min${num}`]
      const max = data[`max${num}`]

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

const transform = (uniques: Record<string, any>[], labels: Record<string, string> = {}) => {
  return uniques
    .filter(({ version }: any) => version !== '')
    .map((unique, index: number) => ({
      index: index,
      key: unique.index,
      name: labels[unique.index],
      base_id: unique.code,
      item_level: unique.lvl,
      required_level: unique['lvl req'],
      modifiers: modifiers(unique),
    }))
}

export default transform
