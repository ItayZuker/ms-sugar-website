import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../../../../Context/shopContext'
import './preview_wheel.scss'

const PreviewWheel = ( props ) => {

    const { appState } = useContext( ShopContext )
    const history = useHistory()

    const selectItem = () => {
        history.push(`/shop/wheels/${props.item.id}`)
    }

    return (
        <div className='mobile_preview_wheel_container'>
            <div 
                className={ 'inner_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }
                onClick={ selectItem }>
                <img 
                    src={ props.item.images[0].src }
                    alt='Wheel_Picture' />
                { props.item.availableForSale ? <h3 className='select'>{ appState.language === 'english' ? 'Select' : 'כניסה' }</h3> : <h3 className='out_of_stock'>{ appState.language === 'english' ? 'Out of stock' : 'נגמר המלאי' }</h3>}
            </div>
        </div>
    )
}

export default PreviewWheel