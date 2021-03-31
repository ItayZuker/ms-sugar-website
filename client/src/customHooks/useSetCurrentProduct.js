// import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { ShopContext } from '../Context/shopContext'

// export const useSetCurrentProduct = () => {

//     const { id } = useParams()
//     const [ productAPI, setProductAPI ] = useState({})
//     const [ allVariantsArray, setAllVariantsArray ] = useState([])
//     const [ filterdSizeVariants, setFilterdSizeVariants ] = useState([])
//     const [ filterdConcaveVariants, setFilterdConcaveVariants ] = useState([])
//     const [ sizeOptions, setSizeOptions ] = useState([])
//     const [ concaveOptions, setConcaveOptions ] = useState([])
//     const [ materialOptions, setMaterialOptions ] = useState([])
//     const { fetchProductWithId, setProduct } = useContext( ShopContext )

//     useEffect(() => {
//         setProductDefault(  )
//     }, [])
    
//     const setProductDefault = async() => {
//         const productAPI = await fetchProductWithId( id )
//         const allVariantsArray = await getVariantsArray( productAPI )
//         const sizeOptions = await getSizeOptions( productAPI ) 
//         const filterdSizeVariants = await getFilterdSizeVariants( allVariantsArray, sizeOptions[0] )
//         const concaveOptionsForSize = await getConcaveOptionsForSize( productAPI, filterdSizeVariants )
//         const filterdConcaveVariants = await getFilterdConcaveVariants( filterdSizeVariants, concaveOptionsForSize[0] )
//         const materialOptionsForConcave = await getMaterialOptionsForConcave( productAPI, filterdConcaveVariants )
//         const filterdMaterialVariants = await getFilterdMaterialVariants( filterdConcaveVariants, materialOptionsForConcave[0] )
//         setProduct(() => {
//             return { 
//                 title: productAPI.title,
//                 description: productAPI.descriptionHtml,
//                 images: productAPI.images,
//                 variant: filterdMaterialVariants,
//                 options: [{ 
//                     name: 'size', 
//                     values: sizeOptions 
//                 }, { 
//                     name: 'concave', 
//                     values: concaveOptionsForSize 
//                 }, { 
//                     name: 'material', 
//                     values: materialOptionsForConcave 
//                 }],
//             }
//         })
//         setProductAPI( productAPI )
//         setAllVariantsArray( allVariantsArray )
//         setFilterdSizeVariants( filterdSizeVariants )
//         setFilterdConcaveVariants( filterdConcaveVariants )
//         setSizeOptions( sizeOptions )
//         setConcaveOptions( concaveOptionsForSize )
//         setMaterialOptions( materialOptionsForConcave )
//     }

//     // ----- filter options

//     const getMaterialOptionsForConcave = ( product, variantsArray ) => {
//         return new Promise( resolve => {
//             const allMaterialOptionsItem = product.options.filter( option => option.name === 'material' )
//             const allMaterialArray = allMaterialOptionsItem[0].values.map( value => value.value )
//             const filterdMaterialArray = allMaterialArray.filter( material => {
//                 const variantsArrayWithMaterial = variantsArray.filter( variant => variant.title.indexOf( material ) > -1 )
//                 return variantsArrayWithMaterial.length > 0
//             })
//             const sorteFilterdMaterialArray = sortMaterialArray( filterdMaterialArray )
//             resolve( sorteFilterdMaterialArray )
//         })
//     }

//     const getConcaveOptionsForSize = ( product, variantsArray ) => {
//         return new Promise( resolve => {
//             const allConcaveOptionsItem = product.options.filter( option => option.name === 'concave' )
//             const allConcavesArray = allConcaveOptionsItem[0].values.map( value => value.value )
//             const filterdConcavesArray = allConcavesArray.filter( concave => {
//                 const variantsArrayWithConcave = variantsArray.filter( variant => variant.title.indexOf( concave ) > -1 )
//                 return variantsArrayWithConcave.length > 0
//             })
//             const sortedFilterdConcavesArray = sortConcaveArray( filterdConcavesArray )
//             resolve( sortedFilterdConcavesArray )
//         })
//     }

//     const getSizeOptions = ( product ) => {
//         return new Promise( resolve => {
//             const optionItem = product.options.filter( option => option.name === 'size' )
//             const optionValuesArray = optionItem[0].values.map( value => value.value )
//             resolve( optionValuesArray )
//         })
//     }

//     // ----- filter variants

//     const getFilterdMaterialVariants = ( variantsArray, material ) => {
//         if ( variantsArray.length ) {
//             return new Promise( resolve => {
//                 const filterdVariantsArray = variantsArray.filter( variant => {
//                     const option = variant.selectedOptions.find( option => option.name === 'material') 
//                     if ( option ) {
//                         return option.value === material
//                     } else {
//                         return []
//                     }
//                 })
//                 resolve( filterdVariantsArray )
//             })
//         } else {
//             return new Promise( resolve => {
//                 const option = variantsArray.selectedOptions.find( option => option.name === 'material')
//                 if ( option.value === material ) {
//                     resolve( variantsArray )
//                 } else {
//                     resolve([])
//                 }
//             })
//         }
//     }

