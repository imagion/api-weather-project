const form = document.getElementById('form')
const card = document.getElementById('card')
const details = document.getElementById('details')

const updateUI = data => {
  const { cityDetails, cityWeather } = data

  details.innerHTML = `
    <h5>${cityDetails.EnglishName}</h5>
    <div>${cityWeather.WeatherText}</div>
    <div>
      <span>${cityWeather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `

  if (card.classList.contains('hidden')) {
    card.classList.remove('hidden')
  }
}

const updateCity = async city => {
  const cityDetails = await getCity(city)
  const cityWeather = await getWeather(cityDetails.Key)

  return { cityDetails, cityWeather }

  console.log(city)
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const city = form.city.value.trim()
  form.reset()

  updateCity(city)
    .then(data => updateUI(data))
    .catch(e => console.error(e))
})
