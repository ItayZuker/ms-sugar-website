import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import emailjs from 'emailjs-com';
import DndFile from './DndFile/DndFile'
import LoadingCoupon from '../LoadingCoupon/LoadingCoupon'
import ConfirmationCoupon from '../ConfirmationCoupon/ConfirmationCoupon'
import Problem from '../Problem/Problem'
import './picture_form.scss'
import { ShopContext } from '../../../../../Context/shopContext';

const PictureForm = () => {

    const { appState } = useContext( ShopContext )
    const [ notification, setNotification ] = useState( '' )
    const [ errMessage, setErrMessage ] = useState( '' )
    const [ anonymous, setAnonymous ] = useState( false )
    const [ agreeTerms, setAgreeTerms ] = useState( false )
    const [ file, setFile ] = useState()
    const [ loading, setLoading ] = useState( false )
    const [ confirmation, setConfirmation ] = useState( false )
    const [ problem, setProblem ] = useState( false )
    const [ namePlaceholder, setNamePlaceholder ] = useState()
    const [ termsBody, setTermsBody ] = useState()

    useEffect(() => {
        if ( appState.language === 'english' ) {
            setNamePlaceholder( 'your name' )
            setTermsBody( `
                I agree that Ms. Sugar publish my art with a commercial purpose,
                and I understand that If Ms. Sugar publish my art, 
                my name will be published as the artist,
                unless I choose to be anonymous.
                ` )
        } else {
            setNamePlaceholder( 'השם שלך' )
            setTermsBody( `
                אני מסכים ל "מיס שוגר" לפרסם את האומנות שלי ולהשתמש בא למטרות מסחריות,
                ואני מבין שאם היצירה שלי תתפרסם,
                השם שלי יופיע לצד היצירה בתור היוצר אלא אם בחרתי להשאר אנונימי.
                ` )
        }

    }, [ appState.language ])

    const sendClientMail = ( couponCode, name, email ) => {
        return new Promise( (resolve, reject) => {
            emailjs.send( 'gmail', 'coupon-message', { 
                couponCode: couponCode, 
                reply_to: email, 
                name: name,
            }, process.env.REACT_APP_STORE_FRONT_MAILJS_ID )
                    .then(() => {
                        resolve( true )
                    }, ( error ) => {
                        reject( error )
                    });
        } )
    }

    const trigerNotification = ( err, triger ) => {
        switch ( triger ) {
            case 'file':
                setErrMessage( appState.language === 'english' ? err : 'לא העלת קובץ')
                setNotification( 'file' )
                break
            case 'about':
                setErrMessage( err )
                setNotification( 'about' )
                break
            case 'name':
                setErrMessage( appState.language === 'english' ? err : 'לא כתבת שם' )
                setNotification( 'name' )
                break
            case 'email':
                setErrMessage( appState.language === 'english' ? err : 'לא כתבת דוא"ל' )
                setNotification( 'email' )
                break
            case 'terms':
                setErrMessage( err )
                setNotification( 'terms' )
                break
            default: break
            }
    }

    const uploadFile = async() => {
        return new Promise(( resolve, reject ) => {
            const formData = new FormData()
            formData.append( 'file', file )
            formData.append( 'upload_preset', 'sendArt' )
            const res = axios.post( 'https://api.cloudinary.com/v1_1/mssugarfiles/image/upload', formData )
            if ( res ) {
                resolve( res )
            } else {
                reject( 'bad_file' )
            }
        })
    }

    const validateTerms = ( e ) => {
        return new Promise(( resolve, reject ) => {
            if ( !agreeTerms ) {
                reject( 'terms' )
            } else {
                resolve( true )
            }
        })
    }

    const validateEmail = ( e ) => {
        return new Promise(( resolve, reject ) => {
            if ( e.target.email.value === '' ) {
                reject( 'Please enter email' )
            } else {
                resolve( true )
            }
        })
    }

    const validateName = ( e ) => {
        return new Promise(( resolve, reject ) => {
            if ( e.target.name.value === '' ) {
                reject( 'Please enter name' )
            } else {
                resolve( true )
            }
        })
    }

    const validateAbout = ( e ) => {
        return new Promise(( resolve, reject ) => {
            if ( e.target.about.value === '' ) {
                reject( 'about' )
            } else {
                resolve( true )
            }
        })
    }

    const validateFile = () => {
        return new Promise(( resolve, reject ) => {
            if ( !file ) {
                reject( 'Please add file' )
            } else {
                resolve( true )
            }
        })
    }

    const submit = async ( e ) => {
        e.preventDefault()
        setNotification( '' )
        setErrMessage( '' )
        try {
            await validateFile()
            await validateAbout( e )
            await validateName( e )
            await validateEmail( e )
            await validateTerms( e )
            setLoading( true )
            const cloudinaryData = await uploadFile()
            const res = await fetch('/shopify/get-discount-coupon-picture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: e.target.name.value,
                    anonymous: anonymous,
                    email: e.target.email.value,
                    termsBody: termsBody,
                    agreeTerms: agreeTerms,
                    aboutTheArt: e.target.about.value,
                    cloudinaryData: cloudinaryData.data,
                    fileSize: file.size
                }),
            })
            const { couponCode, userId } = await res.json()
            try {
                await sendClientMail( couponCode, e.target.name.value, e.target.email.value )
                setConfirmation( true )
                setLoading( false )
            } catch ( err ) {
                console.log( err )
                await fetch('/shopify/delete-picture', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cloudinaryData: cloudinaryData.data,
                        userId: userId,
                    }),
                })
                setProblem( true )
                setLoading( false )
            }
        } catch ( err ) {
            console.log(err)
            switch ( err ) {
                case 'bad_file':
                    trigerNotification( err, 'file' )
                    break
                case 'Please add file':
                    trigerNotification( err, 'file' )
                    break
                case 'about':
                    trigerNotification( err, 'about' )
                    break
                case 'Please enter name':
                    trigerNotification( err, 'name' )
                    break
                case 'Please enter email':
                    trigerNotification( err, 'email' )
                    break
                case 'terms':
                    trigerNotification( err, 'terms' )
                    break
                default: 
                    setProblem( true )
                    setLoading( false )
            }
        }
    }

    const checkAnonimus = () => {
        setNotification( '' )
        setErrMessage( '' )
        anonymous ? setAnonymous( false ) : setAnonymous( true )
    }

    const checkAgreeTerms = () => {
        setNotification( '' )
        setErrMessage( '' )
        agreeTerms ? setAgreeTerms( false ) : setAgreeTerms( true )
    }

    if ( loading ) return <LoadingCoupon />
    if ( confirmation ) return <ConfirmationCoupon />
    if ( problem ) return <Problem setProblem={ setProblem }/>

    return (
        <form 
            className='picture_form'
            onSubmit={ submit }>
            <div className='left_container'>
                <div className={ 'name_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
                    <h4>{ appState.language === 'english' ? '* Name:' : '* שם:' }</h4>
                    <input
                    className={ 'name_input ' + ( notification  === 'name' ? 'notification ' : '' ) }
                    id='name'
                    name='name'
                    type='text'
                    placeholder={ notification === 'name' ? errMessage : namePlaceholder }
                    onClick={ () => {
                        setNotification( '' )
                        setErrMessage( '' )
                    }}>
                    </input>
                </div>
                <div className={ 'email_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
                    <h4>
                        { appState.language === 'english' ? '* Email:' : '* דוא"ל:' }</h4>
                    <input
                    className={ 'email_input ' + ( notification === 'email' ? 'notification' : '' )}
                    id='email'
                    name='email'
                    type='email'
                    placeholder={ notification === 'email' ? errMessage : 'example@mail.com'}
                    onClick={ () => {
                        setNotification( '' )
                        setErrMessage( '' )
                    }}>
                    </input>
                </div>
                <div 
                    className={ 'checkbox_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }
                    onClick={ checkAnonimus }>
                    <div className='checkbox'>{ anonymous ? <i className="fas fa-check"></i> : '' }</div>
                    <p>
                        { appState.language === 'english' ? 'I would like to be anonymous.' : 'אני רוצה להשאר אנונימי' }</p>
                </div>
                <div 
                    className={ 'checkbox_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }
                    onClick={ checkAgreeTerms }>
                    <div className={ 'checkbox ' + ( notification === 'terms' ? 'notification ' : '' )}>{ agreeTerms ? <i className="fas fa-check"></i> : '' }</div>
                    <p>
                        { termsBody }</p>
                </div>
                <button
                    className='submit_button'
                    type='submit'
                    value='Send'>{ appState.language === 'english' ? 'Send' : 'שלח' }</button>
            </div>
            <div className='right_container'>
                <DndFile 
                    setFile={ setFile }
                    errMessage={ errMessage }/>
                <textarea
                    className={ ( appState.language === 'english' ? '' : 'hebrew ' ) + ( notification === 'about' ? 'notification ' : '' ) }
                    name='about'
                    type='textarea'
                    placeholder={ appState.language === 'english' ? 'Write about this art..' : 'כמה מילים על היצירה..' }
                    onClick={ () => {
                            setNotification( '' )
                            setErrMessage( '' )
                        }}>
                </textarea>
            </div>
        </form>
    )
}

export default PictureForm