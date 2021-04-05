import React, { useContext, useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../../../Context/shopContext'
import PreviewGrip from './PreviewGrip/PreviewGrip'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import './preview_grips_gallery.scss'

const PreviewGripsGallery = ( props ) => {

    const { collections, appState } = useContext( ShopContext )
    const [ allGrips, setAllGrips ] = useState()
    const history = useHistory()
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

    if ( allGrips.length === 1 ) history.push(`/shop/grips/${allGrips[0].id}`)

    return (
        <div className={ 'preview_grips_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            { allGrips.map( grip => {
                return <PreviewGrip 
                key={ grip.id }
                grip={ grip } />
            })}
        </div>
    )
}

export default PreviewGripsGallery