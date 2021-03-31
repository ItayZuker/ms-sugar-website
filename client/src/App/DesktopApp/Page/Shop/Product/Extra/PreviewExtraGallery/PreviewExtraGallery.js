import React, { useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../../../../../../Context/shopContext'
import PreviewExtra from './PreviewExtra/PreviewExtra'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import './preview_extra_gallery.scss'

const PreviewExtraGallery = () => {

    const { collections } = useContext( ShopContext )
    const [ allExtra, setAllExtra ] = useState()

    const { id } = useParams()

    useEffect( async() => {
        if ( collections ) {
            const collectionArray = await getCollection()
            setAllExtra( collectionArray )
        }
    }, [ collections ])


    const getCollection = () => {
        return new Promise( resolve => {
            const extraCollectionItem = collections.filter( collection => {
                return collection.title === 'extra'
            })
            resolve( extraCollectionItem[0].products )
        })
    }

    if ( !allExtra ) return <LoadingShop />

    return (
        <div className='preview_extra_gallery_container'>
            { allExtra.map( extra => {
                return <PreviewExtra 
                key={ extra.id }
                extra={ extra } />
            })}
        </div>
    )
}

export default PreviewExtraGallery