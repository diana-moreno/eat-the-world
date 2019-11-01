/**
 * The funcion makes a call to an API to retrieve the personal user data sending and id an a token to check which user is.
 * @param  {String}   id       Receives the user id
 * @param  {String}   token    Receives the user token
 * @param  {Function} callback Recibes a callback to retrieve the results of the call to the API (the personal user data)
 * @throws {TypeError}    If id or token is not a string
 * @throws {TypeError}    If callback is not a function
 * @throws {ContentError}    If id or token is empty or blank
 */
function retrieveUser(id, token, callback) {
  if(typeof id !== 'string') throw new TypeError(id + ' is not a string')
  if(!id.trim().length) throw new ContentError('id is empty or blank')
  if(typeof token !== 'string') throw new TypeError(token + ' is not a string')
  if(!token.trim().length) throw new ContentError('token is empty or blank')
  if(typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  call('GET', `https://skylabcoders.herokuapp.com/api/user/${id}`, token, undefined, result => {
    result.error ? callback(new Error(result.error)) : callback(undefined, result.data)
  })
}
