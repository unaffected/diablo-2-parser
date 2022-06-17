const transformer = (config: Record<string, any>) => {
  return (entries: Record<string, any>[]) => {
    return entries.map((data, index) => ({
      index,
      key: data.ID,
      name: data.Stat,
      encoding: data.Encode,
      bits: {
        add: data['Save Add'],
        csv: data['CSvBits'],
        param: data['Save Param Bits'],
        save: data['Save Bits'],
      },
      operation: {
        function: data.op,
        param: data['op param'],
      },
      description: {
        function: data.descfunc,
        priority: data.descpriority,
        value: data.descval,
        label: {
          secondary_code: data.descstr2 || undefined,
          positive_code: data.descstrpos || undefined,
          negative_code: data.descstrneg || undefined,
          group: {
            positive_code: data.dgrpstrpos || undefined,
            negative_code: data.dgrpstrneg || undefined,
          },
        },
      },
    }))
  }
}

export default transformer
