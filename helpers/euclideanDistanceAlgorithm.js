let similarPlace = []
let places = []
let avgDistance = 0

/**
 * Calculate the distance between two points.
 * @param pointX Element point to classify.
 * @param pointY Dataset's point.
 * @returns {number} Distance between points.
 */
function distance(pointX, pointY) {
  if (typeof pointX == 'number' && pointX != 0)
    if (!pointY) return Number.MAX_SAFE_INTEGER
    else return pointX - pointY

  if (!pointX || !pointY) return 1

  return pointX.localeCompare(pointY) === 0 ? 0 : 1
}

/**
 * Enter the element in an array with objects similar to it.
 * @returns {(Object|Array)} Objects similar to the element.
 */
function getSimilarPlaces() {
  avgDistance /= places.length

  for (let i = 0; i < places.length; i += 1) {
    if (places[i][0] <= avgDistance) similarPlace.push(places[i][1])
  }

  return similarPlace
}

/**
 * Obtain sites similar to the element to be classified by means
 * of the Euclidean distance algorithm.
 * @param {Object} vectorX Element to obtain similar objects.
 * @param {(Object|Array)} vectorY Dataset.
 */
module.exports = (vectorX, vectorY) => {
  similarPlace = []
  places = []
  avgDistance = 0

  vectorY.forEach(current => {
    let value = 0

    Object.keys(vectorX).map(attr => {
      value += distance(vectorX[attr], current[attr]) ** 2
      return value
    })

    value = Math.sqrt(value)
    avgDistance += value
    places.push([value, current])
  })

  return getSimilarPlaces()
}
