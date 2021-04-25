import React, { useContext, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../../../Context/shopContext'
import PreviewWheel from './PreviewWheel/PreviewWheel'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import './preview_wheels_gallery.scss'

const PreviewWheelsGallery = () => {

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
            const collectionItem = collections.filter( collection => {
                return collection.title === 'wheels'
            })
            resolve( collectionItem[0].products )
        })
    }

    if ( !collection ) return <LoadingShop />

    if ( collection.length === 1 ) history.push(`/shop/wheels/${collection[0].id}`)

    return (
        <div className={ 'mobile_preview_wheels_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            { collection.map( item => {
                return <PreviewWheel
                key={ item.id }
                item={ item } />
            })}
        </div>
    )
}

export default PreviewWheelsGallery