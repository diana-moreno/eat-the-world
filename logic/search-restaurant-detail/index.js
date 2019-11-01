/**
 * SearchRestaurant makes a call to Zomato API sending a restaurant id and returns a restaurant in the response. Makes a second call to the data base in Skylabcoders API to check if this restaurant is favorite, if it's favorite, adds a favorite property to the restaurant before to return it. This way, every restaurant detail will be updated with favorites.
 * @param  {String}   restId   Id of the restaurant to retrieve
 * @throws {TypeError}    If restId is not a string
 * @throws {TypeError}    If callback is not a function
 * @throws {ContentError}    If restId is empty or blank
 */
function searchRestaurantDetail(restId, callback) {
  if (typeof restId !== 'string') throw new TypeError(restId + ' is not a string')
  if (!restId.trim().length) throw new ContentError('restId is empty or blank')
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  call('GET', `https://developers.zomato.com/api/v2.1/restaurant?res_id=${restId}`, undefined, undefined, restaurant => {
    restaurant.error ? callback(new Error(restaurant.error)) : callback(undefined, restaurant)

    const { id, token } = sessionStorage
    if (id && token) {
      call('GET', `https://skylabcoders.herokuapp.com/api/user/${id}`, token, undefined, dataUser => {
        if (dataUser.error) return callback(new Error(dataUser.error))
        const { data: { favs = [] } } = dataUser
        restaurant.isFav = favs.includes(restaurant.id)

        callback(undefined, restaurant)
      })
    } else {
      callback(undefined, restaurant)
    }
  })
}
