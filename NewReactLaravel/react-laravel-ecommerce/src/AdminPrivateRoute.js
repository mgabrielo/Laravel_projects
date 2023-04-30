import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom';
import MasterLayout from './layouts/admin/MasterLayout';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
function AdminPrivateRoute({ ...rest }) {
    const history = useHistory()
    const [authenticated, setAuthenticated] = useState(false)
    const [Loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('/api/checkingAuthenticated').then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
            setLoading(false)
        })

        return () => {
            setAuthenticated(false)

        }
    }, [])

    axios.interceptors.response.use(
        undefined, function axiosRetryInterceptor(err) {
            if (err.response.status === 401) {
                swal("unAuthorized", err.response.data.message, "warning")
                history.push('/')
            }

            return Promise.reject(err)
        }
    );

    axios.interceptors.response.use(
        undefined, function axiosRetryInterceptor(error) {
            if (error.response.status === 403) {
                history.push('/403')
                swal("unAuthorized", 'forbidden', "warning")
                return Promise.reject(error)
            } else if (error.response.status === 404) {
                history.push('/404')
                swal("unAuthorized", 'page not found', "warning")
                return Promise.reject(error)
            }
        }
    );

    if (Loading) {
        return <h3>Loading...</h3>
    }

    return (
        <Route {...rest}
            render={({ props, location }) =>
                authenticated ?
                    (
                        <MasterLayout {...props} />
                    ) : (
                        <Redirect to={{ pathname: "/login", state: { from: location } }} />
                    )

            }
        />
    )
}

export default AdminPrivateRoute