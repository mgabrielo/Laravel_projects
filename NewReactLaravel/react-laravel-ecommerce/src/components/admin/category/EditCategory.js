import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const EditCategory = (props) => {
    const [categoryInput, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState([]);
    const history = useHistory();
    const handleInput = (e) => {
        e.persist()
        setCategory({ ...categoryInput, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const category_id = props.match.params.id
        axios.get(`/api/edit-category/${category_id}`).then(res => {
            if (res.data.status === 200) {
                setLoading(false);
                setCategory(res.data.category)
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error")
                history.push('/admin/view-category')
            }
        })
    }, [props.match.params.id])

    const updateCategory = (e) => {
        e.preventDefault();
        const category_id = props.match.params.id;
        const data = categoryInput
        axios.put(`/api/update-category/${category_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, 'success')
                setErr([])
            } else if (res.data.status === 422) {
                swal("All Fields must be Filled", '', 'error')
                setErr(res.data.errors)
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, 'error')
                history.push('admin/view-category')
            }
        })
    }

    if (loading) {
        return <h4>Edit Category Loading ....</h4>
    }

    return (
        <div className='container-fluid px-4'>
            <h1 className='mt-4'>Edit Category
                <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end" >Back</Link>
            </h1>
            <form onSubmit={updateCategory}>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                            type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags-tab-pane"
                            type="button" role="tab" aria-controls="seotags-tab-pane" aria-selected="false">Seo Tags</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane card-body border fade show active px-3 py-3" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                        <div className='form-group mb-3'>
                            <label>Slug</label>
                            <input type="text" name='slug' onChange={handleInput} value={categoryInput.slug} className='form-control' />
                            {/* <span>{categoryInput.error_list.slug}</span> */}
                            <small className='danger'>{err.slug}</small>
                        </div>
                        <div className='form-group mb-3'>
                            <label>Name</label>
                            <input type="text" name='name' onChange={handleInput} value={categoryInput.name} className='form-control' />
                            {/* <span>{categoryInput.error_list.name}</span> */}
                            <small className='danger'>{err.name}</small>
                        </div>
                        <div className='form-group mb-3'>
                            <label>Description</label>
                            <textarea name='description' onChange={handleInput} value={categoryInput.description || ''} className='form-control' />
                        </div>
                        <div className='form-group mb-3'>
                            <label>Status</label>
                            <input type="checkbox" name='status' onChange={handleInput} value={categoryInput.status} /> Status Shown-0 | Hidden-1
                        </div>
                    </div>
                    <div className="tab-pane card-body border fade  px-3 py-3" id="seotags-tab-pane" role="tabpanel" aria-labelledby="seotags-tab" tabIndex="0">

                        <div className='form-group mb-3'>
                            <label>Meta Title</label>
                            <input type="text" name='meta_title' onChange={handleInput} value={categoryInput.meta_title || ''} className='form-control' />
                            {/* <span>{categoryInput.error_list.meta_title}</span> */}4
                            <small className='danger'>{err.meta_title}</small>
                        </div>
                        <div className='form-group mb-3'>
                            <label>Meta Keywords</label>
                            <textarea name='meta_keyword' onChange={handleInput} value={categoryInput.meta_keyword || ''} className='form-control' />
                        </div>
                        <div className='form-group mb-3'>
                            <label>Meta Description</label>
                            <textarea name='meta_description' onChange={handleInput} value={categoryInput.meta_description || ''} className='form-control' />
                        </div>
                    </div>

                </div>

                <button type='submit' className='btn btn-primary px-4 mt-3 float-end'>Update</button>
            </form>

        </div>
    )
}

export default EditCategory