import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import swal from 'sweetalert'

export default function ViewProduct(props) {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])

    const productCount = product.length;

    useEffect(() => {
        const product_slug = props.match.params.slug;
        axios.get(`/api/fetch-products/${product_slug}`).then((res) => {
            if (res.data.status === 200) {
                setProduct(res.data.product_data.product)
                setCategory(res.data.product_data.category)
                setLoading(false);
            } else if (res.data.status === 404) {
                // history.push('/collections')
                swal("Warning", res.data.message, 'error')
            } else if (res.data.status === 400) {
                history.push('/collections')
                swal("Warning", res.data.message, 'error')
            }
        })
    }, [history, props.match.params.slug])

    if (loading) {
        return <h4>Loading...</h4>
    } else {
        var showProductList = '';
        if (productCount) {
            showProductList = product.map((item, idx) => {
                return (
                    <div key={idx} className='col-md-3'>
                        <div className='card'>
                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                <img src={`http://localhost:8000/${item.image}`} className='w-100' alt={item.name} />
                            </Link>
                            <div className='card-body'>
                                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                                    <h5>{item.name}</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            showProductList =
                <div className='cold-md-12'>
                    <h4>No Product Available for {category.name}</h4>
                </div>
        }

    }

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Category / {category.name}</h6>
                </div>
            </div>
            <div className='py-3 '>
                <div className='container'>
                    <div className='row'>
                        {showProductList}
                    </div>
                </div>
            </div>
        </div>

    )
}
