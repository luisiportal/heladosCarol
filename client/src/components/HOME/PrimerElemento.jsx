import React from 'react'
import ImagenPrincipal from './ImagenPrincipal'

const PrimerElemento = () => {
  return (
    <div className='flex justify-center mt-10'>
 
      <h2 className=' flex font-irish text-xl bordeFrase border-spacing-14 mx-5'>Ofrecemos un producto para el disfrute de su  familia.</h2>
      <ImagenPrincipal/>
    </div>
  )
}

export default PrimerElemento