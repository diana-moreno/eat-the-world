const { Component } = React

class RegisterSuccess extends Component {
  state = {
    timer: 10
  }

  componentWillMount() {
    this.timer()
  }

  timer() {
    let time = 10
    let timeout = setInterval(() => {
      if (time > 1) {
        time--
        this.setState({
          timer: time
        })
      } else {
        clearInterval(timeout)
        this.props.onLogin()
      }
    }, 1000);
  }

  render() {
    return (
      <section className="register">
        <form className='register__form'>
          <h1 className='register__confirmation-greeting'>Welcome, {this.props.user}!</h1>
          <h2>You have registered sucesfully</h2>
          <h3>Redirecting to login in... {this.state.timer}</h3>
        </form>
    </section>
    )
  }
}
