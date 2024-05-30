import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import './CSS/ShopCategory.css'
import Item from '../Components/Item/Item'
const ShopCategory = (props) => {
  const {all_products} = useContext(ShopContext)
  return (
    <div className='shop-category'>
      <div className="shop-category-products">
      {all_products.map((item,i)=>{
          if(props.category === item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} />
          }
          else{
            return null;
          }
        })}
      </div>
    </div>
  )
}

export default ShopCategory;
