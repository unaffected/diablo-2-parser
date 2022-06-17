const transformer = (config: Record<string, any>) => {
  return (entries: Record<string, any>[]) => {
    return entries.map((data, index) => ({
      index,
      key: data.Code,
      name: data['Player Class'],
    }))
  }
}

export default transformer
