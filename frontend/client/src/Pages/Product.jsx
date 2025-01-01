// import React, { useContext } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import { useParams } from 'react-router-dom';
// import Breadcrum from '../Components/Breadcrums/Breadcrum';
// import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
// import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
// import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

// const Product = () => {
//   const {all_product} = useContext(ShopContext)
//   const {productId} = useParams();
//   // The productId here must exactly match :productId in the route definition (in App.js). If you name the parameter differently (e.g., :ProductId or :id), then you must match that name when destructuring from useParams.
//   const product = all_product.find((e) => e.id === Number(productId))
//   return (
//     <div>
//       <Breadcrum product={product}/>
//       <ProductDisplay product={product}></ProductDisplay>
//       <DescriptionBox/>
//       <RelatedProducts/>

//     </div>
//   )
// }

// export default Product









import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const {all_product} = useContext(ShopContext)
  const {productId} = useParams();
  // The productId here must exactly match :productId in the route definition (in App.js). If you name the parameter differently (e.g., :ProductId or :id), then you must match that name when destructuring from useParams.
  const product = all_product.find((e) => e.id === Number(productId))
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}></ProductDisplay>
      <DescriptionBox/>
      <RelatedProducts/>

    </div>
  )
}

export default Product