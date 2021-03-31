import React from 'react'
import { useHistory } from 'react-router-dom'
import './preview_grip.scss'

const PreviewGrip = ( props ) => {

    const history = useHistory()

    const selectItem = () => {
        history.push(`/shop/grips/${props.grip.id}`)
    }

    return (
        <div className='desktop_preview_grip_container'>
            <div 
                className='inner_container'
                onClick={ selectItem }>
                <img src={ props.grip.images[0].src } />
                { props.grip.availableForSale ? <h3 className='select'>Select</h3> : <h3 className='out_of_stock'>Out of stock</h3>}
            </div>
        </div>
    )
}

export default PreviewGrip