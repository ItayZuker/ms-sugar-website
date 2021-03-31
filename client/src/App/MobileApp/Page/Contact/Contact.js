import React, { useState, useEffect, useContext } from 'react'
import ConfirmationMessage from './ConfirmationMessage/ConfirmationMessage'
import BadMessage from './BadMessage/BadMessage'
import emailjs from 'emailjs-com';
import { ShopContext } from '../../../../Context/shopContext';
import './contact.scss'
require('dotenv').config()

const Contact = () => {

    const [ loadComponent, setLoadComponent ] = useState( false )
    const [ notification, setNotification ] = useState( false )
    const [ textareaNotification, setTextareaNotification ] = useState( false )
    const [ confirmation, setConfirmation ] = useState( false )
    const [ badMessage, setBadMessage ] = useState( false )
    const { setKeyboardOpen, setAppState } = useContext( ShopContext )

    useEffect(() => {
        const html = document.querySelector('html')
        html.scrollTop = 0
        setAppState( prevState => {
            return { ...prevState, page: 'contact' }
        })
        setLoadComponent( true )
    }, [])

    const submitForm = e => {
        e.preventDefault()
        if ( e.target.message.value === '' ) {
            activateTextareaNotification()
        } else if ( e.target.email.value === '' ) {
            activateEmailNotification()
        } else {
            const message = e.target.message.value
            const email = e.target.email.value
            e.target.message.value= ''
            e.target.email.value= ''
            emailjs.send( 'gmail', 'contact_message', { message: message, email: email }, process.env.REACT_APP_STORE_FRONT_MAILJS_ID )
            .then(() => {
                confirmMessageSent()
            }, ( error ) => {
                setBadMessage( true )
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

    if ( confirmation ) return <ConfirmationMessage />
    if ( badMessage ) return <BadMessage setBadMessage={ setBadMessage }/>

    return (
        <div className={ 'contact_container ' + ( loadComponent ? 'load_component' : '' ) }>
            <form
                className='contact_form'
                onSubmit={ submitForm }>
                <h3>Tell me everything</h3>
                <textarea
                    className={ textareaNotification ? 'notification' : '' }
                    name='message'
                    type='textarea'
                    placeholder={ textareaNotification ? "You didn't write" : 'Write here...' }
                    onBlur={ () => setKeyboardOpen( false ) }
                    onFocus={ () => setKeyboardOpen( true ) }
                    ></textarea>
                <div className='lower_section'>
                    <div className='email_container'>
                        <h4>Email:</h4>
                        <input
                        className={ 'email_input ' + ( notification ? 'notification' : '' ) }
                        id='email'
                        name='email'
                        type='email'
                        placeholder={ notification ? 'please enter email' : 'example@mail.com' }
                        onBlur={ () => setKeyboardOpen( false ) }
                        onFocus={ () => setKeyboardOpen( true ) }></input>
                    </div>
                    <button
                        className='submit_button'
                        type='submit'>Send</button>
                </div>
            </form>
        </div>
    )
}

export default Contact