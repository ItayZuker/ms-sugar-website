import React, { useState } from 'react'
import axios from 'axios'
import emailjs from 'emailjs-com';
import LoadingCoupon from '../LoadingCoupon/LoadingCoupon'
import ConfirmationCoupon from '../ConfirmationCoupon/ConfirmationCoupon'
import Problem from '../Problem/Problem'
import './text_form.scss'

const PictureForm = () => {

    const [ notification, setNotification ] = useState( '' )
    const [ errMessage, setErrMessage ] = useState( '' )
    const [ anonymous, setAnonymous ] = useState( false )
    const [ agreeTerms, setAgreeTerms ] = useState( false )
    const [ loading, setLoading ] = useState( false )
    const [ confirmation, setConfirmation ] = useState( false )
    const [ problem, setProblem ] = useState( false )
    const [ termsBody ] = useState(  
        `I agree that Ms. Sugar publish my art with a commercial purpose,
        and I understand that If Ms. Sugar publish my art, 
        my name will be published as the artist,
        unless I choose to be anonymous.` 
        )

    const trigerNotification = ( err, triger ) => {
        switch ( triger ) {
            case 'text':
                setErrMessage( err )
                setNotification( 'text' )
                break
            case 'name':
                setErrMessage( err )
                setNotification( 'name' )
                break
            case 'email':
                setErrMessage( err )
                setNotification( 'email' )
                break
            case 'terms':
                setErrMessage( err )
                setNotification( 'terms' )
                break
            default: break
            }
    }

    const sendText = ( name, text, email ) => {
        return new Promise( (resolve, reject) => {
            emailjs.send( 'gmail', 'text', { 
                name: name,
                text: text, 
                email: email, 
            }, process.env.REACT_APP_STORE_FRONT_MAILJS_ID )
                .then(() => {
                    resolve( true )
                }, ( error ) => {
                    reject( error )
                })
        })
    }

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
                })
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

    const validateText = ( e ) => {
        return new Promise(( resolve, reject ) => {
            if ( e.target.text.value === '' ) {
                reject( "Don't be shy.. Write:" )
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
            await validateText( e )
            await validateName( e )
            await validateEmail( e )
            await validateTerms( e )
            setLoading( true )
            const res = await fetch('/shopify/get-discount-coupon-text', {
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
                    text: e.target.text.value,
                }),
            })
            const { couponCode, userId } = await res.json()
            try {
                await sendClientMail( couponCode, e.target.name.value, e.target.email.value )
                sendText( e.target.name.value, e.target.text.value, e.target.email.value )
                setConfirmation( true )
                setLoading( false )
            } catch ( err ) {
                console.log( err )
                await fetch('/shopify/delete-text', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                    }),
                })
                setProblem( true )
                setLoading( false )
            }
        } catch ( err ) {
            console.log(err)
            switch ( err ) {
                case "Don't be shy.. Write:":
                    trigerNotification( err, 'text' )
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

    const checkAgreeTerms = () => {
        setNotification( '' )
        setErrMessage( '' )
        agreeTerms ? setAgreeTerms( false ) : setAgreeTerms( true )
    }

    const checkAnonimus = () => {
        setNotification( '' )
        setErrMessage( '' )
        anonymous ? setAnonymous( false ) : setAnonymous( true )
    }

    if ( loading ) return <LoadingCoupon />
    if ( confirmation ) return <ConfirmationCoupon />
    if ( problem ) return <Problem setProblem={ setProblem }/>

    return (
        <form 
            className='text_form'
            onSubmit={ submit }>
            <div className='left_container'>
                <div className='name_container'>
                    <h4>* Name:</h4>
                    <input
                    className={ 'name_input ' + ( notification  === 'name' ? 'notification ' : '' ) }
                    id='name'
                    name='name'
                    type='text'
                    placeholder={ notification === 'name' ? errMessage : 'your name'}
                    onClick={ () => {
                        setNotification( '' )
                        setErrMessage( '' )
                    }}>
                    </input>
                </div>
                <div className='email_container'>
                    <h4>* Email:</h4>
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
                    className='checkbox_container'
                    onClick={ checkAnonimus }>
                    <div className='checkbox'>{ anonymous ? <i className="fas fa-check"></i> : '' }</div>
                    <p>I would like to be anonimus.</p>
                </div>
                <div 
                    className='checkbox_container'
                    onClick={ checkAgreeTerms }>
                    <div className={ 'checkbox ' + ( notification === 'terms' ? 'notification ' : '' )}>{ agreeTerms ? <i className="fas fa-check"></i> : '' }</div>
                    <p>{ termsBody }</p>
                </div>
                <button
                    className='submit_button'
                    type='submit'
                    value='Send'>Send</button>
            </div>
            <div className='right_container'>
                <textarea
                    className={ notification === 'text' ? 'notification' : '' }
                    name='text'
                    type='textarea'
                    placeholder={ notification === 'text' ? errMessage : 'Your text:' }
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