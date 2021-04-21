import React, { useEffect, useState } from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import Client from 'shopify-buy'

require('dotenv').config()

const ShopContext = React.createContext()

const ShopConsumer = ShopContext.Consumer

const client = Client.buildClient({
    domain: 'ms-sugar-skate.myshopify.com',
    storefrontAccessToken: process.env.REACT_APP_STORE_FRONT_ACCESS_TOKEN
})

const ShopProvider = (props) => {

    const [ collections, setCollections ] = useState()
    const [ products, setProducts ] = useState([])
    const [ checkout, setCheckout ] = useState({})
    const [ itemsInCart, setItemsInCart ] = useState( 0 )
    const [ isCartOpen, setIsCartOpen ] = useState( false )
    const [ keyboardOpen, setKeyboardOpen ] = useState( false )
    const [ appState, setAppState ] = useState(() => {
        return {
            language: 'hebrew',
            page: 'mission',
            loading: { active: false },
            mainMenu: { open: false },
            productMenu: { open: false },
            optionMenu: { open: false, productTitle: '', option: '' },
            currentProductType: 'decks',
            }
        })
    const [ product, setProduct ] = useState(() => {
        return {
            title: '',
            description: '',
            images: [{ src: '' }],
            variant: {},
            options: [],
        }
    })
    const [ clientInfo, setClientInfo ] = useState(() => {
        return {
            countyCode: '',
            countryName: '',
        }
    })
    const [ currencyData, setCurrencyData ] = useState(() => {
        return {
            currentCurrencyCode: null,
            currentCurrencySymbole: null,
            currencyCodeList: null,
        }
    })

    const getPrice = async ( product ) => {
        if ( product.variant ) {
            // await currencyData
            // if ( product.variant[0] ) {
                const currencyItem = await product.variant[0].presentmentPrices.find( item => item.price.currencyCode === currencyData.currentCurrencyCode )
                return currencyItem.price.amount
            // } else {
                
            // }
        } else if ( product[0] ) {
            const currencyItem = await product[0].variant.presentmentPrices.find( item => item.price.currencyCode === currencyData.currentCurrencyCode )
            return currencyItem.price.amount
        } 
    }

    const changeCurrency = ( newCurrency ) => {
        fetch(`/shopify/change-checkout-currency/${newCurrency}`, {
        })
        const currencySymbol = getSymbolFromCurrency( newCurrency )
        setCurrencyData( prevState => {
            return { ...prevState,
                currentCurrencyCode: newCurrency,
                currentCurrencySymbole: currencySymbol,
            }
        } )
    }

    const getTotalPriceAmount = async () => {
        let total = 0
        await checkout.lineItems.map( async ( item ) => {
            const currenciesItem = item.variant.presentmentPrices
            const currency = await currenciesItem.find( item => item.price.currencyCode === currencyData.currentCurrencyCode )
            total += currency.price.amount * item.quantity
        })
        return total
    }

    const setCurrency = async () => {
        const data = await fetch('/shopify/get-currency')
        const currenciesData = await data.json()
        const currencySymbol = getSymbolFromCurrency( currenciesData.current )
        setCurrencyData(() => {
            return {
                currentCurrencyCode: currenciesData.current,
                currentCurrencySymbole: currencySymbol,
                currencyCodeList: currenciesData.list,
            }
        } )
    }

    const createChekout = async () => {
        const checkout = await client.checkout.create()
        setCheckout( checkout )
    }

    const updateItemQuantityForCheckout = async ( variantId, quantity ) => {
        const lineItemsToUpdate = [{
            id: variantId,
            quantity: parseInt( quantity, 10 ) }
          ];
        const checkoutUpdate = await client.checkout.updateLineItems( checkout.id, lineItemsToUpdate)
        setCheckout( checkoutUpdate )
        updateQuantity( checkoutUpdate )
    }

    const addItemToCheckout = async ( variantId, quantity ) => {
        const lineItemsToAdd = [{
            variantId,
            quantity: parseInt( quantity, 10 )
    }]
        const checkoutUpdate = await client.checkout.addLineItems( checkout.id, lineItemsToAdd )
        setCheckout( checkoutUpdate )
        updateQuantity( checkoutUpdate )
    }
    
    const fetchAllCollections = async () => {
        const collections = await client.collection.fetchAllWithProducts()
        setCollections( collections )
    }
    
    const fetchAllProducts = async () => {
        const products = await client.product.fetchAll()
        setProducts( products )
    }

    const fetchProductWithId = async ( id ) => {
        const productAPI = await client.product.fetch( id )
        return new Promise ( resolve => {
            resolve( productAPI )
        })
    }

    const closeCart = () => { setIsCartOpen(false) }
    
    const openCart = () => { setIsCartOpen(true) }
    
    useEffect(() => {
        fetchAllCollections()
        fetchAllProducts()
        createChekout()
    }, [])

    const updateQuantity = ( checkoutUpdate ) => {
        let quantity = 0
        checkoutUpdate.lineItems.forEach( item => {
            quantity += item.quantity
        })
        setItemsInCart(quantity)
    }
 
    const contextValue = {
        fetchAllCollections,
        fetchAllProducts,
        collections,
        products,
        checkout,
        setCheckout,
        isCartOpen,
        setIsCartOpen,
        fetchProductWithId,
        closeCart,
        openCart,
        addItemToCheckout,
        updateItemQuantityForCheckout,
        appState,
        setAppState,
        product,
        setProduct,
        itemsInCart,
        keyboardOpen,
        setKeyboardOpen,
        setClientInfo,
        clientInfo,
        setCurrency,
        currencyData, 
        setCurrencyData,
        getPrice,
        changeCurrency,
        getTotalPriceAmount
    }

    return (
        <ShopContext.Provider value={ contextValue }>
            { props.children }
        </ShopContext.Provider>
    )
}

export { ShopConsumer, ShopContext }

export default ShopProvider