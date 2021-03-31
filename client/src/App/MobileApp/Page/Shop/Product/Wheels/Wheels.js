import React, { useState, useContext, useEffect } from 'react'
import LoadingShop from '../../ShopComponents/LoadingShop/LoadingShop'
import { ShopContext } from '../../../../../../Context/shopContext'
import MobileWheelItem from './MobileWheelItem/MobileWheelItem'
import './wheels.scss'

const Wheels = () => {

    const { collections } = useContext( ShopContext )
    const [ wheelsAPI, setWheelsAPI ] = useState()

    useEffect( () => {
        const fetchData = async() => {
            const collectionArray = await getCollection()
            setWheelsAPI( collectionArray[0] )
        }
        fetchData()
    }, [])



    const getCollection = () => {
        return new Promise( resolve => {
            const wheelsCollectionItem = collections.filter( collection => {
                return collection.title === 'wheels'
            })
            resolve( wheelsCollectionItem[0].products )
        })
    }

    if ( !wheelsAPI ) return <LoadingShop />

    return (
        <div
            className='wheels_container'>
            <MobileWheelItem wheelsAPI={ wheelsAPI }/>
        </div>
    )
}

export default Wheels