import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const Navbar = () => {
    var AuthButtons = '';
    const history = useHistory();
    const logOutSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if (res.data.status === 200 || res.status === 403) {
                localStorage.removeItem('auth_token', res.data.token)
                localStorage.removeItem('auth_name', res.data.username);
                swal("Success", 'logout SucessFul', 'success');
                history.push('/login')
            }
        })
    }

    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="nav-link active" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/register">Register</Link>
                </li>
            </ul>
        );
    } else {

        AuthButtons = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <button type='button' onClick={logOutSubmit} className="nav-link btn btn-deafult btn-sm active">Logout</button>
                </li>
            </ul>
        );
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="#">Collection</Link>
                        </li>
                        {AuthButtons}
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar