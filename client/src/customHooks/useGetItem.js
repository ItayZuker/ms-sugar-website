// import React, { useEffect, useState, useContext } from 'react'
// import { ShopContext } from '../Context/shopContext'

export const useGetItem = () => {

    const updateItem = async( productAPI, one, two, three ) => {
        switch ( productAPI.productType ) {
            case 'decks':
                return getDeckItem( productAPI, one, two, three )
            case 'grips':
                return getGripItem( productAPI, one, two )
            case 'wheels':
                return getWheelItem( productAPI, one, two, three )
            case 'bearings':
                return getBearingsItem( productAPI, one, two, three )
            case 'trucks':
                return getTrucksItem( productAPI, one, two, three )
            case 'extra':
                return getExtraItems( productAPI, one, two, three )
            case 'book':
                return getbookItems( productAPI )
            default : break
        }
    }

    const getbookItems = async( productAPI ) => {
        const allVariantsArray = await getVariantsArray( productAPI )
        if ( allVariantsArray.length > 0 ) {
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: allVariantsArray,
            }
        } else {
            return {
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: '',
            }
        }
    }

    const getExtraItems = async( productAPI, one, two, three ) => {
        switch (productAPI.title) {
            case 'stencil':
                return getStencilItem( productAPI, one, two, three )
            case 'tools':
                return getToolsItem( productAPI, one, two, three )
            case 'spacer':
                return getSpacerItem( productAPI, one, two, three )
            case 'bolts':
                return getBoltsItem( productAPI, one, two, three )
            default : break
        }
    }

    const getBoltsItem = async( productAPI, size, color ) => {
        const allVariantsArray = await getVariantsArray( productAPI )
        if ( allVariantsArray.length > 0 ) {
            const sizeOptions = await getSizeOptions( productAPI, allVariantsArray ) 
            const filterdSizeVariants = await getFilterdSizeVariants( allVariantsArray, size || sizeOptions[0] )
            const colorOptionsForSize = await getColorOptionsForSize( productAPI, filterdSizeVariants )
            const filterdColorVariants = await getFilterdColorVariants( filterdSizeVariants, color || colorOptionsForSize[0] )
            console.log(filterdColorVariants)
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: filterdColorVariants,
                options: [{ 
                    name: 'size', 
                    values: sizeOptions 
                }, { 
                    name: 'color', 
                    values: colorOptionsForSize 
                }],
            }
        } else {
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: '',
                options: [],
            }
        }
    }

    const getSpacerItem = async( productAPI, color ) => {
        const allVariantsArray = await getVariantsArray( productAPI )
        if ( allVariantsArray.length > 0 ) {
            const colorOptions = await getColorOptions( productAPI, allVariantsArray ) 
            const filterdColorVariants = await getFilterdColorVariants( allVariantsArray, color || colorOptions[0] )
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: filterdColorVariants,
                options: [{ 
                    name: 'color', 
                    values: colorOptions
                }],
            }
        } else {
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: '',
                options: [],
            }
        }
    }

    const getToolsItem = async( productAPI, color ) => {
        const allVariantsArray = await getVariantsArray( productAPI )
        if ( allVariantsArray.length > 0 ) {
            const colorOptions = await getColorOptions( productAPI, allVariantsArray ) 
            const filterdColorVariants = await getFilterdColorVariants( allVariantsArray, color || colorOptions[0] )
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: filterdColorVariants,
                options: [{ 
                    name: 'color', 
                    values: colorOptions
                }],
            }
        } else {
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: '',
                options: [],
            }
        }
    }

    const getStencilItem = async( productAPI ) => {
        const allVariantsArray = await getVariantsArray( productAPI )
        if ( allVariantsArray.length > 0 ) {
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: allVariantsArray,
                options: [],
            }
        } else {
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: '',
                options: [],
            }
        }
    }

    const getTrucksItem = async( productAPI, width, height, color ) => {
        const allVariantsArray = await getVariantsArray( productAPI )
        if ( allVariantsArray.length > 0 ) {
            const widthOptions = await getWidthOptions( productAPI, allVariantsArray ) 
            const filterdWidthVariants = await getFilterdWidthVariants( allVariantsArray, width || widthOptions[0] )
            const heightOptionsForWidth = await getHeightOptionsForWidth( productAPI, filterdWidthVariants )
            const filterdHeightVariants = await getFilterdHeightVariants( filterdWidthVariants, height || heightOptionsForWidth[0] )
            const colorOptionsForHeight = await getcolorOptionsForheight( productAPI, filterdHeightVariants )
            const filterdColorVariants = await getFilterdColorVariants( filterdHeightVariants, color || colorOptionsForHeight[0] )
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: filterdColorVariants,
                options: [{ 
                    name: 'width', 
                    values: widthOptions 
                }, { 
                    name: 'height', 
                    values: heightOptionsForWidth 
                }, { 
                    name: 'color', 
                    values: colorOptionsForHeight
                }],
            }
        } else {
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: '',
                options: [],
            }
        }
    }

    const getBearingsItem = async( productAPI, abec, color ) => {
        const allVariantsArray = await getVariantsArray( productAPI )
        if ( allVariantsArray.length > 0 ) {
            const abecOptions = await getAbecOptions( productAPI, allVariantsArray ) 
            const filterdAbecVariants = await getFilterdAbecVariants( allVariantsArray, abec || abecOptions[0] )
            const colorOptionsForAbec = await getColorOptionsForAbec( productAPI, filterdAbecVariants )
            const filterdColorVariants = await getFilterdColorVariants( filterdAbecVariants, color || colorOptionsForAbec[0] )
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: filterdColorVariants,
                options: [{ 
                    name: 'abec', 
                    values: abecOptions 
                }, { 
                    name: 'color', 
                    values: colorOptionsForAbec 
                }],
            }
        } else {
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: '',
                options: [],
            }
        }
    }

    const getWheelItem = async( productAPI, size, color, density ) => {
        const allVariantsArray = await getVariantsArray( productAPI )
        if ( allVariantsArray.length > 0 ) {
            const sizeOptions = await getSizeOptions( productAPI, allVariantsArray ) 
            const filterdSizeVariants = await getFilterdSizeVariants( allVariantsArray, size || sizeOptions[0] )
            const colorOptionsForSize = await getColorOptionsForSize( productAPI, filterdSizeVariants )
            const filterdColorVariants = await getFilterdColorVariants( filterdSizeVariants, color || colorOptionsForSize[0] )
            const hardnessOptionsForColor = await getHardnessOptionsForColor( productAPI, filterdColorVariants )
            const filterdHardnessVariants = await getFilterdMaterialVariants( filterdColorVariants, density || hardnessOptionsForColor[0] )
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: filterdHardnessVariants,
                options: [{ 
                    name: 'size', 
                    values: sizeOptions 
                }, { 
                    name: 'color', 
                    values: colorOptionsForSize 
                }, { 
                    name: 'density', 
                    values: hardnessOptionsForColor
                }],
            }
        } else { 
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: '',
                options: [],
            }
        }
    }

    const getGripItem = async( productAPI, size, technology ) => {
        const allVariantsArray = await getVariantsArray( productAPI )
        if ( allVariantsArray.length > 0 ) {
            const sizeOptions = await getSizeOptions( productAPI, allVariantsArray ) 
            const filterdSizeVariants = await getFilterdSizeVariants( allVariantsArray, size || sizeOptions[0] )
            const technologyOptionsForSize = await getTechnologyOptionsForSize( productAPI, filterdSizeVariants )
            const filterdTechnologyVariants = await getFilterdTechnologyVariants( filterdSizeVariants, technology || technologyOptionsForSize[0] )
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: filterdTechnologyVariants,
                options: [{ 
                    name: 'size', 
                    values: sizeOptions 
                }, { 
                    name: 'grip', 
                    values: technologyOptionsForSize 
                }],
            }
        } else {
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: '',
                options: [],
            }
        }
    }

    const getDeckItem = async( productAPI, size, concave, material ) => {
        const allVariantsArray = await getVariantsArray( productAPI )
        if ( allVariantsArray.length > 0 ) {
            const sizeOptions = await getSizeOptions( productAPI, allVariantsArray ) 
            const filterdSizeVariants = await getFilterdSizeVariants( allVariantsArray, size || sizeOptions[0] )
            const concaveOptionsForSize = await getConcaveOptionsForSize( productAPI, filterdSizeVariants )
            const filterdConcaveVariants = await getFilterdConcaveVariants( filterdSizeVariants, concave || concaveOptionsForSize[0] )
            const materialOptionsForConcave = await getMaterialOptionsForConcave( productAPI, filterdConcaveVariants )
            const filterdMaterialVariants = await getFilterdMaterialVariants( filterdConcaveVariants, material || materialOptionsForConcave[0] )
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: filterdMaterialVariants,
                options: [{ 
                    name: 'size', 
                    values: sizeOptions 
                }, { 
                    name: 'concave', 
                    values: concaveOptionsForSize 
                }, { 
                    name: 'material', 
                    values: materialOptionsForConcave 
                }],
            }
        } else {
            return { 
                title: productAPI.title,
                description: productAPI.descriptionHtml,
                images: productAPI.images,
                variant: '',
                options: [],
            }
        }
    }

    // ----- filter options

    const getcolorOptionsForheight = ( product, variantsArray ) => {
        return new Promise( resolve => {
            const allColorOptionsItem = product.options.filter( option => option.name === 'color' )
            const allColorArray = allColorOptionsItem[0].values.map( value => value.value )
            const filterdColorArray = allColorArray.filter( color => {
                const variantsArrayWithColor = variantsArray.filter( variant => variant.title.indexOf( color ) > -1 )
                return variantsArrayWithColor.length > 0
            })
            const sortedFilterdColorArray = sortColorsArray( filterdColorArray )
            resolve( sortedFilterdColorArray )
        })
    }

    const getHeightOptionsForWidth = ( product, variantsArray ) => {
        return new Promise( resolve => {
            const allHeightOptionsItem = product.options.filter( option => option.name === 'height' )
            const allHeightArray = allHeightOptionsItem[0].values.map( value => value.value )
            const filterdHeightArray = allHeightArray.filter( height => {
                const variantsArrayWithHeight = variantsArray.filter( variant => variant.title.indexOf( height ) > -1 )
                return variantsArrayWithHeight.length > 0
            })
            const sortedFilterdHeightArray = sortHeightArray( filterdHeightArray )
            resolve( sortedFilterdHeightArray )
        })
    }

    const getColorOptionsForAbec = ( product, variantsArray ) => {
        return new Promise( resolve => {
            const allColorOptionsItem = product.options.filter( option => option.name === 'color' )
            const allColorsArray = allColorOptionsItem[0].values.map( value => value.value )
            const filterdColorsArray = allColorsArray.filter( color => {
                const variantsArrayWithColors = variantsArray.filter( variant => variant.title.indexOf( color ) > -1 )
                return variantsArrayWithColors.length > 0
            })
            const sortedFilterdColorsArray = sortColorsArray( filterdColorsArray )
            resolve( sortedFilterdColorsArray )
        })
    }

    const getHardnessOptionsForColor = ( product, variantsArray ) => {
        return new Promise( resolve => {
            const allHardnessOptionsItem = product.options.filter( option => option.name === 'density' )
            const allHardnessArray = allHardnessOptionsItem[0].values.map( value => value.value )
            const filterdHardnessArray = allHardnessArray.filter( density => {
                const variantsArrayWithHardness = variantsArray.filter( variant => variant.title.indexOf( density ) > -1 )
                return variantsArrayWithHardness.length > 0
            })
            const sortedFilterdHardnessArray = sortHardnessArray( filterdHardnessArray )
            resolve( sortedFilterdHardnessArray )
        })
    }


    const getColorOptionsForSize = ( product, variantsArray ) => {
        return new Promise( resolve => {
            const allColorOptionsItem = product.options.filter( option => option.name === 'color' )
            const allColorsArray = allColorOptionsItem[0].values.map( value => value.value )
            const filterdColorsArray = allColorsArray.filter( color => {
                const variantsArrayWithColors = variantsArray.filter( variant => variant.title.indexOf( color ) > -1 )
                return variantsArrayWithColors.length > 0
            })
            const sortedFilterdColorsArray = sortColorsArray( filterdColorsArray )
            resolve( sortedFilterdColorsArray )
        })
    }

    const getTechnologyOptionsForSize = ( product, variantsArray ) => {
        return new Promise( resolve => {
            const allTechnologyOptionsItem = product.options.filter( option => option.name === 'grip' )
            const allTechnologysArray = allTechnologyOptionsItem[0].values.map( value => value.value )
            const filterdTechnologysArray = allTechnologysArray.filter( technology => {
                const variantsArrayWithTechnology = variantsArray.filter( variant => variant.title.indexOf( technology ) > -1 )
                return variantsArrayWithTechnology.length > 0
            })
            const sortedFilterdTechnologysArray = sortTechnologyArray( filterdTechnologysArray )
            resolve( sortedFilterdTechnologysArray )
        })
    }

    const getMaterialOptionsForConcave = ( product, variantsArray ) => {
        return new Promise( resolve => {
            const allMaterialOptionsItem = product.options.filter( option => option.name === 'material' )
            const allMaterialArray = allMaterialOptionsItem[0].values.map( value => value.value )
            const filterdMaterialArray = allMaterialArray.filter( material => {
                const variantsArrayWithMaterial = variantsArray.filter( variant => variant.title.indexOf( material ) > -1 )
                return variantsArrayWithMaterial.length > 0
            })
            const sorteFilterdMaterialArray = sortMaterialArray( filterdMaterialArray )
            resolve( sorteFilterdMaterialArray )
        })
    }

    const getConcaveOptionsForSize = ( product, variantsArray ) => {
        return new Promise( resolve => {
            const allConcaveOptionsItem = product.options.filter( option => option.name === 'concave' )
            const allConcavesArray = allConcaveOptionsItem[0].values.map( value => value.value )
            const filterdConcavesArray = allConcavesArray.filter( concave => {
                const variantsArrayWithConcave = variantsArray.filter( variant => variant.title.indexOf( concave ) > -1 )
                return variantsArrayWithConcave.length > 0
            })
            const sortedFilterdConcavesArray = sortConcaveArray( filterdConcavesArray )
            resolve( sortedFilterdConcavesArray )
        })
    }
    
    const getAbecOptions = ( product, allVariantsArray ) => {
        return new Promise( ( resolve, reject ) => {
            const allOptionItem = product.options.filter( option => option.name === 'abec' )
            const allOptionValuesArray = allOptionItem[0].values.map( value => value.value )
            if ( allVariantsArray && allVariantsArray.length > 0 ) {
                const optionValuesAvailableArray = allOptionValuesArray.filter( option => {
                    const test = allVariantsArray.filter( variant => variant.title.indexOf( option ) > -1 )
                    if (test.length > 0) {
                        return option
                    }
                })
                resolve( optionValuesAvailableArray )
            } else {
                reject()
            }
        })
    }

    const getColorOptions = ( product, allVariantsArray ) => {
        return new Promise( ( resolve, reject ) => {
            const allOptionItem = product.options.filter( option => option.name === 'color' )
            const allOptionValuesArray = allOptionItem[0].values.map( value => value.value )
            if ( allVariantsArray && allVariantsArray.length > 0 ) {
                const optionValuesAvailableArray = allOptionValuesArray.filter( option => {
                    const test = allVariantsArray.filter( variant => variant.title.indexOf( option ) > -1 )
                    if (test.length > 0) {
                        return option
                    }
                })
                resolve( optionValuesAvailableArray )
            } else {
                reject()
            }
        })
    }

    const getWidthOptions = ( product, allVariantsArray ) => {
        return new Promise( ( resolve, reject ) => {
            const allOptionItem = product.options.filter( option => option.name === 'width' )
            const allOptionValuesArray = allOptionItem[0].values.map( value => value.value )
            if ( allVariantsArray && allVariantsArray.length > 0 ) {
                const optionValuesAvailableArray = allOptionValuesArray.filter( option => {
                    const test = allVariantsArray.filter( variant => variant.title.indexOf( option ) > -1 )
                    if (test.length > 0) {
                        return option
                    }
                })
                resolve( optionValuesAvailableArray )
            } else {
                reject()
            }
        })
    }

    const getSizeOptions = ( productAPI, allVariantsArray ) => {
        return new Promise( ( resolve, reject ) => {
            const allOptionItem = productAPI.options.filter( option => option.name === 'size' )
            const allOptionValuesArray = allOptionItem[0].values.map( value => value.value )
            if ( allVariantsArray && allVariantsArray.length > 0 ) {
                const optionValuesAvailableArray = allOptionValuesArray.filter( option => {
                    const test = allVariantsArray.filter( variant => variant.title.indexOf( option ) > -1 )
                    if (test.length > 0) {
                        return option
                    }
                })
                resolve( optionValuesAvailableArray )
            } else {
                reject()
            }
        })
    }

    // ----- filter variants

    const getFilterdHeightVariants = ( variantsArray, height ) => {
        if ( variantsArray.length ) {
            return new Promise( resolve => {
                const filterdVariantsArray = variantsArray.filter( variant => {
                    const option = variant.selectedOptions.find( option => option.name === 'height') 
                    if ( option ) {
                        return option.value === height
                    } else {
                        return []
                    }
                })
                resolve( filterdVariantsArray )
            })
        } else {
            return new Promise( resolve => {
                const option = variantsArray.selectedOptions.find( option => option.name === 'height')
                if ( option.value === height ) {
                    resolve( variantsArray )
                } else {
                    resolve([])
                }
            })
        }
    }

    const getFilterdWidthVariants = ( variantsArray, width ) => {
        if ( variantsArray.length ) {
            return new Promise( resolve => {
                const filterdVariantsArray = variantsArray.filter( variant => {
                    const option = variant.selectedOptions.find( option => option.name === 'width') 
                    if ( option ) {
                        return option.value === width
                    } else {
                        return []
                    }
                })
                resolve( filterdVariantsArray )
            })
        } else {
            return new Promise( resolve => {
                const option = variantsArray.selectedOptions.find( option => option.name === 'width')
                if ( option.value === width ) {
                    resolve( variantsArray )
                } else {
                    resolve([])
                }
            })
        }
    }

    const getFilterdAbecVariants = ( variantsArray, abec ) => {
        if ( variantsArray.length ) {
            return new Promise( resolve => {
                const filterdVariantsArray = variantsArray.filter( variant => {
                    const option = variant.selectedOptions.find( option => option.name === 'abec') 
                    if ( option ) {
                        return option.value === abec
                    } else {
                        return []
                    }
                })
                resolve( filterdVariantsArray )
            })
        } else {
            return new Promise( resolve => {
                const option = variantsArray.selectedOptions.find( option => option.name === 'abec')
                if ( option.value === abec ) {
                    resolve( variantsArray )
                } else {
                    resolve([])
                }
            })
        }
    }

    const getFilterdColorVariants = ( variantsArray, color ) => {
        if ( variantsArray.length ) {
            return new Promise( resolve => {
                const filterdVariantsArray = variantsArray.filter( variant => {
                    const option = variant.selectedOptions.find( option => option.name === 'color') 
                    if ( option ) {
                        return option.value === color
                    } else {
                        return []
                    }
                })
                resolve( filterdVariantsArray )
            })
        } else {
            return new Promise( resolve => {
                const option = variantsArray.selectedOptions.find( option => option.name === 'color')
                if ( option.value === color ) {
                    resolve( variantsArray )
                } else {
                    resolve([])
                }
            })
        }
    }

    const getFilterdTechnologyVariants = ( variantsArray, grip ) => {
        if ( variantsArray.length ) {
            return new Promise( resolve => {
                const filterdVariantsArray = variantsArray.filter( variant => {
                    const option = variant.selectedOptions.find( option => option.name === 'grip') 
                    if ( option ) {
                        return option.value === grip
                    } else {
                        return []
                    }
                })
                resolve( filterdVariantsArray )
            })
        } else {
            return new Promise( resolve => {
                const option = variantsArray.selectedOptions.find( option => option.name === 'grip')
                if ( option.value === grip ) {
                    resolve( variantsArray )
                } else {
                    resolve([])
                }
            })
        }
    }

    const getFilterdMaterialVariants = ( variantsArray, material ) => {
        if ( variantsArray ) {
            return new Promise( resolve => {
                const filterdVariantsArray = variantsArray.filter( variant => {
                    const option = variant.selectedOptions.find( option => option.name === 'material') 
                    if ( option ) {
                        return option.value === material
                    } else {
                        return []
                    }
                })
                resolve( filterdVariantsArray )
            })
        } else {
            return []
        }
    }

    const getFilterdConcaveVariants = ( variantsArray, concave ) => {
        if ( variantsArray ) {
            return new Promise( resolve => {
                const filterdVariantsArray = variantsArray.filter( variant => {
                    const option = variant.selectedOptions.find( option => option.name === 'concave') 
                    if ( option ) {
                        return option.value === concave
                    } else {
                        return []
                    }
                })
                resolve( filterdVariantsArray )
            })
        } else {
            return []
        }
    }
    
    const getFilterdSizeVariants = ( variantsArray, size ) => {
        if ( variantsArray ) {
            return new Promise( resolve => {
                const filterdVariantsArray = variantsArray.filter( variant => {
                    const option = variant.selectedOptions.find( option => option.name === 'size') 
                    if ( option ) {
                        return option.value === size
                    } else {
                        return []
                    }
                })
                resolve( filterdVariantsArray )
            })
        } else {
            return []
        }
    }

    // ----- get variants

    const getVariantsArray = ( productAPI ) => {
        return new Promise( resolve => {
            const variantsArray = productAPI.variants.map( variant => variant )
            const availableVariantArray = variantsArray.filter( variant => variant.available )
            resolve( availableVariantArray )
        })
    }
    
    // ----- sort arrays

    const sortHeightArray = ( array ) => {
        let sorted = []
        const itemOne = array.find( item => item === 'low')
        const itemTwo = array.find( item => item === 'mid')
        const itemThree = array.find( item => item === 'heigh')
        if ( itemOne ) sorted.push( itemOne )
        if ( itemTwo ) sorted.push( itemTwo )
        if ( itemThree ) sorted.push( itemThree )
        return sorted
    }

    const sortColorsArray = ( array ) => {
        let sorted = []
        const itemOne = array.find( item => item === 'white')
        const itemTwo = array.find( item => item === 'black')
        const itemThree = array.find( item => item === 'silver')
        if ( itemOne ) sorted.push( itemOne )
        if ( itemTwo ) sorted.push( itemTwo )
        if ( itemThree ) sorted.push( itemThree )
        return sorted
    }

    const sortHardnessArray = ( array ) => {
        let sorted = []
        const itemOne = array.find( item => item === '99A')
        if ( itemOne ) sorted.push( itemOne )
        return sorted
    }

    const sortTechnologyArray = ( array ) => {
        let sorted = []
        const itemOne = array.find( item => item === 'regular')
        const itemTwo = array.find( item => item === 'pro')
        if ( itemOne ) sorted.push( itemOne )
        if ( itemTwo ) sorted.push( itemTwo )
        return sorted
    }

    const sortConcaveArray = ( array ) => {
        let sorted = []
        const itemOne = array.find( item => item === 'small')
        const itemTwo = array.find( item => item === 'medium')
        const itemThree = array.find( item => item === 'large')
        if ( itemOne ) sorted.push( itemOne )
        if ( itemTwo ) sorted.push( itemTwo )
        if ( itemThree ) sorted.push( itemThree )
        return sorted
    }

    const sortMaterialArray = ( array ) => {
        let sorted = []
        const itemOne = array.find( item => item === 'maple wood')
        if ( itemOne ) sorted.push( itemOne )
        return sorted
    }

    return { 
        updateItem
    }
}