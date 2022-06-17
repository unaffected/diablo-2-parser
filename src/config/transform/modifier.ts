const transform = (data: Record<string, any>) => {
  return data.map((modifier: any) => ({
    key: modifier.ID,
    name: modifier.Stat,
    encoding: modifier.Encode,
    bits: {
      add: modifier['Save Add'],
      csv: modifier['CSvBits'],
      param: modifier['Save Param Bits'],
      save: modifier['Save Bits'],
    },
    operation: {
      function: modifier.op,
      param: modifier['op param'],
    },
    description: {
      function: modifier.descfunc,
      priority: modifier.descpriority,
      value: modifier.descval,
      label: {
        secondary_code: modifier.descstr2 || undefined,
        positive_code: modifier.descstrpos || undefined,
        negative_code: modifier.descstrneg || undefined,
        group: {
          positive_code: modifier.dgrpstrpos || undefined,
          negative_code: modifier.dgrpstrneg || undefined,
        },
      },
    },
  }))
}

export default transform
