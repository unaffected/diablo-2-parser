const transformer = (config: Record<string, any>) => {
  return (entries: Record<string, any>[]) => {
    return entries.map((data, index) => {
      const output: Record<string, any> = {
        index,
        stats: [],
      }

      for (let i = 1; i < 5; i++) {
        const stat = data[`mod ${i}`]

        if (!stat) {
          continue
        }

        output.stats.push({
          stat,
          param: parseInt(data[`mod ${i} param`] || "0", 10) || undefined,
          min: parseInt(data[`mod ${i} min`] || "0", 10) || undefined,
          max: parseInt(data[`mod ${i} max`] || "0", 10) || undefined,
        })
      }

      return output
    })
  }
}

export default transformer
