import React from 'react'
import { useHistory } from 'react-router-dom'
import './preview_extra.scss'

const PreviewDeck = ( props ) => {

    const history = useHistory()

    const selectItem = () => {
        history.push(`/shop/extra/${props.extra.id}`)
    }

    return (
        <div className='desktop_preview_extra_container'>
            <div 
                className='inner_container'
                onClick={ selectItem }>
                <img src={ props.extra.images[0].src } />
                { props.extra.availableForSale ? <h3 className='select'>Select</h3> : <h3 className='out_of_stock'>Out of stock</h3>}
            </div>
        </div>
    )
}

export default PreviewDeck