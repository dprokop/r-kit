import appDev from 'components/app/app.dev'
import appProd from 'components/app/app.prod'

if (process.env.NODE_ENV === 'development') {
  module.exports = appDev
}

if (process.env.NODE_ENV === 'production') {
  module.exports = appProd
}
