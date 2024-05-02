const uniqByName = (a) => {
  let seen = new Set()
  return a.filter((item) => {
    let k = item.name
    return seen.has(k) ? false : seen.add(k)
  })
}

export const updateCache = (cache, query, addedPerson) => {
  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}