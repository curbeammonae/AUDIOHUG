import React, { useContext } from 'react'
import './ProductDisplay.css'
import star from "../Assets/star_icon.png"
import stardull from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext';

export default function ProductDisplay(props) {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div>
                <img src={product.image} className="productdisplay-main-img" alt=''/>
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star} alt=''/>
                <img src={star} alt=''/>
                <img src={star} alt=''/>
                <img src={stardull} alt=''/>
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                ${product.price}
            </div>
            <div className="productdisplay-right-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias aliquam doloremque nemo distinctio deserunt provident, quo modi officiis, beatae similique quibusdam adipisci doloribus fugit sunt iure optio suscipit excepturi odio!
            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        </div>
    </div>
  )
}
