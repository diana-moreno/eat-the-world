/**
 * ToggleFavs makes a first call to the API data base to retrieve the user favorites saved in his account and checks if the restaurantId already exists, if not, agregates the restaurantId to favorites in his account, if not, deletes the id.
 * @param  {String}   id       Receives the user id
 * @param  {String}   token    Receives the user token
 * @param  {[type]}   restaurantId Id related to a restaurant
 * @param  {Function} callback Recibes a callback to retrieve the results of the call to the API (expected 'ok')
 * @throws {TypeError}    If id, token or restaurantId is not a string
 * @throws {TypeError}    If callback is not a function
 * @throws {ContentError}    If id, token or restaurantId is empty or blank
 */
function toggleFavs(id, token, restaurantId, callback) {
    if(typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if(!id.trim().length) throw new ContentError('id is empty or blank')
    if(typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if(!token.trim().length) throw new ContentError('token is empty or blank')
    if(typeof restaurantId !== 'string') throw new TypeError(restaurantId + ' is not a string')
    if(!restaurantId.trim().length) throw new ContentError('restaurantId id is empty or blank')
    if(typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  call('GET', `https://skylabcoders.herokuapp.com/api/user/${id}`, token, undefined, result => {

    if(result.error) return callback(new Error(result.error))

    const { data: { favs = [] } } = result
    const index = favs.findIndex(fav => fav === restaurantId)
    index > -1 ? favs.splice(index, 1) : favs.push(restaurantId)

    call('PUT', `https://skylabcoders.herokuapp.com/api/user/${id}`, token, { favs }, result2 => {
      result2.error ? callback(new Error(result2.error)) : callback(undefined, result2)
    })
  })
}
