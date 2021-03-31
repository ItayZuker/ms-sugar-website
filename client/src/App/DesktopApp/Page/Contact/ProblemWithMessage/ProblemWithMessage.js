import React from 'react'
import './problem_with_message.scss'

const ProblemWithMessage = ( props ) => {

    return (
        <div className='desktop_problem_with_message_container'>
            <h3><i className="far fa-frown"></i></h3>
            <h3>Something went wrong</h3>
            <h4 onClick={ () => props.setBadMessage( false ) }>Try again</h4>
        </div>
    )
}

export default ProblemWithMessage