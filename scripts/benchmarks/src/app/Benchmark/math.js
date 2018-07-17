// @flow
import stats from 'stats-analysis'
type ValuesType = Array<number>

export const getStdDev = (values: ValuesType): number => {
  const avg = getMean(values)

  const squareDiffs = values.map((value: number) => {
    const diff = value - avg
    return diff * diff
  })

  return Math.sqrt(getMean(squareDiffs))
}

export const getMean = (values: ValuesType): number => {
  let valuesWithoutOutliers = stats.filterMADoutliers(values)
  return stats.mean(valuesWithoutOutliers)
}

export const getMedian = stats.median
