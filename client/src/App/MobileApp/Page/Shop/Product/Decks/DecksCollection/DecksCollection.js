import React  from 'react'
import MobileDeckItem from './MobileDeckItem/MobileDeckItem'
import './decks_collection.scss'

const DecksCollection = ( props ) => {

    return (
        <div className='decks_collection_container'>
            <div className='collection'>
                { props.collection.map( product => {
                    return <MobileDeckItem
                        key={ product.id }
                        product={ product } /> 
                } ) }
            </div>
        </div>
    )
}

export default DecksCollection