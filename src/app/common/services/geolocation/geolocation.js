class Geolocation {
  boot () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        this.watchPosition = (success, error) => {
          navigator.geolocation.watchPosition(success, error)
        }
        resolve(true)
      } else {
        reject('Geolocation service not available')
        throw new Error('Geolocation not available')
      }
    })
  }
}

export default Geolocation
