const transformer = (config: Record<string, any>) => {
  return (entries: Record<string, any>[]) => {
    return entries.map((data, index) => ({
      index,
      ...data,
    }))
  }
}

export default transformer
