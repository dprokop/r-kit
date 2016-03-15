import storeDev from 'app/config/store/configStore.dev'
import storeProd from 'app/config/store/configStore.prod'

if (process.env.NODE_ENV === 'development') {
  module.exports = storeDev
}

if (process.env.NODE_ENV === 'production') {
  module.exports = storeProd
}
