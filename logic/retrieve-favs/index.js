/**
 * The function makes a call to the first API to retrieve the favorites id saved in the user account, and makes a second call to Zomato API to retrieve all restaurants that matches with every id saved in the user account.
 * @param  {String}   id       Receives the user id
 * @param  {String}   token    Receives the user token
 * @param  {Function} callback Recibes a callback to retrieve the results of the call to the API (the favorites restaurants returned in an array)
 * @throws {TypeError}    If id or token is not a string
 * @throws {TypeError}    If callback is not a function
 * @throws {ContentError}    If id or token is empty or blank
 */
function retrieveFavs(id, token, callback) {
  if(typeof id !== 'string') throw new TypeError(id + ' is not a string')
  if(!id.trim().length) throw new ContentError('id is empty or blank')
  if(typeof token !== 'string') throw new TypeError(token + ' is not a string')
  if(!token.trim().length) throw new ContentError('token is empty or blank')
  if(typeof callback !== 'function') throw new TypeError(callback +  ' is not a function')

  call('GET', 'https://skylabcoders.herokuapp.com/api/user/' + id, token, undefined, result => {

    if(result.error) return callback(new Error(result.error))
    const { data: { favs = [] } } = result
    let counter = 0,
      error

    if(favs.length) {
      favs.forEach((fav, i) => {
        call('GET', `https://developers.zomato.com/api/v2.1/restaurant?res_id=${favs[i]}`, undefined, undefined, result2 => {
          if(result2.error) return callback(error = new Error(result2.error))
          // we change the id of the favorite restaurants from the data base with the restaurants of the API
          favs[i] = result2
          if(++counter === favs.length) callback(undefined, favs) // this condicional solves to repeat the callback in each iteration
        })
      })
    } else {
      callback(undefined, favs)
    }
  })
}
