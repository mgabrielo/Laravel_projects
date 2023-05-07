import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import swal from 'sweetalert'

export default function ProductDetail(props) {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const category_slug = props.match.params.category;
        const product_slug = props.match.params.product;

        axios.get(`/api/viewproductdetail/${category_slug}/${product_slug}`).then(async (res) => {

            if (res.data.status === 200) {
                setProduct(res.data.product)
                console.log(res.data.product)
                setLoading(false);
            } else if (res.data.status === 404) {
                history.push('/collections')
                swal("Warning", res.data.message, 'error')
            }
        })
    }, [history, props.match.params.product, props.match.params.category])

    function handleDecrement() {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1)
        }
    }
    function handleIncrement() {
        if (quantity < 10) {
            setQuantity(prevCount => prevCount + 1)
        }
    }

    const AddToCart = (e) => {
        e.preventDefault();
        const data = {
            product_id: product.id,
            product_qty: quantity,
        }
        axios.post(`/api/add-to-cart`, data).then(res => {
            if (res.data.status === 201) {
                swal('Success', res.data.message, 'success')
            } else if (res.data.status === 409) {
                swal("Warning", res.data.message, 'warning')
            } else if (res.data.status === 401) {
                swal("Error", res.data.message, 'error')
            } else if (res.data.status === 404) {
                swal("Warning", res.data.message, 'warning')
            }
        });
    }

    if (loading) {
        return <h4>Loading Product Details...</h4>
    } else {
        var available_stock = '';
        if (product.qty > 0) {
            available_stock =
                <div>
                    <label className='btn-sm btn-success px-4 mt-2'>In stock</label>
                    <div className='row'>
                        <div className='col-md-3 mt-3'>
                            <div className='input-group'>
                                <button type='button' onClick={handleDecrement} style={{ fontSize: 20 }} className='input-group-text'>-</button>
                                <div type='text' className='form-control text-center'>{quantity}</div>
                                <button type='button' onClick={handleIncrement} style={{ fontSize: 20 }} className='input-group-text'>+</button>
                            </div>
                        </div>

                        <div className='col-md-3 mt-3'>
                            <button type='button' className='btn btn-primary w-100' onClick={AddToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>

        } else {
            available_stock =
                <div>
                    <label className='btn-sm btn-danger px-4 mt-2'>Out Of Stock</label>
                </div>
        }
    }




    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Category / {product?.category?.name} / {product?.name}</h6>
                </div>
            </div>
            <div className='py-3 '>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 border-end'>
                            <img src={`http://localhost:8000/${product.image}`} alt={product.name} className='w-100' />
                        </div>

                        <div className='col-md-8'>
                            <h4>
                                {product.name}
                                <span className='float-end  badge btn-sm btn-danger badge-pill'>{product.brand}</span>
                            </h4>
                            <p>{product.description}</p>
                            <h4 className='mb-1'>$ {product.selling_price}</h4>
                            <div>

                                {available_stock}
                            </div>

                            <button type='button' className='btn btn-danger mt-3'>Add to Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
