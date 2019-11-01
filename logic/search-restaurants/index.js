/**
 * SearchRestaurants makes a first call to the Zomato API sending a city query to retrieve the city id. Makes a second call to Zomato API with the new city id from the last call and the query introduced by the user, to search in the API matches with this two cristeria (only location criteria is accepted too, but not only query). After clean the API results, makes a last call to the data base API to check if every restaurant of the result matches with any resturant id saved in the user favorites account. If the restaurant is favorite, adds a favorite property to it.
 * @param  {[type]}   city     Receives the city choosed from user
 * @param  {[type]}   query    Receives a key-word choosed from user
 * @param  {String}   id       Receives the user id
 * @param  {String}   token    Receives the user token
 * @param  {Function} callback Recibes a callback to retrieve the results of the call to the API (returns a restaurants array that matches the call)
 * @throws {TypeError}    If city or query is not a string
 * @throws {TypeError}    If callback is not a function
 * @throws {ContentError}    If id, token or restaurantId is empty or blank
 */
function searchRestaurants(city, query, id, token, callback) {
  if(typeof city !== 'string') throw new TypeError(city + ' is not a string')
  if(typeof query !== 'string') throw new TypeError(query + ' is not a string')
  if(typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  call('GET', "https://developers.zomato.com/api/v2.1/locations?query=" + city, undefined, undefined, resultCity => {

    if(resultCity.error) return callback(new Error(resultCity.error))
    let cityId = resultCity['location_suggestions'][0]['entity_id']

    call('GET', `https://developers.zomato.com/api/v2.1/search?cuisines=55&entity_id=${cityId}&entity_type=city&q=${query}`, undefined, undefined, resultRestaurants => {

      if(resultRestaurants.error) return callback(new Error(resultRestaurants.error))

      resultRestaurants = resultRestaurants.restaurants.map(
        ({ restaurant: { id, average_cost_for_two, currency, cuisines, highlights, location, name, url, featured_image, timings, user_rating, phone_numbers, establishment } }) =>
        ({ id, average_cost_for_two, currency, cuisines, highlights, location, name, url, featured_image, timings, user_rating, phone_numbers, establishment }))

      resultRestaurants.forEach(result => {
        let indexDot = result.location.address.indexOf(',')
        if(indexDot) {
          result.location.address = result.location.address.slice(0, indexDot)
        }
        result.costcurrency = result.average_cost_for_two + " " + result.currency

        if(!result.featured_image) result.featured_image = 'https://b.zmtcdn.com/data/res_imagery/16733182_RESTAURANT_2317de0909b99bd03f8d4d94cbd3389d_c.jpg'
      })
      if(id && token) {
        call('GET', `https://skylabcoders.herokuapp.com/api/user/${id}`, token, undefined, dataUser => {
          if(dataUser.error) return callback(new Error(dataUser.error))

          const { data: { favs = [] } } = dataUser

          resultRestaurants.map(elem => {
            elem.isFav = favs.includes(elem.id)
          })
          callback(undefined, resultRestaurants)
        })
      } else {
        callback(undefined, resultRestaurants)
      }
    })
  })
}
