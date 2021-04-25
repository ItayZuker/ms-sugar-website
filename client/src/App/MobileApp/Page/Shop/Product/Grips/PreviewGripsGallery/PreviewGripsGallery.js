import React, { useContext, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../../../Context/shopContext'
import PreviewGrip from './PreviewGrip/PreviewGrip'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import './preview_grips_gallery.scss'

const PreviewGripsGallery = () => {

    const { collections, appState } = useContext( ShopContext )
    const [ collection, setCollection ] = useState()
    const history = useHistory()

    useEffect( async() => {
        if ( collections ) {
            const collectionArray = await getCollection()
            setCollection( collectionArray )
        }
    }, [ collections ])


    const getCollection = () => {
        return new Promise( resolve => {
            const decksCollectionItem = collections.filter( collection => {
                return collection.title === 'grips'
            })
            resolve( decksCollectionItem[0].products )
        })
    }

    if ( !collection ) return <LoadingShop />

    if ( collection.length === 1 ) history.push(`/shop/grips/${collection[0].id}`)

    return (
        <div className={ 'mobile_preview_grips_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            { collection.map( item => {
                return <PreviewGrip 
                key={ item.id }
                item={ item } />
            })}
        </div>
    )
}

export default PreviewGripsGallery