/**
 * Makes a call to an API, sending email and password and checks if the user exists returning an id and a token
 * @param  {String}   email    Recibes a user email
 * @param  {String}   password Recibes a user password
 * @param  {Function} callback Recibes a callback to retrieve the results of the call to the API
 * @throws {TypeError}    If email or password is not a string
 * @throws {TypeError}    If callback is not a function
 * @throws {ContentError}    If email or password is empty or blank
 */
function authenticateUser(email, password, callback) {
  if(typeof email !== 'string') throw new TypeError(email + ' is not a string')
  if(!email.trim().length) throw new ContentError('e-mail is empty or blank')
  if(typeof password !== 'string') throw new TypeError(password + ' is not a string')
  if(!password.trim().length) throw new ContentError('password is empty or blank')
  if(typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  call('POST', 'https://skylabcoders.herokuapp.com/api/auth', undefined, { username: email, password }, result => {
    result.error ? callback(new Error(result.error)) : callback(undefined, result.data)
  })
}
