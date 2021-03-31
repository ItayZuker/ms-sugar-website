import React, { useState, useContext, useEffect } from 'react'
import LoadingShop from '../../ShopComponents/LoadingShop/LoadingShop'
import { ShopContext } from '../../../../../../Context/shopContext'
import DecksCollection from './DecksCollection/DecksCollection'
import './decks.scss'

const Decks = () => {

    const { collections, setAppState } = useContext( ShopContext )
    const [ decksCollection, setDecksCollection ] = useState()

    useEffect(() => {
        const fetchData = async() => {
            const collectionArray = await getCollection()
            setDecksCollection( collectionArray )
        }
        setAppState( prevState => {
            return { ...prevState, currentProductType: 'decks' }
        })
        fetchData()
    }, [])


    const getCollection = () => {
        return new Promise( resolve => {
            const decksCollectionItem = collections.filter( collection => {
                return collection.title === 'decks'
            })
            resolve( decksCollectionItem[0].products )
        })
    }

    if ( !decksCollection ) return <LoadingShop />

    return (
        <div
            className='decks_container'>
            <DecksCollection collection={ decksCollection } />
        </div>
    )
}

export default Decks