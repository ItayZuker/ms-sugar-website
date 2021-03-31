import React from 'react'
import './problem.scss'

const Problem = ( props ) => {

    return (
        <div className='problem_container'>
            <h3><i className="far fa-frown"></i></h3>
            <h3>Something went wrong</h3>
            <h4 onClick={ () => props.setProblem( false ) }>Try again</h4>
        </div>
    )
}

export default Problem