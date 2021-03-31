import React from 'react'
import './bad_message.scss'

const BadMessage = ( props ) => {

    return (
        <div className='bad_message_container'>
            <h3><i className="far fa-frown"></i></h3>
            <h3>Something went wrong...</h3>
            <h3 
                className='try_again'
                onClick={ () => props.setBadMessage( false ) }>Try again</h3>
        </div>
    )
}

export default BadMessage