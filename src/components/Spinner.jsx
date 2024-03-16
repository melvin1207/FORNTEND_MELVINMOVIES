import { PacmanLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div className='spinner'>
      <PacmanLoader color='rgb(19, 150, 50)' loading/>
    </div>
  )
}

export default Spinner