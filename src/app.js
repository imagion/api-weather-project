const form = document.getElementById('form')
const card = document.getElementById('card')
const details = document.getElementById('details')
const image = document.getElementById('image')
const icon = document.getElementById('icon')

const updateUI = data => {
  console.log(data)
  const { cityDetails, cityWeather } = data

  details.innerHTML = `
    <h5>${cityDetails.EnglishName}</h5>
    <div>${cityWeather.WeatherText}</div>
    <div>
      <span>${cityWeather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `

  let timeSrc = cityWeather.IsDayTime ? 'images/day.svg' : 'images/night.svg'
  image.setAttribute('src', timeSrc)

  const iconSrc = `images/icons/${cityWeather.WeatherIcon}.svg`
  icon.setAttribute('src', iconSrc)

  if (card.classList.contains('hidden')) {
    card.classList.remove('hidden')
  }
}

const updateCity = async city => {
  const cityDetails = await getCity(city)
  const cityWeather = await getWeather(cityDetails.Key)

  return { cityDetails, cityWeather }
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const city = form.city.value.trim()
  form.reset()

  updateCity(city)
    .then(data => updateUI(data))
    .catch(e => console.error(e))
})
