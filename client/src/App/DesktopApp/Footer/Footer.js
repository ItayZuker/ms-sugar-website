import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../Context/shopContext'
import './footer.scss'

const Footer = () => {

    const { appState, setAppState, itemsInCart } = useContext( ShopContext )
    const history = useHistory()

    const selectPage = (page) => {
        setAppState(prevState => {
            return { ...prevState, page: page }
        })
        history.push(`/${page}`)
    }

    return (
        <div className={ 'desktop_footer_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
            <div className='navbar_menu'>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('mission')}>
                    <h3
                        className={ appState.page === 'mission' ? 'selected' : '' }
                        >{ appState.language === 'english' ? 'Mission' : 'משימה' }</h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('shop')}>
                    <h3
                        className={ appState.page === 'shop' ? 'selected' : '' }>
                        <i className="fas fa-store"></i>
                        { appState.language === 'english' ? 'Shop' : 'חנות' }
                    </h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('discount')}>
                    <h3
                        className={ appState.page === 'discount' ? 'selected' : '' }
                        >{ appState.language === 'english' ? 'Discount' : 'הנחות' }</h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('cart')}>
                    <h3
                        className={ appState.page === 'cart' ? 'selected' : '' }>
                        <i className="fas fa-shopping-cart"></i>
                        ({itemsInCart})
                        { appState.language === 'english' ? ' Cart' : ' עגלה' } 
                    </h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('contact')}>
                    <h3
                        className={ appState.page === 'contact' ? 'selected' : '' }
                        >{ appState.language === 'english' ? 'Contact' : 'צור קשר' }</h3>
                </div>
            </div>
            <div className='social_container'>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('mission')}>
                    <h3
                        className={ appState.page === 'mission' ? 'selected' : '' }>
                        <i className="fab fa-twitter"></i>
                        { appState.language === 'english' ? 'Twitter' : 'טוויטר' }
                    </h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('mission')}>
                    <h3
                        className={ appState.page === 'mission' ? 'selected' : '' }>
                        <i className="fab fa-instagram"></i>
                        { appState.language === 'english' ? 'Instagram' : 'אינסטגרם' }
                    </h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('mission')}>
                    <h3
                        className={ appState.page === 'mission' ? 'selected' : '' }>
                        <i class="fab fa-facebook-square"></i>
                        { appState.language === 'english' ? 'Facebook' : 'פייסבוק' }
                    </h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('mission')}>
                    <h3
                        className={ appState.page === 'mission' ? 'selected' : '' }>
                        <i class="fab fa-youtube"></i>
                        { appState.language === 'english' ? 'YouTube' : 'יוטיוב' }
                    </h3>
                </div>
            </div>

            <div className='copyright_container'>
                { appState.language === 'english' ? <p>Copyright <i className="far fa-copyright"></i> Ms. Sugar Inc. All rights reserved</p> : null }
                { appState.language === 'english' ? null : <p><i className="far fa-copyright"></i> כל הזכויות שמורות ל  "מיס שוגר"</p> }
            </div>
        </div>
    )
}

export default Footer