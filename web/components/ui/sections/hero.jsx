import styles from 'css/main.module.css'
import MediaQueries from 'ui/mediaQueries'

export default function Hero() {

    const media = MediaQueries();

    return (
        <>
            {/* Hero Image */}
            <div className={`${styles.lvMinHeight100vh} ${styles.lvW100} ${styles.lvVolvoXC40White} ${styles.lvBackgroundPositionCenter} ${styles.lvBackgroundNoRepeat} ${styles.lvBackgroundSizeCover} ${styles.lvPositionRelative} ${styles.lvFontNone}`}>
                <div className={`${styles.lvPositionAbsolute} ${styles.lvTop50P} ${styles.lvLeft50P} ${styles.lvTranslateCenter} ${styles.lvLetterSpacing1} ${styles.lvColorWhite} ${styles.lvTextAlignCenter} ${styles.lvBoxSizingBorderBox} ${styles.lvPadding20} ${!media.largeScreen ? `${styles.lvW100}` : ``}`}>
                    <h1 className={`${styles.lvPaddingBottom20} ${styles.lvFontSize45} ${styles.lvFontWeight400} ${styles.lvBgColorSemiTransparent}`}>
                        
                        Lorem ipsum dolor sit.
                    
                    </h1>
                    <p className={`${styles.lvPaddingX80} ${styles.lvFontSize22} ${styles.lvBgColorSemiTransparent}`}>
                        
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem iusto earum accusantium.
                    
                    </p>
                </div>
            </div>
        </>
    )
}