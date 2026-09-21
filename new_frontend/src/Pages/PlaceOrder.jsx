import React, { useContext } from 'react'
import Title from '../Components/Title'
import { ShopContext } from '../Context/ShopContext';

const PlaceOrder = () => {
  const {getTotalCartAmount} = useContext(ShopContext);

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-top'>
        {/* -----------left side---------- */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px] pl-10'>

            <div className='text-xl sm:text-2xl my-3'>
                <Title text1 ={'DELIVERY'} text2 ={'INFORMATION'}/>
            </div>
            <div className='flex gap-3'>
              <input className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
              <input className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
            </div>
            <input className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Adress' />
            <input className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Street' />
            <div className='flex gap-3'>
              <input className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
              <input className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Town' />
            </div>
            <div className='flex gap-3'>
              <input className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
              <input className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
            </div>
            <input className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
        </div>

        {/* ---------------------Right Side----------------- */}
        <div className='mt-8'>

          <div className='mt-8 min-w-120 pr-50'>
            <Title text1 ={'Cart'} text2 ={'Totals'}/>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
          </div>
        </div>
    </div>
  )
}

export default PlaceOrder