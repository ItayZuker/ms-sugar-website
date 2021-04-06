import React, { useContext } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import './bad_message.scss'

const BadMessage = ( props ) => {

    const { appState } = useContext( ShopContext )

    return (
        <div className='bad_message_container'>
            <h3><i className="far fa-frown"></i></h3>
            <h3>
                { appState.language === 'english' ? 'Something went wrong...' : 'משהו לא בסדר' }
            </h3>
            <h3 
                className='try_again'
                onClick={ () => props.setBadMessage( false ) }>
                { appState.language === 'english' ? 'Try again' : 'נסה שוב' }
            </h3>
        </div>
    )
}

export default BadMessage