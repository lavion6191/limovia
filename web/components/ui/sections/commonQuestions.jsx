import styles from 'css/main.module.css'
import { useEffect, useState } from 'react';
import { QuestionCard } from 'ui/cards';
import MediaQueries from 'ui/mediaQueries'

export default function CommonQuestions() {
    const media = MediaQueries();

    const [isFocused, setIsFocused] = useState(false);

    return(
        <>
            <section id="FAQ" data-offset="71" className={`${styles.lvMinHeight60vh} ${styles.lvW100} ${styles.lvWomanExitsCar} ${styles.lvBackgroundPositionCenter} ${styles.lvBackgroundNoRepeat} ${styles.lvBackgroundSizeCover} ${styles.lvPositionRelative}`}>
                <div className={`${styles.lvTop50P} ${styles.lvLeft50P} ${styles.lvPositionAbsolute} ${styles.lvTranslateCenter} ${styles.lvLetterSpacing1} ${styles.lvColorWhite} ${styles.lvTextAlignCenter} ${styles.lvBoxSizingBorderBox} ${styles.lvPadding20} ${!media.largeScreen ? `${styles.lvW100}` : ``}`}>
                    <h1 className={`${styles.lvPaddingBottom20} ${styles.lvFontSize45} ${styles.lvFontWeight400}`}>
                        Allt du behöver veta
                    </h1>
                    <p className={`${styles.lvLineHeight25} ${styles.lvFontStyleOblique} ${styles.lvFontRaleway} ${media.largeScreen ? `${styles.lvPaddingX100}` : ``}`}>
                        Här hittar du svaren.
                    </p>
                </div>
            </section>
            
            <section className={`${styles.lvBgColorBlack} ${media.mobileScreen || media.extraSmallScreen ||media.smallScreen ? `${styles.lvPaddingY50} ${styles.lvPaddingX20}` : `${styles.lvPadding50}`} ${styles.lvBoxSizingBorderBox}`}>
                <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter} ${styles.lvBoxSizingBorderBox}`}>
                    <form className={`${styles.lvFlex}`} action="https://youtu.be/0-7IHOXkiV8?si=Ipa8abByRP5gL_aY&amp;t=116">
                        <input 
                        type="text"
                        className={`${styles.lvPadding17} ${styles.lvBorderStyleSolid} ${isFocused ? styles.lvBorderColorWhite : styles.lvBorderColorCustomGray1} ${styles.lvBorderWidth2} ${styles.lvBorderRightNone} ${styles.lvBgColorBlack} ${styles.lvFontRoboto} ${styles.lvOutlineNone} ${styles.lvFontSize15} ${styles.lvWidth430} ${styles.lvFontStyleOblique} ${styles.lvTransition500} ${styles.lvColorAliceBlue} ${styles.lvPlaceholderColorCustomGray1} ${styles.lvPlaceholderFontSize18}`}
                        placeholder="sök här" 
                        name="search" 
                        required="" 
                        autoComplete="off"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={{ color: 'var(--CustomGray1)' }}
                        />

                        <button 
                            type="submit"
                            className={`${styles.lvPadding17} ${styles.lvBgColorWhite} ${styles.lvColorBlack} ${styles.lvCursorPointer} ${styles.lvFontSizeLarger} ${styles.lvWidth70} ${styles.lvTransition500} ${styles.lvBorderStyleSolid} ${styles.lvBorderColorCustomGray1} ${styles.lvBorderLeftNone} ${styles.lvBorderWidth2}`}
                            onMouseEnter={(e) => { e.target.classList.remove(styles.lvBgColorWhite); e.target.classList.remove(styles.lvColorBlack); e.target.classList.add(styles.lvBgColorBlack); e.target.classList.add(styles.lvColorWhite)}}
                            onMouseLeave={(e) => { e.target.classList.remove(styles.lvBgColorBlack); e.target.classList.remove(styles.lvColorWhite); e.target.classList.add(styles.lvBgColorWhite); e.target.classList.add(styles.lvColorBlack)}}
                        >
                            <i className="fa fa-search"/>
                        </button>

                    </form>
                </div>

                <div className={`${media.mobileScreen || media.extraSmallScreen || media.smallScreen ? `${styles.lvGrid}`:`${styles.lvFlex}`} ${styles.lvAlignItemsFlexStart} ${styles.lvJustifyContentCenter} ${styles.lvColorWhite} ${styles.lvPaddingTop70}`} 
                style={{ 
                    gridTemplateColumns: `${media.mobileScreen || media.extraSmallScreen ? `repeat(1, 1fr)` : `${media.smallScreen ? `repeat(2, 1fr)` : ``}`}` 
                }}>
                    <QuestionCard 
                    top="Lorem, ipsum dolor sit amet consectetur adipisicing." 
                    bottom="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ad aut rem unde nostrum porro natus reiciendis debitis ducimus 
                    molestias, repudiandae, rerum consequuntur labore ipsam quas?"
                    />
                    <QuestionCard 
                    top="Lorem ipsum dolor sit amet consectetur adipisicing elit." 
                    bottom="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ad aut rem unde nostrum porro natus reiciendis debitis ducimus 
                    molestias, repudiandae, rerum consequuntur labore ipsam quas?"
                    />
                    <QuestionCard 
                    top="Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis." 
                    bottom="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ad aut rem unde nostrum porro natus reiciendis debitis ducimus 
                    molestias, repudiandae, rerum consequuntur labore ipsam quas?"
                    />
                </div>
            </section>
        </>
    )
}