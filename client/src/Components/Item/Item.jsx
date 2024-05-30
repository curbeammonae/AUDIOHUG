import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

export default function Item(props) {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img src={props.image} />
      </Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <span>{props.price}</span>
        </div>
    </div>
  )
}
