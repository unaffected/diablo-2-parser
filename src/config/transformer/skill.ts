const transformer = (config: Record<string, any>) => {
  return (entries: Record<string, any>[]) => {
    return entries.map((data, index) => ({
      index,
      class_code: data.charclass,
      key: parseInt(data.Id, 10),
      name: data.skill,
    }))
  }
}

export default transformer
