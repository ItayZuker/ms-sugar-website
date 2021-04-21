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
        We publish skaters art on our social platforms, 
        and we try to be inspiring as we can be.
        Share your art and celebrate your talent, 
        we promise that we treat it with respect.
        This is why we're here.
    ` )
    const [ missionHEB ] = useState( `
        סקייטרים הם האנשים המוכשרים ביותר על כדור הארץ,
        והמשימה שלנו היא לתת במה לכישרון.
        אנחנו מפרסמים אומנות של סקייטרים בעמודי הרשת שלנו,
        ותמיד ננסה להיות כמה שיותר מעוררי השראה.
        שתפו אותנו באומנות שלכם, ותעלו אל הבמה.
        אנחנו מבטיחים להתייחס לכל יצירה בכבוד,
        זו המשימה שבגללה אנחנו כאן.
    ` )
    const [ disscountENG ] = useState( `
        Skateboard is a form of art,
        and skaters are the most creative people on the planet.
        We believe that your creation is a little part of who you are,
        and we encourage you to share that with the world.
        For every work of art you send us, 
        you will get a one-time 10% discount on our skateshop.
        You can choose to be anonymous,
        and as long as you're the artist, 
        you can send us anything.
    ` )
    const [ disscountHEB ] = useState( `
        סקייטבורד הוא צורה של אומנות,
        וסקייטרים הם אנשים מוכשרים.
        אנחנו מאמינים שיצירה היא חלק מהאישיות של בן אדם,
        ולכן אנחנו מזמינים אתכם להשתמש בכישרון,
        ולשתף אותנו ואת העולם ביצירה שלכם.
        בתמורה, תקבלו 10% הנחה על כל המוצרים בחנות של האתר.
        למי שמעוניין, אפשר לבחור להשאר אנונימי,
        וכל עוד אתם אומנים של היצירה, אפשר לשלוח כל דבר.
    ` )
    const [ sugarENG ] = useState( `
        The Sugar book is where the Ms. Sugar company was born,
        and the writer of the book is the creator of the company, Itay Zuker.
        The book is a collection of his poems and drawing,
        and you can buy it on the website skateshop.
        All Future editions of the Sugar book,
        will be collections of selected skaters art we get here on the website.  
    ` )
    const [ sugarHEB ] = useState( `
        מותג הסקייטבורד 'מיס שוגר' נולד בתוך הספר 'שוגר'.
        איתי צוקר הוא הכותב של הספר וגם היוצר של החברה.
        הספר מציג אוסף של שירים ואיורים שהוא כתב,
        והוא זמין למכירה באתר.
        כל מהדורות הספר 'שוגר' שיצאו בעתיד,
        יציגו אוסף אומנות של סקייטרים שנקבל כאן באתר.
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
            {/* <div className='section_container'>
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
            </div> */}
        </div>
        </ScrollableAnchor>
    )
}

export default AboutMission