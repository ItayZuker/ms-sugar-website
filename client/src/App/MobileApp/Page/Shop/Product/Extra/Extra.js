import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../../../../../../Context/shopContext'
import LoadingShop from '../../ShopComponents/LoadingShop/LoadingShop'
import MobileExtraItem from './MobileExtraItem/MobileExtraItem'
import './extra.scss'

const Extra = () => {

    const { collections } = useContext( ShopContext )
    const [ extrasCollection, setExtrasCollection ] = useState()

    useEffect(() => {
        const fetchData = async() => {
            const collectionArray = await getCollection()
            setExtrasCollection( collectionArray )
        }
        fetchData()
    }, [])


    const getCollection = () => {
        return new Promise( resolve => {
            const extrasCollectionItem = collections.filter( collection => {
                return collection.title === 'extra'
            })
            resolve( extrasCollectionItem[0].products )
        })
    }

    if ( !extrasCollection ) return <LoadingShop />

    return (
        <div
            className='extra_container'>
            <div className='collection'>
                { extrasCollection.map( product => {
                    return <MobileExtraItem
                        key={ product.id }
                        product={ product } /> 
                } ) }
            </div>
        </div>
    )
}

export default Extra