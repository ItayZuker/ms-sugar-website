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
        To do that, we publish skaters art on social platforms,
        and we also publish a selected skaters art collection on our Sugar book.
        Share your art and celebrate your talent, we promise that we treat it with respect.
        Come up on the stage and join the Ms. Sugar Mission. This is why we're here.
    ` )
    const [ missionHEB ] = useState( `
        סקייטרים הם האנשים המוכשרים ביותר על כדור הארץ,
        והמשימה שלנו היא לתת במה לכישרון.
        חלק מהיצירות אנחנו מפרסמים בעמודי הרשת החברתית שלנו ובנוסף,
        אנחנו מוציאים לאור את הספר "שוגר"
        שכולל בתוכו אוסף יצירות נבחרות של סקייטרים שאנחנו מקבלים כאן אתר.
        אנחנו מבטיחים להתייחס ליצירות בכבוד.
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
        אנחנו מזמינים אתכם להשתמש בכישרון, ולשתף אותנו ביצירות אומנות שהכנתם.
        בתמורה, תקבלו למייל קופון של 10% הנחה על כל המוצרים באתר.
        אפשר לשלוח כל דבר.
        זה יכול להיות שיר שכתבתם, שרבוט מעניין במחברת, תמונה, ציור או כל דבר אחר.
        למי שמעוניין, אפשר לבחור להישאר אנונימי.
        כל עוד אתם היוצרים של היצירה ששלכתם, אפשר לשלוח כל דבר.
    
    ` )
    const [ sugarENG ] = useState( `
        Sugar is a book with a selected skaters art collection, 
        That we publish when we feel it's right.
        For now, because we're young, there's only one edition with the art of Itay Zuker.
        Itay is the creator of the Ms. Sugar company.
        If you're interested in skaters art, the book is on for sale.
        In the future, we will have a lot more books with skaters art collections from all around the world.
    ` )
    const [ sugarHEB ] = useState( `
        "שוגר" הוא ספר אומנות של סקייטרים.
        המטרה היא להוציא לאור ספר "שוגר" חדש, בכל פעם שאנחנו אוספים מספיק יצירות אומנות של סקייטרים.
        בינתיים, בגלל שאנחנו חדשים בעולם, יש רק מהדורה אחת עם האומנות של איתי צוקר.
        איתי הוא היוצר של מותג הסקייטבורד "מיס שוגר".
        אם אתם מתעניינים באומנות של סקייטרים או אומנות בכלל, הספר מוצע למכירה באתר.
        בעתיד יהיו עוד עותקים רבים של "שוגר" עם אוסף אומנות של סקייטרים מכל העולם. 

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
                        { appState.language === 'english' ? <i className="fas fa-caret-right"></i> : <i className="fas fa-caret-left"></i> }
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
                        { appState.language === 'english' ? <i className="fas fa-caret-right"></i> : <i className="fas fa-caret-left"></i> }
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
                        { appState.language === 'english' ? <i className="fas fa-caret-right"></i> : <i className="fas fa-caret-left"></i> }
                    </button>
                </div>
            </div>
        </div>
        </ScrollableAnchor>
    )
}

export default AboutMission