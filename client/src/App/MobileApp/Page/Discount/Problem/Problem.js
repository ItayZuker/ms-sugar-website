import React, { useContext } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import './problem.scss'

const Problem = ( props ) => {

    const { appState } = useContext( ShopContext )

    return (
        <div className='problem_container'>
            <h3><i className="far fa-frown"></i></h3>
            <h3>{ appState.language === 'english' ? 'Something went wrong' : 'משהו לא בסדר' }</h3>
            <h4 onClick={ () => props.setProblem( false ) }>{ appState.language === 'english' ? 'Try again' : 'נסה שוב' }</h4>
        </div>
    )
}

export default Problem