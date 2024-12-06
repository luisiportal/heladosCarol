import React from 'react'

const SocialBTN = ({redSocial,link,text, image}) => {
  return (
    <a href={`${link}`} target="_blank"> <img className='w-8 h-8' src={`${image}`} alt={`${redSocial}`}  /></a>
  )
}

export default SocialBTN
