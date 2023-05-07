import React from 'react'
import { Route } from 'react-router-dom'
import FrontEndLayout from './layouts/frontend/FrontEndLayout'

function PublicRoute({ ...rest }) {
    return (
        <Route {...rest} render={(props) => <FrontEndLayout {...props} />} />
    )
}

export default PublicRoute