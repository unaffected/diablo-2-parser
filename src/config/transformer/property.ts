const transformer = (config: Record<string, any>) => {
  return (entries: Record<string, any>[]) => {
    return entries.map((data, index) => {
      const output: Record<string, any> = {
        index,
        key: data.code,
        stats: [],
      }

      for (let i = 1; i < 7; i++) {
        const stat = data[`stat${i}`]

        if (!stat) {
          continue
        }

        output.stats.push({
          stat,
          function: parseInt(data[`func${i}`] || "0", 10) || undefined,
          set: data[`set${i}`] || undefined,
          value: parseInt(data[`val${i}`] || "0", 10) || undefined,
        })
      }

      return output
    })
  }
}

export default transformer
