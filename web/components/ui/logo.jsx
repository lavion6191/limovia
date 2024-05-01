import styles from 'css/main.module.css'
import React from 'react'
import { useRouter } from 'next/router'

export default function Logo({ href, title, fontsize, margin }) {

    const router = useRouter();
    const navigateTo = (path) => { router.push(path)};

    const defaultFontSize = '2em';

    const logoClasses = `
        ${styles.lvLogoGradient} 
        ${styles.lvWebkitBackgroundClipText} 
        ${styles.lvWebkitTextFillColorTransparent} 
        ${styles.lvFontWeightLighter} 
        ${styles.lvLetterSpacing2}
    `;

    const fontSizeStyle = fontsize ? { fontSize: fontsize } : { fontSize: defaultFontSize };
    const [marginTop = '42.8px', marginRight = '0px', marginBottom = '42.8px', marginLeft = '0px'] = margin ? margin.split(' ') : [];

    const logoContainerStyles = {
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
    };

    return (
        <>
            <div className={`${styles.lvTransition500} ${styles.lvFlex} ${styles.lvAlignItemsCenter} ${styles.lvJustifyContentCenter}`} style={logoContainerStyles}>
                <ul className={`${styles.lvFlex} ${styles.lvGap2Rem} ${styles.lvHoverScale1_1} ${styles.lvTransition500}`}>
                    <li className={`${styles.lvListStyleNone}`}>
                        {href ? (
                            <a onClick={() => navigateTo(href)} className={`${styles.lvTextDecorationNone} ${styles.lvColorWhite} ${styles.lvCursorPointer}`}>
                                <h1 className={`${logoClasses} ${styles.lvMarginTopAuto} ${styles.lvMarginBottomAuto}`} style={fontSizeStyle}>Limovia</h1>
                            </a>
                        ) : (
                            <h1 className={`${logoClasses} ${styles.lvMarginTopAuto} ${styles.lvMarginBottomAuto}`} style={fontSizeStyle}>Limovia</h1>
                        )}
                    </li>
                </ul>
                {title && typeof title === 'string' && title.trim() !== '' && <span className={`${styles.lvColorWhite} ${styles.lvFontSize30} ${styles.lvPaddingLeft4} ${styles.lvFontRaleway} ${styles.lvWhiteSpaceNoWrap}`}>{"| " + title}</span>}
            </div>
        </>
    );
}
