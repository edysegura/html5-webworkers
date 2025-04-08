export function heavyOperation(operationTimes) {
  let result = 0
  while (operationTimes--) {
    result += Math.random()
  }
  return result
}
