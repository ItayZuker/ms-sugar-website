import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../../../../Context/shopContext'
import './preview_grip.scss'

const PreviewGrip = ( props ) => {

    const { appState } = useContext( ShopContext )
    const history = useHistory()

    const selectItem = () => {
        history.push(`/shop/grips/${props.grip.id}`)
    }

    return (
        <div className='desktop_preview_grip_container'>
            <div 
                className={ 'inner_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }
                onClick={ selectItem }>
                <img src={ props.grip.images[0].src } />
                { props.grip.availableForSale ? <h3 className='select'>{ appState.language === 'english' ? 'Select' : 'כניסה' }</h3> : <h3 className='out_of_stock'>{ appState.language === 'english' ? 'Out of stock' : 'נגמר המלאי' }</h3>}
            </div>
        </div>
    )
}

export default PreviewGrip