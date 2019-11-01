function Detail({ restaurant, handleFavorite, onBack }) {
  return (
    <section className='detail'>
      <div className='detail__main-container'>
        {sessionStorage.token && <i className={restaurant.isFav
          ? "detail__favorite fas fa-heart"
          : 'detail__favorite far fa-heart'}
          onClick={event => {
            event.preventDefault()
            event.stopPropagation()
            handleFavorite(restaurant.id)
          }}></i>}
        <h1 className='detail__title'>{restaurant.name}</h1>
        <div className='detail__header-container'>
          <img className="detail__img" src={restaurant.featured_image} />
          <p className='detail__puntuation'>{restaurant.user_rating.aggregate_rating}</p>
        </div>
        <div className='detail__columns-container'>
          <div className='detail__column-container'>
            <h2 className='detail__detail-title'>Cuisine type</h2>
            <p className='detail__cuisine'>{restaurant.cuisines}</p>
            <h2 className='detail__detail-title'>Adress</h2>
            <p className='detail__direction'>{restaurant.location.address}</p>
            <h2 className='detail__detail-title'>Phone</h2>
            <p className='detail__telephone'>{restaurant.phone_numbers}</p>
          </div>
          <div className='detail__column-container'>
            <h2 className='detail__detail-title'>Average cost for two</h2>
            <p className='detail__price'>{restaurant.costcurrency}</p>
            <h2 className='detail__detail-title'>Establishment</h2>
            <p className='detail__web' href="">{restaurant.establishment}</p>
            <h2 className='detail__detail-title'>Business hours</h2>
            <p className='detail__time'>{restaurant.timings}</p>
          </div>
          <div className='detail__column-container detail__featured'>
            <h2 className='detail__detail-title'>Highlights</h2>
            <p>{restaurant.highlights[0]}</p>
            <p>{restaurant.highlights[1]}</p>
            <p>{restaurant.highlights[2]}</p>
            <p>{restaurant.highlights[3]}</p>
            <p>{restaurant.highlights[4]}</p>
            <p>{restaurant.highlights[5]}</p>
            <p>{restaurant.highlights[6]}</p>
            <p>{restaurant.highlights[7]}</p>
            <p>{restaurant.highlights[8]}</p>
          </div>
        </div>
        <a className="detail__button" href="#" onClick={event => {
          event.preventDefault()

          onBack()
        }}>
          <i className="fas fa-arrow-left" style={{color: '#5f5757'}}>Go back</i>
        </a>
      </div>
    </section>
  )
}
