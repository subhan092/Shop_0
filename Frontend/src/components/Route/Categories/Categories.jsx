import React from 'react'
import styles from '../../../styles/styles'
import { brandingData, categoriesData } from '../../../static/data'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const  navigate = useNavigate();
  return (
    <>
    <div className={`${styles.section } bg-white  my-12 rounded-md shadow-md flex`  }>
        {
            brandingData && brandingData.map((item,index)=>{
                return <div className="w-full py-4 flex gap-4 items-start" key={index}>
                      {item.icon}
                      <div className="flex flex-col gap-2 ">
                        <h1 className='text-base font-bold text-slate-500'>{item.title}</h1>
                         <p>{item.Description}</p>
                      </div>
                </div>
            })
        }
    </div>
  
      <div className={`${styles.section} bg-white  my-12 mb-12 rounded-lg shadow-md `}>
           <div  className=" grid grid-col-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mx-2">
            { 
                categoriesData && categoriesData.map((item,index)=>{
                      const handleSubmit = (i)=>{
                        navigate(`/products/category?${i.title}`)
                      }
                    return  <div onClick={()=>handleSubmit(item)} key={index} className="flex items-center  cursor-pointer ">
                       <h1 className='text-[1.2rem] font-bold text-slate-500'> {item.title}</h1>
                       <div className="w-[150px]"> <img className='w-full' src={item.image_Url} alt="" srcset="" /></div>
                    </div>
                })
            }
           </div>
      </div>
    </>
  )
}

export default Categories