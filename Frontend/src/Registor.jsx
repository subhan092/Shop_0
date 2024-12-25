import React from 'react'

const Registor = () => {
  return (
    <div className="flex justify-center items-center h-screen   bg-gray-200">
    <div className="bg-white flex  flex-col gap-6 rounded-lg shadow-lg px-28 py-16  ">
       <div className="text-4xl font-bold text-center text-slate-700"><h1>Registor</h1></div>
       <div>
         <input className="pr-28 py-3 text-base   text-start  outline-none rounded-md border-2 border-gray-500" type="email" placeholder="enter your name" />
       </div>
       <div>
         <input className="pr-28 py-3 text-base   text-start  outline-none rounded-md border-2 border-gray-500" type="email" placeholder="enter your email" />
       </div>
       <div>
         <input className="pr-28 py-3 text-base   text-start  outline-none rounded-md border-2 border-gray-500" type="password"placeholder="*************" />
       </div>
       <div>
       <button className="text-white bg-black font-medium rounded-md py-4 w-full">Regsitor </button>
       </div>
       <p>Already have  Acoount  <a className="underline text-blue-500" href="./App.jsx">Login</a> </p>
     </div>
    </div>
  )
}

export default Registor
