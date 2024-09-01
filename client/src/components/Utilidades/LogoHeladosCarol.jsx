import React from 'react'
import { Link } from 'react-router-dom'

const LogoHeladosCarol = () => {
  return (
    <div>
    <Link className="text-heladosCarol_color" to={"/"}>
      <div className="flex gap-4">
        <img
          className="w-12 h-12"
          src={"../images/logo.png"}
          alt="Logo Helados Carol"
        />
        <h1 className="text-white font-inspiration text-4xl font-normal sombraHeader">
          Helados Carol
        </h1>
      </div>
    </Link>
  </div>
  )
}

export default LogoHeladosCarol