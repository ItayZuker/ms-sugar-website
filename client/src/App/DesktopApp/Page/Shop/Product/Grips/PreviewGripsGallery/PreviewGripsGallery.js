import React, { useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../../../../../../Context/shopContext'
import PreviewGrip from './PreviewGrip/PreviewGrip'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import './preview_grips_gallery.scss'

const PreviewGripsGallery = ( props ) => {

    const { collections } = useContext( ShopContext )
    const [ allGrips, setAllGrips ] = useState()

    const { id } = useParams()

    useEffect( async() => {
        if ( collections ) {
            const collectionArray = await getCollection()
            setAllGrips( collectionArray )
        }
    }, [ collections ])


    const getCollection = () => {
        return new Promise( resolve => {
            const gripsCollectionItem = collections.filter( collection => {
                return collection.title === 'grips'
            })
            resolve( gripsCollectionItem[0].products )
        })
    }

    if ( !allGrips ) return <LoadingShop />

    return (
        <div className='preview_grips_gallery_container'>
            { allGrips.map( grip => {
                return <PreviewGrip 
                key={ grip.id }
                grip={ grip } />
            })}
        </div>
    )
}

export default PreviewGripsGallery