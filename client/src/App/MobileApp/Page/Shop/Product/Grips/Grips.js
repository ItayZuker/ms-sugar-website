import React, { useState, useContext, useEffect } from 'react'
import LoadingShop from '../../ShopComponents/LoadingShop/LoadingShop'
import { ShopContext } from '../../../../../../Context/shopContext'
import PreviewGripsGallery from './PreviewGripsGallery/PreviewGripsGallery'
import GripItemGallery from './GripItemGallery/GripItemGallery'
import Collection from './Collection/Collection'
import { useParams } from 'react-router-dom'
import './grips.scss'
import PreviewDeck from '../../../../../DesktopApp/Page/Shop/Product/Decks/PreviewDecksGallery/PreviewDeck/PreviewDeck'

const Grips = () => {

    const { setAppState } = useContext( ShopContext )
    const { id } = useParams()


    useEffect(() => {
        setAppState( prevState => {
            return { ...prevState, currentProductType: 'grips' }
        })
    }, [])

    // useEffect(() => {
    //     const fetchData = async() => {
    //         const collectionArray = await getCollection()
    //         setGripsCollections( collectionArray )
    //     }
    //     fetchData()
    // }, [])


    // const getCollection = () => {
    //     return new Promise( resolve => {
    //         const gripsCollectionItem = collections.filter( collection => {
    //             return collection.title === 'grips'
    //         })
    //         resolve( gripsCollectionItem[0].products )
    //     })
    // }

    // if ( !gripsCollections ) return <LoadingShop />

    return (
        <div
            className='grips_container'>
            {/* <Collection collection={ gripsCollections } /> */}
            { id ? <GripItemGallery /> : <PreviewGripsGallery /> }
        </div>
    )
}

export default Grips