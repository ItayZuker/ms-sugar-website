import React, { useEffect, useState } from 'react'
import GripItem from './GripItem/GripItem'
import { useGetItem } from '../../../../../../../../customHooks/useGetItem'
import './mobile_grip_item.scss'

const MobileGripItem = ( props ) => {

    const [ product, setProduct ] = useState( '' )
    const { updateItem } = useGetItem()
    
    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async() => {
        const data = await updateItem( props.product )
        setProduct( data )
    }

    if ( product === '' ) return <div>loading</div>

    return (
        <div className='mobile_grip_item_container'>
            <GripItem product={ props.product }/>
        </div>
    )
}

export default MobileGripItem