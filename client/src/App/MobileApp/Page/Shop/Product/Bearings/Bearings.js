import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../../../../../../Context/shopContext'
import LoadingShop from '../../ShopComponents/LoadingShop/LoadingShop'
import MobileBearingsItem from './MobileBearingsItem/MobileBearingsItem'
import './bearings.scss'

const Bearings = () => {

    const { collections } = useContext( ShopContext )
    const [ bearingsAPI, setBearingsAPI ] = useState()

    useEffect(() => {
        const fetchData = async() => {
            const collectionArray = await getCollection()
            setBearingsAPI( collectionArray[0] )
        }
        fetchData()
    }, [])

    const getCollection = () => {
        return new Promise( resolve => {
            const wheelsCollectionItem = collections.filter( collection => {
                return collection.title === 'bearings'
            })
            resolve( wheelsCollectionItem[0].products )
        })
    }

    if ( !bearingsAPI ) return <LoadingShop />

    return (
        <div
            className='bearings_container'>
            <MobileBearingsItem bearingsAPI={ bearingsAPI }/>
        </div>
    )
}

export default Bearings