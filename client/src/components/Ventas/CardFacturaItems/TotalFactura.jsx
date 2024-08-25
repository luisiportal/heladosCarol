import React from 'react'

const TotalFactura = ({total}) => {
  return (
   <div className='bg-neutral-300 w-2/5 rounded-xl p-2 flex flex-col  justify-center items-center'> <h2 >Total </h2>
   <h2 >{total} USD</h2>
   
   
   
   </div>
  )
}

export default TotalFactura