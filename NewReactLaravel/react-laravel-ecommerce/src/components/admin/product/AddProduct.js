import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function AddProduct() {
    const [categorylist, setCategorylist] = useState([])
    const [error_list, setError] = useState([])
    const [productInput, setProduct] = useState({
        category_id: '',
        slug: '',
        name: '',
        description: '',
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        selling_price: '',
        original_price: '',
        qty: '',
        brand: '',
        featured: '',
        popular: '',
        status: '',
    })
    const [picture, setPicture] = useState([])

    const handleInput = (e) => {
        e.persist()
        setProduct({ ...productInput, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] })
        window.s = e.target.files[0]
        console.log(window.s)
    }

    useEffect(() => {
        axios.get(`/api/all-category`).then(res => {
            if (res.data.status === 200) {
                setCategorylist(res.data.category)
            }
        })
    }, [])

    const submitProduct = (e) => {
        e.preventDefault();

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        const formData = new FormData();
        formData.append('image', window.s)
        formData.append('category_id', productInput.category_id)
        formData.append('slug', productInput.slug)
        formData.append('name', productInput.name)
        formData.append('description', productInput.description)
        formData.append('meta_title', productInput.meta_title)
        formData.append('meta_keyword', productInput.meta_keyword)
        formData.append('meta_description', productInput.meta_description)
        formData.append('selling_price', productInput.selling_price)
        formData.append('original_price', productInput.original_price)
        formData.append('qty', productInput.qty)
        formData.append('brand', productInput.brand)
        formData.append('featured', productInput.featured)
        formData.append('popular', productInput.popular)
        formData.append('status', productInput.status)

        axios.post('/api/store-product', formData, config).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, 'success')
                setError([])
                setProduct({
                    ...productInput,
                    category_id: '',
                    slug: '',
                    name: '',
                    description: '',
                    meta_title: '',
                    meta_keyword: '',
                    meta_description: '',
                    selling_price: '',
                    original_price: '',
                    qty: '',
                    brand: '',
                    featured: '',
                    popular: '',
                    status: '',
                })
                window.location.reload();

            } else if (res.data.status === 422) {
                swal("All Fields Must Be Filled", ' Error', 'warning')
                setError(res.data.errors)
            }
        })
    }


    return (
        <div className='conatiner px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>Add Product
                        <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                    </h4>
                </div>
                <div className='card-body'>
                    <form onSubmit={submitProduct} encType='multipart/form-data'>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags-tab-pane"
                                    type="button" role="tab" aria-controls="seotags-tab-pane" aria-selected="false">Seo Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails-tab-pane"
                                    type="button" role="tab" aria-controls="otherdetails-tab-pane" aria-selected="false">Other Details</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">

                                <div className='form-group mb-3'>
                                    <label>Select Category</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} id="form-contol">
                                        <option>Select Category</option>
                                        {
                                            categorylist.map((item) => {
                                                return (

                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }

                                    </select>
                                    <small className='text-danger'>{error_list.category_id}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Slug</label>
                                    <input type="text" name='slug' onChange={handleInput} value={productInput.slug} className='form-control' />
                                    <small className='text-danger'>{error_list.slug}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Name</label>
                                    <input type="text" name='name' onChange={handleInput} value={productInput.name} className='form-control' />
                                    <small className='text-danger'>{error_list.name}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Description</label>
                                    <textarea name='description' onChange={handleInput} value={productInput.description} className='form-control' />
                                </div>

                            </div>
                            <div className="tab-pane card-body border fade" id="seotags-tab-pane" role="tabpanel" aria-labelledby="seotags-tab" tabIndex="0">

                                <div className='form-group mb-3'>
                                    <label>Meta Title</label>
                                    <input type="text" name='meta_title' onChange={handleInput} value={productInput.meta_title} className='form-control' />
                                    <small className='text-danger'>{error_list.meta_title}</small>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Meta Keywords</label>
                                    <textarea name='meta_keyword' onChange={handleInput} value={productInput.meta_keyword} className='form-control' />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Meta Description</label>
                                    <textarea name='meta_description' onChange={handleInput} value={productInput.meta_description} className='form-control' />
                                </div>

                            </div>

                            <div className="tab-pane card-body border fade" id="otherdetails-tab-pane" role="tabpanel" aria-labelledby="otherdetails-tab" tabIndex="0">
                                <div className='row'>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Selling Price</label>
                                        <input type="text" name='selling_price' onChange={handleInput} value={productInput.selling_price} className='form-control' />
                                        <small className='text-danger'>{error_list.selling_price}</small>
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Original Price</label>
                                        <input type="text" name='original_price' onChange={handleInput} value={productInput.original_price} className='form-control' />
                                        <small className='text-danger'>{error_list.original_price}</small>
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Quantity</label>
                                        <input type="text" name='qty' onChange={handleInput} value={productInput.qty} className='form-control' />
                                        <small className='text-danger'>{error_list.qty}</small>
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Brand</label>
                                        <input type="text" name='brand' onChange={handleInput} value={productInput.brand} className='form-control' />
                                        <small className='text-danger'>{error_list.brand}</small>
                                    </div>
                                    <div className='col-md-8 form-group mb-3'>
                                        <label>Image</label>
                                        <input type="file" name='image' onChange={handleImage} className='form-control' />
                                        <small className='text-danger'>{error_list.image}</small>
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Featured (Checked = Shown) </label>
                                        <input type="checkbox" name='featured' onChange={handleInput} value={productInput.featured} className='w-50 h-50' />
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Popular (Checked = Shown)</label>
                                        <input type="checkbox" name='popular' onChange={handleInput} value={productInput.popular} className='w-50 h-50' />
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Status (Checked = Hidden)</label>
                                        <input type="checkbox" name='status' onChange={handleInput} value={productInput.status} className='w-50 h-50' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary mt-2 px-4'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct