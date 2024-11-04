import React from 'react'

function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
    <div className='w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
         <h1 className='text-3xl font-semibold text-center text-gray-300'>Signup

         <span className='text-blue-500'>  Chat App</span>
         </h1>
         <form action="">
         <div>
                <label htmlFor="" className='label p-2'>
                    <span className='text-base label-text'>FullName</span>
                </label>
                <input type="text" placeholder='FullName' className='w-full input input-bordered h-10' />
            </div>
            <div>
                <label htmlFor="" className='label p-2'>
                    <span className='text-base label-text'>Username</span>
                </label>
                <input type="text" placeholder='Username' className='w-full input input-bordered h-10' />
            </div>
            <div>
            <label htmlFor="" className='label p-2'>
                    <span className='text-base label-text'>Password</span>
                </label>
                <input type="password" placeholder=' Enter Password' className='w-full input input-bordered h-10' /> 
            </div>
            <a href='#' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                    Already Have  have an account?
                </a>
                <div>
                    <button className='btn btn-block btn-sm mt-2 border-slate-50-700'>Sign Up</button>
                </div>
                
         </form>
         
    </div>
  
</div>
  )
}

export default Signup
