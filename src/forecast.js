const KEY = 'Y4AA1roj8DzuGRM08v2X8XuX6zObI5fb'

const getWeather = async id => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
  const query = `${id}?apikey=${KEY}`

  const res = await fetch(base + query)
  const data = await res.json()

  return data[0]
}

const getCity = async city => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'
  const query = `?apikey=${KEY}&q=${city}`

  const res = await fetch(base + query)
  const data = await res.json()

  return data[0]
}

getCity('moscow')
  .then(data => {
    return getWeather(data.Key)
  })
  .then(data => {
    console.log(data)
  })
  .catch(e => console.error(e))
