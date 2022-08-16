import stats from 'stats-analysis'

export const getStdDev = values => {
  const avg = getMean(values)

  const squareDiffs = values.map(value => {
    const diff = value - avg
    return diff * diff
  })

  return Math.sqrt(getMean(squareDiffs))
}

export const getMean = values => {
  let valuesWithoutOutliers = stats.filterMADoutliers(values)
  return stats.mean(valuesWithoutOutliers)
}

export const getMedian = stats.median
