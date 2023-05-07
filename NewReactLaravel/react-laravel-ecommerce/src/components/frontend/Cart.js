import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import swal from 'sweetalert'


export default function Cart() {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    var totalCartPrice =0;
    var discount =0;

    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal('Warning', 'Sign In to View Cart', 'warning')
    }

    useEffect(() => {
        axios.get(`/api/cart`).then(async (res) => {

            if (res.data.status === 200) {
                setCart(res.data.cart);
                // console.log(res.data.cart)
                setLoading(false);
            } else if (res.data.status === 401) {
                history.push('/collections')
                swal("Warning", res.data.message, 'error')
            }
        })
    }, [history])


    const handleDecrement =(cart_id)=>{
        setCart(cart =>  cart.map((item)=> cart_id === item.id ?
         {...item, product_qty: item.product_qty -(item.product_qty> 1 ? 1: 0)} : item)) 
         updateCartQty(cart_id,"dec")
    }
    
    const handleIncrement =(cart_id)=>{
        setCart(cart =>  cart.map((item)=> cart_id === item.id ?
         {...item, product_qty: item.product_qty +(item.product_qty < 10 ? 1: 0)} : item)) 
         updateCartQty(cart_id,"inc")
        }
    
   
    function updateCartQty(cart_id, scope){
        axios.put(`/api/cart-update-quantity/${cart_id}/${scope}`).then(res=>{
                if(res.data.status === 200){
                    swal("Sucess", res.data.message, 'success')
                }
        });
    }

    const deleteCartItem =(e, cart_id)=>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText ="Removing";
        axios.delete(`/api/delete-cart-item/${cart_id}`).then(res=>{
            if(res.data.status === 200){
                swal("Sucess", res.data.message, 'success');
                thisClicked.closest("tr").remove();
            }else if(res.data.status === 401 || res.data.status === 404){
                swal("warning", res.data.message, 'warning');
                thisClicked.innerText ="Remove";
            }
        })
    }

    if (loading) {
        return <h4>Loading Product Details...</h4>
    } 

    var cart_HTML = ``;
    if(cart.length > 0){
        cart_HTML=
        <div className='table-responsive'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Quantity</th>
                        <th className='text-center'>Total Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item)=>{
                        totalCartPrice += item.product.selling_price * item.product_qty;
                        discount =parseInt(totalCartPrice * 0.15)
                    return(
                    
                    <tr key={item.id}>
                        <td width={'10%'}> 
                            <img src={`http://localhost:8000/${item.product?.image}`} alt={item.product?.name} width={'px'} height={'50px'} />
                        </td>
                        <td>{item.product?.name}</td>
                        <td width={'15%'} className='text-center'>${item.product?.selling_price}</td>
                        <td width={'15%'}>
                        <div className='input-group'>
                            <button type='button' className='input-group-text' onClick={()=>handleDecrement(item.id)}>-</button>
                            <div className='form-control text-center'>{item.product_qty}</div>
                            <button type='button' className='input-group-text' onClick={()=>handleIncrement(item.id)}>+</button>
                        </div>
                        </td>
                        <td width={'15%'} className='text-center'>${item.product?.selling_price * item.product_qty}</td>
                        <td width={'10%'} className='text-center'>
                            <button type='button' className='btn btn-danger btn-sm' onClick={(e)=>deleteCartItem(e, item.id)}>Remove</button>
                        </td>
                    </tr>
                                
                    )
                })}
                </tbody>
            </table>
            </div>
    }else{
        <div className='card card-body py-5 text-center shadow-sm'>
            <h4>Cart is Empty</h4>
        </div>
    }

    return (
    <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Home / Cart</h6>
                </div>
            </div>
            <div className='py-3 '>
                <div className='container'>
                 <div className='row'>
                    <div className='col-md-12'>
                    {cart_HTML}

                    <div className='col-md-8'>
                    <div className='cold-md-4'>
                        <div className='card card-body mt-3'>
                            <h4>Discount(15%):
                                <span className='float-end'>${discount}</span>
                            </h4>
                            <h4>Grand-Total:
                                <span className='float-end'>${totalCartPrice - discount}</span>
                            </h4>
                            <hr />
                            <Link to="#" className="btn btn-primary">CheckOut</Link>
                        </div>
                    </div>
                    </div>
                    </div>         
                </div>
            </div>
        </div>
    </div>    
  )
}
