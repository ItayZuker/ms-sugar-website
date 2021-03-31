import React, { useState, useContext, useEffect } from 'react'
import LoadingShop from '../../ShopComponents/LoadingShop/LoadingShop'
import { ShopContext } from '../../../../../../Context/shopContext'
import MobileTruckItem from './MobileTrucksItem/MobileTrucksItem'
import './trucks.scss'

const Trucks = () => {

    const { collections } = useContext( ShopContext )
    const [ trucksAPI, setTrucksAPI ] = useState()

    useEffect( () => {
        const fetchData = async() => {
            const collectionArray = await getCollection()
            setTrucksAPI( collectionArray[0] )
        }
        fetchData()
    }, [])

    const getCollection = () => {
        return new Promise( resolve => {
            const trucksCollectionItem = collections.filter( collection => {
                return collection.title === 'trucks'
            })
            resolve( trucksCollectionItem[0].products )
        })
    }

    if ( !trucksAPI ) return <LoadingShop />

    return (
        <div
            className='trucks_container'>
            <MobileTruckItem trucksAPI={ trucksAPI } />
        </div>
    )
}

export default Trucks