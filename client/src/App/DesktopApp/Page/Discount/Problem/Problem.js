import React, { useContext } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import './problem.scss'

const Problem = ( props ) => {

    const { appState } = useContext( ShopContext )

    return (
        <div className='desktop_problem_container'>
            <h3><i className="far fa-frown"></i></h3>
            <h3>{ appState.lenguage === 'english' ? 'Something went wrong' : 'משהו לא בסדר' }</h3>
            <h4 onClick={ () => props.setProblem( false ) }>{ appState.lenguage === 'english' ? 'Try again' : 'נסה שוב' }</h4>
        </div>
    )
}

export default Problem