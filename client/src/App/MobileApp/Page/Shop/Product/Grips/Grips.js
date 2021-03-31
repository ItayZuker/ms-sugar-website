import React, { useState, useContext, useEffect } from 'react'
import LoadingShop from '../../ShopComponents/LoadingShop/LoadingShop'
import { ShopContext } from '../../../../../../Context/shopContext'
import Collection from './Collection/Collection'
import './grips.scss'

const Grips = () => {

    const { collections } = useContext( ShopContext )
    const [ gripsCollections, setGripsCollections ] = useState()

    useEffect(() => {
        const fetchData = async() => {
            const collectionArray = await getCollection()
            setGripsCollections( collectionArray )
        }
        fetchData()
    }, [])


    const getCollection = () => {
        return new Promise( resolve => {
            const gripsCollectionItem = collections.filter( collection => {
                return collection.title === 'grips'
            })
            resolve( gripsCollectionItem[0].products )
        })
    }

    if ( !gripsCollections ) return <LoadingShop />

    return (
        <div
            className='grips_container'>
            <Collection collection={ gripsCollections } />
        </div>
    )
}

export default Grips