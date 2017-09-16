import * as marky from 'marky'

const fmt = time => Math.round(time * 100) / 100

const measure = (name, fn) => {
  marky.mark(name)
  fn()
  const performanceMeasure = marky.stop(name)
  return performanceMeasure.duration
}

const mean = values => {
  const sum = values.reduce((sum, value) => sum + value, 0)
  return sum / values.length
}

const median = values => {
  if (!Array.isArray(values)) {
    return 0
  }
  if (values.length === 1) {
    return values[0]
  }

  const numbers = [...values].sort((a, b) => a - b)
  return (numbers[(numbers.length - 1) >> 1] + numbers[numbers.length >> 1]) / 2
}

const standardDeviation = values => {
  const avg = mean(values)

  const squareDiffs = values.map(value => {
    const diff = value - avg
    return diff * diff
  })

  const meanSquareDiff = mean(squareDiffs)
  return Math.sqrt(meanSquareDiff)
}

const benchmark = ({ name, description, setup, teardown, task, runs }) => {
  return new Promise(resolve => {
    const durations = []
    let i = 0

    setup()
    const first = measure('first', task)
    teardown()

    const done = () => {
      const stdDev = standardDeviation(durations)
      const formattedFirst = fmt(first)
      const formattedMean = fmt(mean(durations))
      const formattedMedian = fmt(median(durations))
      const formattedStdDev = fmt(stdDev)

      console.log({
        name,
        description,
        first: formattedFirst,
        mean: formattedMean,
        median: formattedMedian,
        stdDev: formattedStdDev,
        durations
      })
      resolve()
    }

    const a = () => {
      setup()
      window.requestAnimationFrame(b)
    }

    const b = () => {
      const duration = measure('mean', task)
      durations.push(duration)
      window.requestAnimationFrame(c)
    }

    const c = () => {
      teardown()
      window.requestAnimationFrame(d)
    }

    const d = () => {
      i += 1
      if (i < runs) {
        window.requestAnimationFrame(a)
      } else {
        window.requestAnimationFrame(done)
      }
    }

    window.requestAnimationFrame(a)
  })
}

export default benchmark
