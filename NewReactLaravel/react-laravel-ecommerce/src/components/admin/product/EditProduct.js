import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';

function EditProduct(props) {
    const history = useHistory();
    const [categorylist, setCategorylist] = useState([])
    const [error_list, setError] = useState([])
    const [loading, setLoading] = useState(true);
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
    })

    const handleInput = (e) => {
        e.persist()
        setProduct({ ...productInput, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        window.s = e.target.files[0]
        console.log(window.s)
    }
    const [allCheckBox, setCheckBoxes] = useState([])
    const handleCheckBox = (e) => {
        e.persist();
        setCheckBoxes({ ...allCheckBox, [e.target.name]: e.target.checked })
    }



    useEffect(() => {
        axios.get(`/api/all-category`).then(res => {
            if (res.data.status === 200) {
                setCategorylist(res.data.category)
            }
        })

        const product_id = props.match.params.id;

        axios.get(`/api/edit-product/${product_id}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product);
                setCheckBoxes(res.data.product)
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                history.push('/admin/view-product');
            }
            setLoading(false)
        })
    }, [props.match.params.id, history])

    const submitProduct = (e) => {
        e.preventDefault();
        const product_id = props.match.params.id;
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
        formData.append('featured', allCheckBox.featured ? '1' : '0')
        formData.append('popular', allCheckBox.popular ? '1' : '0')
        formData.append('status', allCheckBox.status ? '1' : '0')

        axios.post(`/api/update-product/${product_id}`, formData, config).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, 'success')
                setError([])
                console.log(allCheckBox)
                history.push('/admin/view-product')

            } else if (res.data.status === 422) {
                swal("All Fields Must Be Filled", ' Error', 'warning')
                setError(res.data.errors)
            } else if (res.data.status === 404) {
                swal('Error', res.data.message, 'warning');
                history.push('/admin/view-product')
            }
        })
    }

    if (loading) {
        return <h4>Product Data Loading ....</h4>
    }
    return (
        <div className='conatiner px-4'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h4>Edit Product
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
                                    <textarea name='description' onChange={handleInput} value={productInput.description || ''} className='form-control' />
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
                                    <textarea name='meta_keyword' onChange={handleInput} value={productInput.meta_keyword || ''} className='form-control' />
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Meta Description</label>
                                    <textarea name='meta_description' onChange={handleInput} value={productInput.meta_description || ''} className='form-control' />
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
                                        <img src={`http://localhost:8000/${productInput.image}`} width={'50px'} />
                                        <small className='text-danger'>{error_list.image}</small>
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Featured (Checked = Shown) </label>
                                        <input type="checkbox" name='featured' onChange={handleCheckBox} defaultChecked={allCheckBox.featured === 1 ? true : false} className='w-50 h-50' />
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Popular (Checked = Shown)</label>
                                        <input type="checkbox" name='popular' onChange={handleCheckBox} defaultChecked={allCheckBox.popular === 1 ? true : false} className='w-50 h-50' />
                                    </div>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Status (Checked = Hidden)</label>
                                        <input type="checkbox" name='status' onChange={handleCheckBox} defaultChecked={allCheckBox.status === 1 ? true : false} className='w-50 h-50' />
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

export default EditProduct