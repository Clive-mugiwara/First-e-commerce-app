import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import './CSS/PlaceOrder.css'
import { ShopContext } from '../Context/ShopContext';
import paystack_img from '../assets/paystack-img2.png'
import CartTotal from '../Components/CartTotal';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const backendUrl = import.meta.env.VITE_BACKEND_URL;
// const backendUrl = import.meta.env.N_BACKEND_URL;

const PlaceOrder = () => {

  const [method,setMethod] = useState('cod');
  const {token,cartItems,setCartItems,navigate,getTotalCartAmount,all_product} = useContext(ShopContext);
  const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    town:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({...data,[name]:value}))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {

      let orderItems = []
      
      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          const itemInfo = structuredClone(
            all_product.find((product) => product.id === Number(items)));
          if (itemInfo) {
            itemInfo.quantity = cartItems[items];
            orderItems.push(itemInfo);
          }
        }
      }
      
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalCartAmount()
      }

      switch(method) {

        //Api calls for cod
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{'auth-token': token}})
          console.log(response.data);
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }

        break;

        default:
          break;
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-top'>
        {/* -----------left side---------- */}
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px] pl-10'>

            <div className='text-xl sm:text-2xl my-3'>
                <Title text1 ={'DELIVERY'} text2 ={'INFORMATION'}/>
            </div>
            <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
              <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
            </div>
            <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Adress' />
            <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
            <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
              <input required onChange={onChangeHandler} name='town' value={formData.town} className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Town' />
            </div>
            <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
              <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
            </div>
            <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-30 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Phone' />
        </div>

        {/* ---------------------Right Side----------------- */}
        <div className='mt-8'>

          <div className='mt-8 min-w-120 pr-50'>
            <CartTotal/>
          </div>


          <div className='pt-9'>
            <Title text1={'PAYMENT'} text2={'METHOD'}/>
            {/* ------Payment method selection------------- */}
            <div className='flex gap-3 flex-col lg:flex-row pt-2'>
              <div onClick={()=>setMethod('paystack')} className='flex items-center gap-2 border py-0 px-2 cursor-pointer' >
                <p className={`min-w-3 h-3 border rounded-full ${method === 'paystack' ? 'bg-green-400' : ''}`}></p>
                <img className='paystack-logo' src={paystack_img} alt="" />
              </div>
              <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border py-0 px-2 cursor-pointer'>
                <p className={`min-w-3 h-3 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>

            <div className='w-full text-end mt-8 pr-44 pt-8'>
              <button type='submit' className='bg-black  text-white px-16 py-3 text-sm'>Place Order</button>
            </div>
          </div>
        </div>
    </form>
  )
}

export default PlaceOrder