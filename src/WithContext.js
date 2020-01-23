import React from 'react'
import {AppContext} from './App'

export function withContext(Component){
    return (props) => (
        <AppContext.Consumer>
            { ({state,actions}) => {
                return <Component {...props} data={state} actions={actions}></Component>
                }}
        </AppContext.Consumer>
    )
}

// export default withContext