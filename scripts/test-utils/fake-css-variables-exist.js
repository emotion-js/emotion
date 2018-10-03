window.CSS = {
  supports(property, value) {
    if (property.indexOf('--') === 0) {
      return true
    }
  }
}
