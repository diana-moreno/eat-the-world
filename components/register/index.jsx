function Register({ onRegister, onBack }) {
  return (
    <section className="register">
      <form className='register__form' onSubmit={function (event) {
        event.preventDefault()
        const { name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } = event.target
        onRegister(name, surname, email, password)
      }}>
        <h1 className="register__title">Register</h1><br />
        <input className="register__field" type="text" name="name" placeholder="name"/><br />
        <input className="register__field" type="text" name="surname" placeholder="surname"/><br />
        <input className="register__field" type="email" name="email" placeholder="e-mail"/><br />
        <input className="register__field" type="password" name="password" placeholder="password"/><br />
        <button className="register__submit">Register</button>
      </form>
      <a className="go-back__button" href="#" onClick={event => {
        event.preventDefault()
        onBack()
      }}>
        <i className="fas fa-arrow-left">Go back</i>
      </a>
    </section>
  )
}
