function Search( {user, onLogin, onRegister, onBack, onFavorites, validateInputs, error}) {
  return (
    <header className="header">
      {(sessionStorage.token && user) ?

      <section className="header__options">
         <a className="header__options-login" href="#" onClick={event =>{
            event.preventDefault()
            onFavorites()
          }}>Favorites</a>
          <a className="header__options-register" href="#" onClick={event =>{
            event.preventDefault()
            onBack()
          }}>Logout</a>
        <p className='header__options--greeting'>Hello, {user}!</p>
      </section>
      :

      <section className="header__options">
        <a className="header__options-login" href="#" onClick={event =>{
          event.preventDefault()
          onLogin()}}>Login</a>
        <a className="header__options-register" href="#" onClick={event =>{
          event.preventDefault()

          onRegister()
        }}>Create an account</a>
      </section> }

      <h1 className="header__title header__title--search">Eat The World</h1>
      <h2 className="header__slogan">One thousand flavours in one search</h2>
      <form onSubmit={event => {
        event.preventDefault()
        const { city:{value: city}, criteria:{ value: criteria} } = event.target
        validateInputs(city, criteria)
      }}
      className="header__form">
        <input type="text"
        className={error ? 'errorEmptyField header__form-search' : 'header__form-search'}
        name="city" placeholder="introduce a city name"/>
        <input type="text" className="header__form-search" name="criteria" placeholder="cuisine type or restaurant name"/>
        <button className="header__form-button">
          <i className="fas fa-utensils"></i>
        </button>
      </form>
    </header>
  )
}
