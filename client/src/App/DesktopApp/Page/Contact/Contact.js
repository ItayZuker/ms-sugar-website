import React, { useState, useEffect, useContext } from 'react'
import LoadingMessage from './LoadingMessage/LoadingMessage'
import ConfirmationMessage from './ConfirmationMessage/ConfirmationMessage'
import ProblemWithMessage from './ProblemWithMessage/ProblemWithMessage'
import emailjs from 'emailjs-com';
import './contact.scss'
import { ShopContext } from '../../../../Context/shopContext';
require('dotenv').config()

const Contact = () => {

    const [ loadComponent, setLoadComponent ] = useState( false )
    const [ notification, setNotification ] = useState( false )
    const [ textareaNotification, setTextareaNotification ] = useState( false )
    const { setAppState, appState } = useContext( ShopContext )
    const [ loadingMessage, setLoadingMessage ] = useState( false )
    const [ confirmation, setConfirmation ] = useState( false )
    const [ badMessage, setBadMessage ] = useState( false )
    const [ textereaPlaceholder, setTextereaPlaceholder ] = useState()
    const [ textereaNotification, setTextereaNotification ] = useState()
    const [ emailNotification, setEmailNotification ] = useState()
    
    useEffect(() => {
        const html = document.querySelector( 'html' )
        html.scrollTop = 0
        setLoadComponent( true )
        setAppState( prevState => {
            return { ...prevState, page: 'contact' }
        })
    }, [])

    useEffect(() => {
        appState.language === 'english' ? setTextereaPlaceholder( 'Write here...' ) : setTextereaPlaceholder( 'מקום לכתוב...' )
        appState.language === 'english' ? setTextereaNotification( "You didn't write" ) : setTextereaNotification( 'לא כתבת' )
        appState.language === 'english' ? setEmailNotification( 'please enter email' ) : setEmailNotification( 'לא כתבת דוא"ל' )
    }, [ appState.language ])

    const submitForm = e => {
        e.preventDefault()
        if ( e.target.message.value === '' ) {
            activateTextareaNotification()
        } else if ( e.target.email.value === '' ) {
            activateEmailNotification()
        } else {
            setLoadingMessage( true )
            const message = e.target.message.value
            const email = e.target.email.value
            e.target.message.value= ''
            e.target.email.value= ''
            emailjs.send( 'gmail', 'contact_message', { message: message, email: email }, process.env.REACT_APP_STORE_FRONT_MAILJS_ID )
            .then(() => {
                confirmMessageSent()
                setLoadingMessage( false )
            }, ( error ) => {
                setBadMessage( true )
                setLoadingMessage( false )
                console.log( error );
            });
        }
    }

    const activateEmailNotification = () => {
        setNotification( true )
        setTimeout(() => {
            setNotification( false )
        }, 2000)
    }

    const activateTextareaNotification = () => {
        setTextareaNotification( true )
        setTimeout(() => {
            setTextareaNotification( false )
        }, 2000)
    }

    const confirmMessageSent = () => {
        setConfirmation( true )
        setTimeout(() => {
            setConfirmation( false )
        }, 4000)
    }

    if ( loadingMessage ) return <LoadingMessage />
    if ( confirmation ) return <ConfirmationMessage />
    if ( badMessage ) return <ProblemWithMessage setBadMessage={ setBadMessage }/>

    return (
        <div className={ 'desktop_contact_container ' + ( loadComponent ? 'load_component ' : '' ) + ( appState.language === 'english' ? '' : 'hebrew ') }>
            <form
                className='contact_form'
                onSubmit={ submitForm }>
                <h3>{ appState.language === 'english' ? 'Tell me everything' : 'מה על הלב?' }</h3>
                <textarea
                    className={ textareaNotification ? 'notification' : '' }
                    name='message'
                    type='textarea'
                    placeholder={ textareaNotification ? textereaNotification : textereaPlaceholder }
                    ></textarea>
                <div className='lower_section'>
                    <div className='email_container'>
                        <h4>
                            { appState.language === 'english' ? 'Email:' : 'דוא"ל:' }
                        </h4>
                        <input
                        className={ 'email_input ' + ( notification ? 'notification' : '' ) }
                        id='email'
                        name='email'
                        type='email'
                        placeholder={ notification ? emailNotification : 'example@mail.com' }
                        ></input>
                    </div>
                    <button
                        className='submit_button'
                        type='submit'>{ appState.language === 'english' ? 'Send' : 'שליחה' }</button>
                </div>
            </form>
        </div>
    )
}

export default Contact