import React, { useState ,useEffect} from 'react'
import { productData } from '../../static/data';
import styles from '../../styles/styles';


const Events = () => {
    const [data, setData] = useState([]);
    // useEffect(() => {
    //     const d =
    //       productData && productData.filter((product) => product.category == "Mobile and Tablets");
    //     const One = d.slice(0, 1);
    
    //     setData(One);
     
    //   }, []);
    //   console.log(data[0]);
  return (
    <div className={`${styles.section}`}>
       <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
       </div>
          <div className="bg-white mb-4  flex flex-col md:flex-row  flex-1   rounded-md shadow-lg  justify-between items-center">
             <div className="w-[45%] h-[40%] "><img className='w-full  ' src='https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg' alt="" srcset="" /></div>
             <div className="flex w-[50%] pr-3 flex-col gap-4">
                <h1 className='text-2xl font-bold'>Iphone 14 pro max 256 gb ssd and 8 gb</h1>
                <p>  "Product details are a crucial part of any eCommerce website or online marketpzlace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",</p>
                <div className="py-2   flex items-center justify-between">
                        <div className="flex w-full gap-2">
                        <h5 className={`${styles.productDiscountPrice} text-2xl `}>1099$</h5>

                            <h4 className={`${styles.price} text-base`}>1599</h4>
                        </div>
                        <span className='font-[400]  text-blue-400 text-[20px]'> 82 Sold </span>
                    </div>
             </div>
          </div>
    </div>
  )
}

export default Events