import React, { useContext, useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import LoadingCoupon from '../../LoadingCoupon/LoadingCoupon'
import ConfirmationCoupon from '../../ConfirmationCoupon/ConfirmationCoupon'
import Problem from '../../Problem/Problem'
import { ShopContext } from '../../../../../../Context/shopContext'
import './text_form.scss'
require('dotenv').config()

const TextForm = () => {
   
    const [ notification, setNotification ] = useState( '' )
    const [ errMessage, setErrMessage ] = useState( '' )
    const [ anonymous, setAnonymous ] = useState( false )
    const [ agreeTerms, setAgreeTerms ] = useState( false )
    const { setKeyboardOpen, appState } = useContext( ShopContext )
    const [ loading, setLoading ] = useState( false )
    const [ confirmation, setConfirmation ] = useState( false )
    const [ problem, setProblem ] = useState( false )
    const [ termsBody, setTermsBody ] = useState()
    const [ textereaPlaceholder, setTextereaPlaceholder ] = useState()
    const [ namePlaseholder, setNamePlaseholder ] = useState()
    const [ textENG ] = useState(  
        `Send us a visual you made, and you will get a 10% discount coupon. 
        It can be a sketch, a picture, a drawing, a painting or any other visual you made. 
        As long as you'r the artist, you can send us anything.` 
        )
    const [ textHEB ] = useState(  
        `שילחו תמונה של יצירה שכנתם, וקבלו קופון של 10% הנחה.
        זה יכול להיות שרבוט מעניין במחברת, תמונה, איור, ציור או כל דבר אחר.
        כל עוד אתם היוצרים, אפשר לשלוח הכל.` 
        )

    useEffect(() => {
        if ( appState.language === 'english' ) {
            setNamePlaseholder( 'your name' )
            setTextereaPlaceholder( 'Your text:' )
            setTermsBody( `
                    I agree that Ms. Sugar publish my art with a commercial purpose,
                    and I understand that If Ms. Sugar publish my art, 
                    my name will be published as the artist,
                    unless I choose to be anonymous.
                    ` )
        } else {
            setNamePlaseholder( 'השם שלך' )
            setTextereaPlaceholder( 'הטקסט שכתבת:' )
            setTermsBody( `
                    אני מסכים ל "מיס שוגר" לפרסם את האומנות שלי ולהשתמש בא למטרות מסחריות,
                    ואני מבין שאם היצירה שלי תתפרסם,
                    השם שלי יופיע לצד היצירה בתור היוצר אלא אם בחרתי להשאר אנונימי.
                    ` )
        }
    }, [ appState.language ])


    const trigerNotification = ( err, triger ) => {
        switch ( triger ) {
            case 'text':
                if ( appState.language !== 'english' ) err = 'לא כתבת טקסט'
                setErrMessage( err )
                setNotification( 'text' )
                break
            case 'name':
                if ( appState.language !== 'english' ) err = 'לא כתבת שם'
                setErrMessage( err )
                setNotification( 'name' )
                break
            case 'email':
                if ( appState.language !== 'english' ) err = 'לא כתבת דוא"ל'
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
            const couponCode = await res.json()
            await sendClientMail( couponCode, e.target.name.value, e.target.email.value )
            setConfirmation( true )
            setLoading( false )
            sendText( e.target.name.value, e.target.text.value, e.target.email.value )
        } catch ( err ) {
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
        <div className='text_form_container'>
             <form 
                onSubmit={ submit }
                encType="multipart/form-data">
                <p>{ appState.language === 'english' ? textENG : textHEB }</p>
                <textarea
                    className={ notification === 'text' ? 'notifocation' : '' }
                    maxLength="2000"
                    name='text'
                    type='textarea'
                    placeholder={ notification === 'text' ? errMessage : textereaPlaceholder }
                    onBlur={ () => setKeyboardOpen( false ) }
                    onFocus={ () => setKeyboardOpen( true ) }
                    onClick={ () => {
                        setNotification( '' )
                        setErrMessage( '' )
                    }}
                    ></textarea>
                <div className='name_container'>
                    <h4>
                        { appState.language === 'english' ? 'Name:' : 'שם:' }
                    </h4>
                    <input
                    className={ 'name_input ' + ( notification  === 'name' ? 'notification ' : '' ) }
                    id='name'
                    name='name'
                    type='text'
                    placeholder={ notification === 'name' ? errMessage : namePlaseholder }
                    onBlur={ () => setKeyboardOpen( false ) }
                    onFocus={ () => setKeyboardOpen( true ) }
                    onClick={ () => {
                        setNotification( '' )
                        setErrMessage( '' )
                    }}>
                    </input>
                </div>
                <div className='email_container'>
                    <h4>
                        { appState.language === 'english' ? 'Email:' : 'דוא"ל:' }
                    </h4>
                    <input
                    className={ 'email_input ' + ( notification === 'email' ? 'notification' : '' )}
                    id='email'
                    name='email'
                    type='email'
                    placeholder={ notification === 'email' ? errMessage : 'example@mail.com' }
                    onBlur={ () => setKeyboardOpen( false ) }
                    onFocus={ () => setKeyboardOpen( true ) }
                    onClick={ () => {
                        setNotification( '' )
                        setErrMessage( '' )
                    }}>
                    </input>
                </div>
                <div 
                    className={ 'checkbox_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }
                    onClick={ checkAnonimus }>
                    <div className='checkbox'>{ anonymous ? <i className="fas fa-check"></i> : '' }</div>
                    <p>
                        { appState.language === 'english' ? 'I would like to be anonimus.' : 'אני רוצה להשאר אנונימי' }
                    </p>
                </div>
                <div 
                    className={ 'checkbox_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }
                    onClick={ checkAgreeTerms }>
                    <div className={ 'checkbox ' + ( notification === 'terms' ? 'notification ' : '' )}>{ agreeTerms ? <i className="fas fa-check"></i> : '' }</div>
                    <p>{ termsBody }</p>
                </div>
                <button
                    className='submit_button'
                    type='submit'
                    value='Send'>Send</button>
            </form>
        </div>
    )
}

export default TextForm