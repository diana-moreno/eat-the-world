/**
 * Makes a call to an API, sending the personal user data like name, surname, email and password, to be saved in the data base.
 * @param  {String}   name     The name introduced by the user
 * @param  {String}   surname  The surname introduced by the user
 * @param  {String}   email    The email introduced by the user
 * @param  {String}   password The password introduced by the user
 * @param  {Function} callback Recibes a callback with the responde of the call
 * @throws {TypeError}    If name, surname, email or password is not a string
 * @throws {TypeError}    If callback is not a function
 * @throws {ContentError}    If name, surname, email or password is empty or blank
 */
function registerUser(name, surname, email, password, callback) {
  if(typeof name !== 'string') throw new TypeError(name + ' is not a string')
  if(!name.trim().length) throw new ContentError('name is empty or blank')
  if(typeof surname !== 'string') throw new TypeError(surname + ' is not a string')
  if(!surname.trim().length) throw new ContentError('surname is empty or blank')
  if(typeof email !== 'string') throw new TypeError(email + ' is not a string')
  if(!email.trim().length) throw new ContentError('e-mail is empty or blank')
  if(typeof password !== 'string') throw new TypeError(password + ' is not a string')
  if(!password.trim().length) throw new ContentError('password is empty or blank')
  if(typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

  call('POST', 'https://skylabcoders.herokuapp.com/api/user', undefined, { name, surname, username: email, password }, result => {
    result.error ? callback(new Error(result.error)) : callback();
  })
}
