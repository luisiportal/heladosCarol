import React from 'react'
import ImagenPrincipal from './ImagenPrincipal'

const PrimerElemento = () => {
  return (
    <div className='flex justify-center'>
     <ImagenPrincipal/>
      <h2 className=' absolute top-48 font-inspiration text-4xl bordeFrase mx-5'>Ofrecemos un producto para el disfrute de su  familia.</h2>
    </div>
  )
}

export default PrimerElemento