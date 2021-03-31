import React  from 'react'
import MobileGripItem from './MobileGripItem/MobileGripItem'
import './collection.scss'

const Collection = ( props ) => {

    return (
        <div className='collection_container'>
            <div className='collection'>
                { props.collection.map( product => {
                    return <MobileGripItem
                        key={ product.id }
                        product={ product } /> 
                } ) }
            </div>
        </div>
    )
}

export default Collection