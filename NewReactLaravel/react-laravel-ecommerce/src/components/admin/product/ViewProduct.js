import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ViewProduct() {
    const [loading, setLoading] = useState([true])
    const [viewProduct, setProduct] = useState([])
    useEffect(() => {

        document.title = "View Product"

        axios.get('/api/view-product').then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.products)
                console.log(res.data.products)
                setLoading(false)
            }
        })
    }, [])

    var display_products = "";

    if (loading) {
        return <h4>Loading****</h4>
    } else {
        var product_status = ''
        display_products = viewProduct.map((item, i) => {
            if (item.status == 0) {
                product_status = 'Shown';
            } else if (item.status == 1) {
                product_status = 'Hidden';
            }
            return (
                <tr key={item.id} className='text-center'>
                    <td>{i + 1}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>${item.selling_price}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width={'50px'} alt='imgs' /></td>
                    <td><Link to={`edits-product/${item.id}`} className='btn btn-success btn-sm'>Edit</Link></td>
                    <td>
                        {product_status}
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className='card px-4 mt-3'>
            <div className='card-header'>
                <h4>View Product</h4>
                <Link to='/admin/add-product' className='btn btn-primary btn-sm float-end'>Add Product</Link>
            </div>
            <div className='card-body'>
                <div className='table-responsive'>
                    <table className='table table-bordered table-striped'>

                        <thead className='text-center'>
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Product Name</th>
                                <th>Selling Price</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {display_products}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct