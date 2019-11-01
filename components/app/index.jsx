const { Component } = React

class App extends Component {
  state = {
    view: 'landing',
    restaurants: [],
    restaurant: undefined,
    favorites: [],
    isLanding: true,
    isDetail: false,
    isFavorite: false,
    user: undefined,
    error: { city: false, noResults: false}
  }

  UNSAFE_componentWillMount() {
    const { id, token } = sessionStorage
    if(id && token) {
      retrieveUser(id, token, (error, user) => {
        if (error) return this.setState({ error: error.message })

        const { name } = user
        this.setState({
          user: name,
          error: { city: false, noResults: false}
        })
      })
    }
  }

  handleLogin = (email, password) => {
    try {
      authenticateUser(email, password, (error, data) => {
        if (error) return this.setState({ error: error.message })
        try {
          const { id, token } = data

          sessionStorage.id = id
          sessionStorage.token = token

          retrieveUser(id, token, (error, user) => {
            if (error) return this.setState({ error: error.message })
            const { name } = user

            if(!this.state.isFavorite && !this.state.isDetail && !this.state.isLanding) this.handleRestaurants(this.state.city, this.state.query)
            if(this.state.isDetail) this.handleDetail(this.state.restId)

            this.setState({
              view: this.state.isLanding ? 'landing' : this.state.isDetail ? 'detail' : 'results',
              user: name,
              error: { city: false, noResults: false}
            })
          })
        } catch (error) {
          this.setState({ error: error.message })
        }
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  handleRegister = (name, surname, email, password) => {
    try {
      registerUser(name, surname, email, password, error => {
        if (error) return this.setState({ error: error.message })
        this.setState({
          view: 'RegisterSuccess',
          error: { city: false, noResults: false},
          user: name
          })
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  handleGoToRegister = () => {
    this.setState({ view: 'register', error: undefined })
  }

  handleGoToLogin = () => {
    this.setState({ view: 'login', error: undefined })
  }


  handleBack = () => {
    this.setState({
      ...this.state,
      view: this.state.isLanding ? 'landing' : this.state.isDetail ? 'detail': 'results' ,
      user: name,
      error: { city: false, noResults: false}
    })
  }

  handleBackToResult = () => {
    this.handleRestaurants(this.state.city, this.state.query)
    this.setState({
      view: this.state.isFavorite ? 'favorites' : 'results',
      isDetail: false,
      error: { city: false, noResults: false}
    })
  }

  handleRestaurants = (city, query) => {
    const { id, token } = sessionStorage
    searchRestaurants(city, query, id, token, (error, results) => {
      if (error) {
        this.setState({
          ...this.state,
          view: 'feedback'
        })
      } else {
        this.setState({
          ...this.state,
          isLanding: false,
          view: results.length !== 0 ? 'results' : 'feedback',
          restaurants: results,
          isDetail: false,
          isFavorite: false,
          error: { city: false, noResults: false},
          city,
          query
        })
      }
    })
  }

  paintHeartsFav(id) {
    let allRestaurants = [...this.state.restaurants, ...this.state.favorites]
    if(this.state.restaurant && !allRestaurants.includes(this.state.restaurant)) allRestaurants = [...allRestaurants, this.state.restaurant]

    allRestaurants.forEach(restaurant => {
      if (restaurant.id === id && !restaurant.isFav) {
        restaurant.isFav = true;
      } else if (restaurant.id === id && restaurant.isFav) {
        restaurant.isFav = false;
      }
      this.setState({
        ...this.state
      })
    })
  }

  handleFavorite = (idItem) => {
    const { id, token } = sessionStorage
    this.paintHeartsFav(idItem)
    toggleFavs(id, token, idItem, (error, result) => {})
  }

  handleLogout = () => {
    sessionStorage.clear()
    this.setState({
      ...this.state,
      user: undefined,
      view: 'landing',
      isLanding: true,
      isDetail: false,
      isFavorite: false
    })
  }

  handleDetail = (restId) => {
    searchRestaurantDetail(restId, (error, restaurant) => {
      this.setState({
        view: 'detail',
        restaurant,
        restId,
        isDetail: true,
        error: { city: false, noResults: false }
      })
    })
  }

  handleRetrieveFavorites = () => {
    const { id, token } = sessionStorage
    try {
      retrieveFavs(id, token, (error, favs) => {
        if (error) return this.setState({ error: error.message })
          favs.forEach(fav => {
            fav.isFav = true
          })
          this.setState({
            ...this.state,
            view: favs.length !== 0 ? 'favorites' : 'feedback',
            favorites: favs,
            isFavorite: true,
            error: { city: false, noResults: 'favorites'}
          })
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  validateInputs = (city, criteria) => {
    if(city === '') {
      this.setState({
        ...this.state,
        error: {
          city: city === '' ? true : false,
        }
      })
    } else {
      this.handleRestaurants(city, criteria)
    }
  }

  render() {
    const { state: { view, restaurants, user, favorites, restaurant }, handleRegister, handleLogin, handleBack, handleGoToRegister, handleGoToLogin, handleFavorite, handleLogout, handleRetrieveFavorites, handleDetail, validateInputs, handleBackToResult } = this

    return (
      <div className='main-container'>
      { view === 'RegisterSuccess' && <RegisterSuccess user={user} onLogin={handleGoToLogin}/> }
      { view === 'landing' && <Landing onBack={handleLogout} user={user} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onFavorites={handleRetrieveFavorites} validateInputs={validateInputs} error={this.state.error.city}/>}
      { (view === 'feedback' || view === 'results' || view === 'favorites' || view === 'detail') && <Search onBack={handleLogout} user={user} onLogin={handleGoToLogin} onRegister={handleGoToRegister} onFavorites={handleRetrieveFavorites} validateInputs={validateInputs} error={this.state.error.city} /> }
      { view === 'login' && <Login onLogin={handleLogin} onBack={handleBack} onRegister={handleGoToRegister}/> }
      { view === 'register' && <Register onRegister={handleRegister} onBack={handleBack}/> }
      { view === 'results' && <Results restaurants={restaurants} handleFavorite={handleFavorite} handleDetail={handleDetail}/>}
      { view === 'favorites' && <Results view={view} restaurants={favorites} handleFavorite={handleFavorite} handleDetail={handleDetail} />}
      { view === 'detail' && <Detail restaurant={restaurant} handleFavorite={handleFavorite} onBack={handleBackToResult} />}
      { view === 'feedback' && <Feedback error={this.state.error.noResults}/>}
      { (view !== 'landing' && view !== 'login' && view !== 'register' && view !== 'RegisterSuccess') && <Footer/>}
      </div>
    )
  }
}
