import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import './loading_message.scss'

const LoadingMessage = () => {

    const { appState } = useContext( ShopContext )
    
    useEffect(() => {
        loading()
    }, [])

    const loading = () => {
    let HTMLItem = document.getElementById('sending_message');
    HTMLItem.classList.add('bright')
        setInterval( () => {
            if (HTMLItem.classList.contains('bright')) {
                HTMLItem.classList.remove('bright')
            } else {
                HTMLItem.classList.add('bright')
            }
        }, 1000);
    }


    return (
        <div className='desktop_loading_message_container'>
            <h3 id='sending_message'>
                { appState.language === 'english' ? 'Sending Message' : 'הודעה בדרך'}
            </h3>
        </div>
    )
}

export default LoadingMessage