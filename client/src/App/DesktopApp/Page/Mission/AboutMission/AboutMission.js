import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ScrollableAnchor from 'react-scrollable-anchor'

import { ShopContext } from '../../../../../Context/shopContext'
import './about_mission.scss'

const AboutMission = () => {

    const { setAppState, appState } = useContext( ShopContext )
    const [ missionENG ] = useState( `
        Ms. Sugar thinks that skaters are the most creative people on the planet,
        and our mission is to celebrate this talent.
        We publish skaters art on our social platform,
        And we also publish on our Sugar skaters art collection.
        Share your art and celebrate your talent.
        We encourage you to join the Ms. Sugar mission.
    ` )
    const [ missionHEB ] = useState( `
        סקייטרים הם האנשים המוכשרים ביותר על כדור הארץ,
        והמשימה שלנו היא לתת במה לכישרון.
        חלק מהיצירות אנחנו מפרסמים בעמודי הרשת החברתית שלנו ובנוסף,
        אנחנו מוציאים לאור את הספר "שוגר"
        שכולל בתוכו אוסף יצירות נבחרות של סקייטרים שאנחנו מקבלים כאן אתר.
        אנחנו מבטיחים להתיחס ליצירות בכבוד.
        שתפו אותנו ועלו על הבמה, זו המשימה שבגללה אנחנו כאן.
    ` )
    const [ disscountENG ] = useState( `
        Use your creativity to make a work of art, 
        and get a one time 10% discount for any purchase on the website.
        You can send us anything you want. 
        It can be a sketch, a poem or something else,
        and you can also choose to be anonymous.
        as long as you're the artist, you can send us anything.
    ` )
    const [ disscountHEB ] = useState( `
    סקייטרים הם האנשים המוכשרים ביותר על כדור הארץ,
        והמשימה שלנו היא לתת במה לכישרון.
        חלק מהיצירות אנחנו מפרסמים בעמודי הרשת החברתית שלנו ובנוסף,
        אנחנו מוציאים לאור את הספר "שוגר"
        שכולל בתוכו אוסף יצירות נבחרות של סקייטרים שאנחנו מקבלים כאן אתר.
        אנחנו מבטיחים להתיחס ליצירות בכבוד.
        שתפו אותנו ועלו על הבמה, זו המשימה שבגללה אנחנו כאן.
    ` )
    const [ sugarENG ] = useState( `
        Sugar is meant to be a collection book,
        with skaters art from all around the world.
        For now there's only one edition, with the art of Ms. Sugar creator: Itay Zuker.
        In the future we will publish more and more editions,
        with the art we get here on the website.
        Feel free to check it out, if you are interested in skaters art.
    ` )
    const [ sugarHEB ] = useState( `
        סקייטרים הם האנשים המוכשרים ביותר על כדור הארץ,
        והמשימה שלנו היא לתת במה לכישרון.
        חלק מהיצירות אנחנו מפרסמים בעמודי הרשת החברתית שלנו ובנוסף,
        אנחנו מוציאים לאור את הספר "שוגר"
        שכולל בתוכו אוסף יצירות נבחרות של סקייטרים שאנחנו מקבלים כאן אתר.
        אנחנו מבטיחים להתיחס ליצירות בכבוד.
        שתפו אותנו ועלו על הבמה, זו המשימה שבגללה אנחנו כאן.
    ` )
    const history = useHistory( )

    const goToShop = ( product ) => {
        setAppState( prevState => {
            return { ...prevState, 
                currentProductType: product, 
                productMenu: { open: false },
                page: 'shop'}
        })
        history.push( `/shop/${product}` )
    }

    const selectPage = ( page ) => {
        setAppState( prevState => {
            return { ...prevState,
                page: page }
        })
        history.push(`/${page}`)
    }

    return (
        <ScrollableAnchor id={ 'mission_section' }>
        <div className={ 'desktop_about_mission_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
            <div className='section_container'>
                <div className={ 'title_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
                    { appState.language === 'english' ? <i className="far fa-heart"></i> : null }
                    <h3>{ appState.language === 'english' ? 'Mission' : 'משימה' }</h3>
                    { appState.language === 'english' ? null : <i className="far fa-heart"></i> }
                </div>
                <p className={ appState.language === 'english' ? '' : 'hebrew' }>
                    { appState.language === 'english' ? missionENG : missionHEB }</p>
                <div className={ 'button_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
                    <button onClick={ () => goToShop( '' ) }>
                        { appState.language === 'english' ? 'Shop ' : 'חנות '} 
                        { appState.language === 'english' ? <i className="fas fa-caret-right"></i> : <i class="fas fa-caret-left"></i> }
                    </button>
                </div>
            </div>
            <div className='section_container'>
                <div className={ 'title_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
                    { appState.language === 'english' ? <i className="fas fa-percentage"></i> : null }
                    <h3>{ appState.language === 'english' ? 'Disscount' : 'הנחות' }</h3>
                    { appState.language === 'english' ? null : <i className="fas fa-percentage"></i> }
                </div>
                <p className={ appState.language === 'english' ? '' : 'hebrew' }>
                    { appState.language === 'english' ? disscountENG : disscountHEB }</p>
                <div className={ 'button_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
                    <button onClick={ () => selectPage('discount') }>
                        { appState.language === 'english' ? 'Discount ' : 'הנחות '}
                        { appState.language === 'english' ? <i className="fas fa-caret-right"></i> : <i class="fas fa-caret-left"></i> }
                    </button>
                </div>
            </div>
            <div className='section_container'>
                <div className={ 'title_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>

                    { appState.language === 'english' ? <i className="fas fa-skull-crossbones"></i> : null }
                    <h3>{ appState.language === 'english' ? 'Sugar' : 'שוגר'}</h3>
                    { appState.language === 'english' ? null :  <i className="fas fa-skull-crossbones"></i> }

                </div>
                <p className={ appState.language === 'english' ? '' : 'hebrew' }>
                    { appState.language === 'english' ? sugarENG : sugarHEB }</p>
                <div className={ 'button_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
                    <button onClick={ () => goToShop('sugar') }>  
                        { appState.language === 'english' ? 'Sugar ' : 'שוגר '}
                        { appState.language === 'english' ? <i className="fas fa-caret-right"></i> : <i class="fas fa-caret-left"></i> }
                    </button>
                </div>
            </div>
        </div>
        </ScrollableAnchor>
    )
}

export default AboutMission