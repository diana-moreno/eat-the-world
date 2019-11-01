function Results({ restaurants, handleFavorite, view, handleDetail}) {
  return(
    <section className="container">
      {view === 'favorites' ?
        <h1 className='favorites-title'>Your favorite restaurants</h1> : null
      }
      <ul className="results">
      {restaurants && restaurants.map((restaurant) => (
        <ResultsItem key={restaurant.id} restaurant={restaurant} handleFavorite={handleFavorite} handleDetail={handleDetail}/>
        ))
      }
      </ul>
    </section>
  )
}
