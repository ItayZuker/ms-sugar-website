import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { ShopContext } from '../../../../../../Context/shopContext'
import emailjs from 'emailjs-com';
import LoadingCoupon from '../../LoadingCoupon/LoadingCoupon'
import ConfirmationCoupon from '../../ConfirmationCoupon/ConfirmationCoupon'
import Problem from '../../Problem/Problem'
import './picture_form.scss'
require('dotenv').config()

const PictureForm = () => {
    
    const [ notification, setNotification ] = useState( '' )
    const [ errMessage, setErrMessage ] = useState( '' )
    const [ anonymous, setAnonymous ] = useState( false )
    const [ agreeTerms, setAgreeTerms ] = useState( false )
    const { setKeyboardOpen, appState } = useContext( ShopContext )
    const [ file, setFile ] = useState()
    const [ loading, setLoading ] = useState( false )
    const [ confirmation, setConfirmation ] = useState( false )
    const [ problem, setProblem ] = useState( false )
    const [ fileName, setFileName ] = useState()
    const [ userNamePlaceholder, setUserNamePlaceholder ] = useState()
    const [ termsBody, setTermsBody ] = useState()
    const [ pictureENG ] = useState(  
        `Send us a visual you made, and you will get a 10% discount coupon. 
        It can be a sketch, a picture, a drawing, a painting or any other visual you made. 
        As long as you'r the artist, you can send us anything.` 
        )
    const [ pictureHEB ] = useState(  
        `שילחו תמונה של יצירה שכנתם, וקבלו קופון של 10% הנחה.
        זה יכול להיות שרבוט מעניין במחברת, תמונה, איור, ציור או כל דבר אחר.
        כל עוד אתם היוצרים, אפשר לשלוח הכל.` 
        )

    useEffect(() => {
        if ( appState.language === 'english') {
            setFileName( '5MB Max' )
            setUserNamePlaceholder( 'your name' )
            setTermsBody( `
                    I agree that Ms. Sugar publish my art with a commercial purpose,
                    and I understand that If Ms. Sugar publish my art, 
                    my name will be published as the artist,
                    unless I choose to be anonymous.
                    ` )
        } else {
            setFileName( 'עד 5MB' )
            setUserNamePlaceholder( 'השם שלך' )
            setTermsBody( `
                    אני מסכים ל "מיס שוגר" לפרסם את האומנות שלי ולהשתמש בא למטרות מסחריות,
                    ואני מבין שאם היצירה שלי תתפרסם,
                    השם שלי יופיע לצד היצירה בתור היוצר אלא אם בחרתי להשאר אנונימי.
                    ` )
        }
    }, [ appState.language ])

    const trigerNotification = ( err, triger ) => {
        switch ( triger ) {
            case 'file':
                setErrMessage( err )
                setNotification( 'file' )
                break
            case 'about':
                setErrMessage( err )
                setNotification( 'about' )
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

    const uploadFile = () => {
        return new Promise(( resolve, reject ) => {
            const formData = new FormData()
            formData.append( 'file', file )
            formData.append( 'upload_preset', 'sendArt' )
            const res = axios.post( 'https://api.cloudinary.com/v1_1/mssugarfiles/image/upload', formData )
            if ( res ) {
                resolve( res )
            } else {
                console.log('456')
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
                    if ( appState.language !== 'english' ) err = 'בעיה בקובץ'
                    trigerNotification( err, 'file' )
                    break
                case 'Please add file':
                    if ( appState.language !== 'english' ) err = 'לא בחרת קובץ'
                    trigerNotification( err, 'file' )
                    break
                case 'about':
                    trigerNotification( err, 'about' )
                    break
                case 'Please enter name':
                    if ( appState.language !== 'english' ) err = 'לא כתבת שם'
                    trigerNotification( err, 'name' )
                    break
                case 'Please enter email':
                    if ( appState.language !== 'english' ) err = 'לא כתבת דוא"ל'
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

    const validateFileSize = ( file ) => {
        return new Promise(( resolve, reject ) => {
            if( file.size >= 5000000 ) {
                reject( 'Max size 5MB' )
            } else {
                resolve( true )
            }
        }) 
    }

    const removeFile = () => {
        document.getElementById('inputFileId').value = null
        setFile()
        { appState.language === 'english' ? setFileName( '5MB Max' ) : setFileName( 'עד 5MB' )}
    }

    const onChange = async ( e ) => {
        setNotification( '' )
        setErrMessage( '' )
        const file = e.target.files[0]
        try {
            await validateFileSize( file )
            setFile( e.target.files[0] )
            setFileName( e.target.files[0].name )
        } catch ( err ) {
            trigerNotification( err, 'file' )
        } 
    }

    const clickInputFileButton = ( e ) => {
        e.preventDefault()
        const button = document.getElementById( 'inputFileId' )
        button.click()
    }

    if ( loading ) return <LoadingCoupon />
    if ( confirmation ) return <ConfirmationCoupon />
    if ( problem ) return <Problem setProblem={ setProblem }/>

    return (
        <div className='mobile_picture_form_container'>
            <form onSubmit={ submit }>
                <input 
                    type='file' 
                    name='file' 
                    hidden='hidden'
                    id='inputFileId'
                    onChange={ onChange }/>
                <p>{ appState.language === 'english' ? pictureENG : pictureHEB }</p>
                <button 
                    type="button"
                    className='choose_file_button'
                    onClick={ clickInputFileButton }>
                    { appState.language === 'english' ? 'Upload File' : 'לבחור קובץ' }    
                </button>  
                <div className='files_container'>
                    <h3 className={ notification === 'file' ? 'notification' : '' }>
                    { notification === 'file' ? errMessage : fileName }
                    </h3>
                    { file ? <i onClick={ removeFile } className="fas fa-times"></i> : null }
                </div>
                <textarea
                    className={ notification === 'about' ? 'notifocation' : '' }
                    name='about'
                    type='textarea'
                    placeholder={ appState.language === 'english' ? 'Write about this art..' : 'כמה מילים על היצירה..'}
                    onBlur={ () => setKeyboardOpen( false ) }
                    onFocus={ () => setKeyboardOpen( true ) }
                    onClick={ () => {
                        setNotification( '' )
                        setErrMessage( '' )
                    }}
                    ></textarea>
                <div className='name_container'>
                    <h4>
                        { appState.language === 'english' ? 'Name:' : 'שם:'}
                    </h4>
                    <input
                    className={ 'name_input ' + ( notification  === 'name' ? 'notification ' : '' ) }
                    id='name'
                    name='name'
                    type='text'
                    placeholder={ notification === 'name' ? errMessage : userNamePlaceholder }
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
                    { appState.language === 'english' ? 'Email:' : 'דוא"ל:'}
                    </h4>
                    <input
                    className={ 'email_input ' + ( notification === 'email' ? 'notification' : '' )}
                    id='email'
                    name='email'
                    type='email'
                    placeholder={ notification === 'email' ? errMessage : 'example@mail.com'}
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
                    <div className='checkbox'>
                        { anonymous ? <i className="fas fa-check"></i> : '' }
                    </div>
                    <p>
                        { appState.language === 'english' ? 'I would like to be anonimus.' : 'אני רוצה להשאר אנונימי.' }
                    </p>
                </div>
                <div 
                                        className={ 'checkbox_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }
                    onClick={ checkAgreeTerms }>
                    <div className={ 'checkbox ' + ( notification === 'terms' ? 'notification ' : '' )}>{ agreeTerms ? <i className="fas fa-check"></i> : '' }</div>
                    <p>{ termsBody }</p>
                </div>
                <button
                    className={ 'submit_button ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }
                    type='submit'
                    value='Send'>
                    { appState.language === 'english' ? 'Send' : 'שלח' }
                </button>
            </form>
        </div>
    )
}

export default PictureForm