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

const transform = (data: Record<string, any>[]) => {
  return data.map(magic => ({
    key: magic.Name,
    name: magic.Name,
    class: magic.classspecific || undefined,
    group: magic.group,
    level: magic.lvl,
    modifiers: modifiers(magic),
    requirements: {
      level: magic.levelreq,
    },
    types: [
      magic.itype1,
      magic.itype2,
      magic.itype3,
      magic.itype4,
      magic.itype5,
      magic.itype6,
      magic.itype7,
    ].filter(Boolean),
  }))
}

export default transform