//     const getFilterdConcaveVariants = ( variantsArray, concave ) => {
//         if ( variantsArray.length ) {
//             return new Promise( resolve => {
//                 const filterdVariantsArray = variantsArray.filter( variant => {
//                     const option = variant.selectedOptions.find( option => option.name === 'concave') 
//                     if ( option ) {
//                         return option.value === concave
//                     } else {
//                         return []
//                     }
//                 })
//                 resolve( filterdVariantsArray )
//             })
//         } else {
//             return new Promise( resolve => {
//                 const option = variantsArray.selectedOptions.find( option => option.name === 'concave')
//                 if ( option.value === concave ) {
//                     resolve( variantsArray )
//                 } else {
//                     resolve([])
//                 }
//             })
//         }
//     }
    
//     const getFilterdSizeVariants = ( variantsArray, size ) => {
//         if ( variantsArray.length ) {
//             return new Promise( resolve => {
//                 const filterdVariantsArray = variantsArray.filter( variant => {
//                     const option = variant.selectedOptions.find( option => option.name === 'size') 
//                     if ( option ) {
//                         return option.value === size
//                     } else {
//                         return []
//                     }
//                 })
//                 resolve( filterdVariantsArray )
//             })
//         } else {
//             return new Promise( resolve => {
//                 if ( size ) {
//                     const option = variantsArray.selectedOptions.find( option => option.name === 'size')
//                     if ( option.value === size ) {
//                         resolve( variantsArray )
//                     } else {
//                         resolve([])
//                     }
//                 }
//             })
//         }
//     }
    
//     // ----- get variants

//     const getVariantsArray = ( productAPI ) => {
//         return new Promise( resolve => {
//             const variantsArray = productAPI.variants.map( variant => variant )
//             resolve( variantsArray )
//         })
//     }

//     // ----- sort arrays

//     const sortConcaveArray = ( array ) => {
//         let sorted = []
//         const itemOne = array.find( item => item === 'small')
//         const itemTwo = array.find( item => item === 'medium')
//         const itemThree = array.find( item => item === 'large')
//         if ( itemOne ) sorted.push( itemOne )
//         if ( itemTwo ) sorted.push( itemTwo )
//         if ( itemThree ) sorted.push( itemThree )
//         return sorted
//     }

//     const sortMaterialArray = ( array ) => {
//         let sorted = []
//         const itemOne = array.find( item => item === 'maple wood')
//         if ( itemOne ) sorted.push( itemOne )
//         return sorted
//     }

//     // ----- update functions

//     const cleanCurrentProduct = () => {
//         setProduct({
//             title: '',
//             description: '',
//             images: [],
//             variant: [],
//             options: [],
//         })
//     }

//     const updateMaterial = async( material ) => {
//         const filterdMaterialVariants = await getFilterdMaterialVariants( filterdConcaveVariants, material )
//         setProduct( prevState => {
//             return { ...prevState, variant: filterdMaterialVariants,}
//         })
//     }

//     const updateConcave = async( concave ) => {
//         const filterdConcaveVariants = await getFilterdConcaveVariants( filterdSizeVariants, concave )
//         const materialOptionsForConcave = await getMaterialOptionsForConcave( productAPI, filterdConcaveVariants )
//         const filterdMaterialVariants = await getFilterdMaterialVariants( filterdConcaveVariants, materialOptionsForConcave[0] )
//         console.log(filterdMaterialVariants)
//         setProduct( prevState => {
//             return { ...prevState, variant: filterdMaterialVariants,}
//         })
//         setFilterdConcaveVariants( filterdConcaveVariants )
//     }

//     const updateSize = async( size ) => {
//         const filterdSizeVariants = await getFilterdSizeVariants( allVariantsArray, size )
//         const concaveOptionsForSize = await getConcaveOptionsForSize( productAPI, filterdSizeVariants )
//         const filterdConcaveVariants = await getFilterdConcaveVariants( filterdSizeVariants, concaveOptionsForSize[0] )
//         const materialOptionsForConcave = await getMaterialOptionsForConcave( productAPI, filterdConcaveVariants )
//         const filterdMaterialVariants = await getFilterdMaterialVariants( filterdConcaveVariants, materialOptionsForConcave[0] )
//         setProduct( prevState => {
//             return { ...prevState, 
//                 variant: filterdMaterialVariants,
//                 options: [{ 
//                     name: 'size', 
//                     values: sizeOptions 
//                 }, { 
//                     name: 'concave', 
//                     values: concaveOptionsForSize 
//                 }, { 
//                     name: 'material', 
//                     values: materialOptionsForConcave 
//                 }],
//             }
//         })
//         setFilterdSizeVariants( filterdSizeVariants )
//         setFilterdConcaveVariants( filterdConcaveVariants )
//         setConcaveOptions( concaveOptionsForSize )
//         setMaterialOptions( materialOptionsForConcave )
//     }

//     return {
//         updateSize,
//         updateConcave,
//         updateMaterial,
//         cleanCurrentProduct
//     }
    
// }