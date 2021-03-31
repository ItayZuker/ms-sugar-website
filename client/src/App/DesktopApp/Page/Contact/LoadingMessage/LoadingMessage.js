import React, { useEffect } from 'react'
import './loading_message.scss'

const LoadingMessage = () => {

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
            <h3 id='sending_message'>Sending Message</h3>
        </div>
    )
}

export default LoadingMessage