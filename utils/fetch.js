function fetch(method, url, headers, body, callback) {
  var xhr = new XMLHttpRequest

  xhr.open(method, url)

  xhr.onreadystatechange = function() {
    callback(this)
  }

  if (headers)
    for (let key in headers)
      xhr.setRequestHeader(key, headers[key])

  body ? xhr.send(JSON.stringify(body)) : xhr.send()
}
