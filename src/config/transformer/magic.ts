const modifiers = (data: Record<string, any>): any[] => {
  return Array
    .from(new Array(12))
    .reduce((acc, _, i) => {
      const num = i + 1
      const key = data[`mode${num}code`]

      if (!key) {
        return acc
      }

      const param = data[`mod${num}param`]
      const min = data[`mod${num}min`]
      const max = data[`mod${num}max`]

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
      key: data.Name,
      name: data.Name,
      class: data.classspecific || undefined,
      group: data.group,
      level: data.lvl,
      modifiers: modifiers(data),
      requirements: {
        level: data.levelreq,
      },
      types: [
        data.itype1,
        data.itype2,
        data.itype3,
        data.itype4,
        data.itype5,
        data.itype6,
        data.itype7,
      ].filter(Boolean),
    }))
  }
}

export default transformer
