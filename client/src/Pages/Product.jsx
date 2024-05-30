import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import Breadcrum from '../Components/Breadcrum/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'

export default function Product() {
  const {all_products} = useContext(ShopContext)
  const {productId} = useParams()
  const product = all_products.find((element)=> element.id === Number(productId))
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
    </div>
  )
}
