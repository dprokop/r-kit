class Geolocation {
  boot () {
    if (navigator.geolocation) {
      this.watchPosition = (success, error) => {
        return navigator.geolocation.watchPosition(success, error)
      }
    } else {
      throw new Error('Geolocation not available')
    }
  }

}

export default Geolocation
