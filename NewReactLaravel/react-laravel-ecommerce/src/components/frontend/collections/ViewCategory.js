import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function ViewCategory() {

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(`/api/getCategory`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
                setLoading(false)
            }
        })

    }, [])


    if (loading) {
        return <h4>Loading Categories...</h4>
    } else {
        var showCategoryList = '';
        showCategoryList = category.map((item) => {
            return (
                <div className='col-md-4' key={item.id}>
                    <div className='card'>
                        <Link to=''>
                            <img src='' className='w-100' alt={item.name} />
                        </Link>
                        <div className='body'>
                            <Link to={`/collections/${item.slug}`}>{item.name}</Link>
                        </div>
                    </div>
                </div>

            )
        })
    }

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Category</h6>
                </div>
            </div>
            <div className='py-3 '>
                <div className='container'>
                    <div className='row'>
                        {showCategoryList}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewCategory