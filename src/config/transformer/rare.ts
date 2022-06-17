const transformer = (config: Record<string, any>) => {
  return (entries: Record<string, any>[]) => {
    return entries.map((data, index) => ({
      index,
      key: data.name,
      name: data.name,
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
