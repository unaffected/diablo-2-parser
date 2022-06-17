const transformer = (config: Record<string, any>) => {
  return (entries: Record<string, any>[]) => {
    return entries
      .filter(({ version }: any) => version !== '')
      .map((data, index: number) => ({
        index,
        key: data.code,
        level: data.level,
        name: config.labels[data.namestr] ?? data.name ?? data.namestr,
        codes: {
          normal: data.normcode,
          exceptional: data.ubercode,
          elite: data.ultracode,
        },
        damage: {
          one_handed: {
            min: data.mindam || 0,
            max: data.maxdam || 0,
          },
          two_handed: {
            min: data['2handmindam'] || 0,
            max: data['2handmaxdam'] || 0,
          },
          missile: {
            min: data.minmisdam || 0,
            max: data.maxmisdam || 0,
          },
        },
        defense: {
          min: data.minac || 0,
          max: data.maxac || 0,
        },
        durability: {
          max: data.durability || 0,
          indestructible: Boolean(data.nodurability),
        },
        bonus: {
          stength: data.StrBonus || 0,
          dexterity: data.DexBonus || 0,
        },
        requirements: {
          level: data.levelreq || 0,
          strength: data.reqstr || 0,
          dexterity: data.reqdex || 0,
        },
        size: {
          height: data.invheight,
          width: data.invwidth,
        },
        sockets: {
          socketable: Boolean(data.gemsockets),
          max: data.gemsockets || 0,
        },
        stack: {
          stackable: Boolean(data.stackable),
          max: Boolean(data.stackable) ? data.maxstack : 0,
        },
        sound: {
          drop: data.dropsound,
          use: data.usesound,
        },
        type: {
          primary: data.type,
          secondary: data.type2,
        },
        graphic: {
          primary: data.code,
          secondary: data.alternateGfx,
        },
      }))
  }
}

export default transformer
