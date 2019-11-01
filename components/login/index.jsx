function Login({ onLogin, onRegister, onBack }) {
  return (
    <section className='login'>
      <form className="login-form" onSubmit={function (event){
        event.preventDefault()
        const { email : {value: email }, password : {value: password } } = event.target
        onLogin(email, password)
      }}>
        <h1 className="login-form__title">Log In</h1>
        <p className="login-form__petition">Please, enter your <b>email</b></p>
        <input className="login-form__email" type="email" name="email" placeholder="hello@gmail.com"/>
        <p className="login-form__petition">Please, enter your <b>password</b></p>
        <input className="login-form__password" type="password" name="password"/>
        <button className="login-form__submit">Login</button>
      </form>
      <p className="login-register">Don't have an account? Create one <b>
        <a className="link" href="" onClick={event => {
          event.preventDefault()
          onRegister()
        }}>here</a></b>
      </p>
      <a className="goBack__button" href="#" onClick={event => {
        event.preventDefault()
        onBack()
      }}>
        <i className="fas fa-arrow-left">Go back</i>
      </a>
    </section>
  )
}
