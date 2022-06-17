const transformer = (config: Record<string, any>) => {
  return (entries: Record<string, any>[]) => {
    return entries.map((data, index) => ({
      index,
      key: data.Code,
      equippable: Boolean(data.Body),
      slots: [data.BodyLoc1, data.BodyLoc2].filter(Boolean),
      name: data.ItemType,
    }))
  }
}

export default transformer
