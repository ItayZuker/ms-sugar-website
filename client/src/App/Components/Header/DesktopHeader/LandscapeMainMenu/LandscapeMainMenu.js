import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../Context/shopContext'
import './landscape_main_menu.scss'

const LandscapeMainMenu = () => {

    const { appState, setAppState } = useContext(ShopContext)

    const history = useHistory()

    const selectPage = (page) => { 
        setAppState(prevState => {
            return { ...prevState, page: page }
        })
        history.push(`/${page}`)
    }

    return (
        <div className='landscape_nave_containet'>
            <div
                className='nav_item'
                onClick={ () => selectPage('mission') }
                >
                <h4
                    className={ appState.page === 'mission' ? 'selected' : '' }
                    >Mission</h4>
            </div>
            <div 
                className='nav_item'
                onClick={ () => selectPage('art') }
                >
                <h4
                    className={ appState.page ===  'art' ? 'selected' : '' }
                    >Art</h4>
            </div>
            <div 
                className='nav_item'
                onClick={ () => selectPage('shop') }
                >
                <h4
                    className={ appState.page === 'shop' ? 'selected' : '' }
                    >Shop <i className="fas fa-store"></i></h4>
            </div>
            <div 
                className='nav_item'
                onClick={ () => selectPage('cart') }
                >
                <h4
                    className={ appState.page === 'cart' ? 'selected' : '' }
                    >Cart (0)<i className="fas fa-shopping-cart"></i></h4>
            </div>
            <div 
                className='nav_item'
                onClick={ () => selectPage('contact') }
                >
                <h4
                    className={ appState.page === 'contact' ? 'selected' : '' }
                    >Contact</h4>
            </div>
        </div>
    )
}

export default LandscapeMainMenu

