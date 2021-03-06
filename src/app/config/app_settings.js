export default {
  paths: {
    images: 'static/images',
    fonts: 'static/fonts'
  },
  services: {
    OpenWeather: {
      appId: '6058764b2c589f639754a906a4dfb561',
      enabled: true,
      unit: 'metric'
    },
    Sentry: {
      clientUrl: 'https://33b34862e1cc45f8b863662d9d9b7415@app.getsentry.com/69634',
      enabled: false
    },
    Geolocation: {
      enabled: true
    }
  }
}
