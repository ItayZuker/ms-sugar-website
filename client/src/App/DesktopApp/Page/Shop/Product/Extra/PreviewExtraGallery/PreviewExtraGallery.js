import React, { useContext, useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../../../Context/shopContext'
import PreviewExtra from './PreviewExtra/PreviewExtra'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import './preview_extra_gallery.scss'

const PreviewExtraGallery = () => {

    const { collections, appState } = useContext( ShopContext )
    const [ allExtra, setAllExtra ] = useState()
    const history = useHistory()
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

    if ( allExtra.length === 1 ) history.push(`/shop/extra/${allExtra[0].id}`)

    return (
        <div className={ 'preview_extra_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            { allExtra.map( extra => {
                return <PreviewExtra 
                key={ extra.id }
                extra={ extra } />
            })}
        </div>
    )
}

export default PreviewExtraGallery