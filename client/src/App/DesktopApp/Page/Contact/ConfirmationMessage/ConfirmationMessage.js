import React, { useContext } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import './confirmation_message.scss'

const ConfirmationMessage = () => {

    const { appState } = useContext( ShopContext )

    return (
        <div className='desktop_confirmation_message_container'>
            <h3><i className="far fa-smile"></i></h3>
            <h3>
                { appState.language === 'english' ? 'Message Sent' : 'הודעה נשלחה' }
            </h3>
        </div>
    )
}

export default ConfirmationMessage