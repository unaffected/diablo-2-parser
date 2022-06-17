const transform = (bases: Record<string, any>[], labels: Record<string, string> = {}) => {
  return bases
    .filter(({ version }: any) => version !== '')
    .map((base, index: number) => ({
      index,
      key: base.code,
      level: base.level,
      name: labels[base.namestr] ?? base.name ?? base.namestr,
      codes: {
        normal: base.normcode,
        exceptional: base.ubercode,
        elite: base.ultracode,
      },
      damage: {
        one_handed: {
          min: base.mindam || 0,
          max: base.maxdam || 0,
        },
        two_handed: {
          min: base['2handmindam'] || 0,
          max: base['2handmaxdam'] || 0,
        },
        missile: {
          min: base.minmisdam || 0,
          max: base.maxmisdam || 0,
        },
      },
      defense: {
        min: base.minac || 0,
        max: base.maxac || 0,
      },
      durability: {
        max: base.durability || 0,
        indestructible: Boolean(base.nodurability),
      },
      bonus: {
        stength: base.StrBonus || 0,
        dexterity: base.DexBonus || 0,
      },
      requirements: {
        level: base.levelreq || 0,
        strength: base.reqstr || 0,
        dexterity: base.reqdex || 0,
      },
      size: {
        height: base.invheight,
        width: base.invwidth,
      },
      sockets: {
        socketable: Boolean(base.gemsockets),
        max: base.gemsockets || 0,
      },
      stack: {
        stackable: Boolean(base.stackable),
        max: Boolean(base.stackable) ? base.maxstack : 0,
      },
      sound: {
        drop: base.dropsound,
        use: base.usesound,
      },
      type: {
        primary: base.type,
        secondary: base.type2,
      },
      graphic: {
        primary: base.code,
        secondary: base.alternateGfx,
      },
    }))
}

export default transform
