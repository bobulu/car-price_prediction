import React,{useId,forwardRef} from 'react'

const Input=forwardRef(function Input({
    lable,
    type="text",
    className="",
    ...props
},ref){
    const Id =useId()
    return(
        <div className='w-full'>
               {lable && <lable className="inline-block mb-2 pl-2 " htmlFor={id}>
                {lable} 
                </lable>}
                <input type={type} className={`px-4 py-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref} id={Id} {...props}/>
        </div> 
       

    )
})


export default Input
