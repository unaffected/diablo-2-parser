const transformer = (config: Record<string, any>) => {
  return (entries: Record<string, any>[]) => {
    return entries.map((data, index) => ({
      index,
      key: data.index,
      name: data.name,
    }))
  }
}

export default transformer
