function Feedback({error}) {
  let message = error === 'favorites' ? 'No favorites added yet' : 'No results found for this search'
  return (
    <div className='feedback'>
      <p className='feedback__message'>{message}</p>
    </div>
  )
}
