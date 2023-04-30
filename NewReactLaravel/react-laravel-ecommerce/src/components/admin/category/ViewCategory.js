import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

const ViewCategory = () => {
  const [loading, setLoading] = useState(true)
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    axios.get('/api/view-category').then(res => {
      if (res.status === 200) {
        console.log(res.data.category)
        setCategoryList(res.data.category)
      }
      setLoading(false)
    })
  }, [])

  const deleteCategory = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Deleting'

    axios.delete(`/api/delete-category/${id}`).then(res => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, 'success')
        thisClicked.closest('tr').remove()
      } else if (res.data.status === 404) {
        swal("Error", res.data.message, 'error')
        thisClicked.innerText = "Delete"
      }
    })
  }

  var view_Category_HTMLTABLE = ""
  if (loading) {
    return <h4>Loading Category...</h4>
  } else {
    view_Category_HTMLTABLE =
      categoryList.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.slug}</td>
            <td>{item.status}</td>
            <td>
              <Link to={`edit-catgeory/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
            </td>
            <td>
              <button type='button' onClick={(e) => deleteCategory(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        )
      })
  }

  return (
    <div className='conatiner px-4'>
      <div className='card mt-4'>
        <div className='card-header'>
          <h4>Category List
            <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Add Category</Link>
          </h4>
        </div>
        <div className='card-body'>
          <table className='table table-bordered table-striped text-center' >
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {view_Category_HTMLTABLE}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default ViewCategory