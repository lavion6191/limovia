import styles from 'css/main.module.css'
import Logo from 'ui/logo'
import MediaQueries from 'ui/mediaQueries'

function NewFooterLinks() {
    const media = MediaQueries();

    const footerLinks = [
        { label: 'Allmänna villkor', href: '#' },
        { label: 'Integritetspolicy', href: '#' },
        { label: 'Tillgänglighet', href: '#' },
        { label: 'Limovia karriär', href: '#' },
        { label: 'Kontakt', href: '#' },
    ];

    const linkClass =
        (media.extraSmallScreen || media.mobileScreen || media.largeScreen) ? styles.lvBlock :
            (media.smallScreen || media.smallMediumScreen || media.mediumScreen || media.mediumLargeScreen) ? styles.lvInlineBlock : '';

    const paddingClass =
        (media.extraSmallScreen || media.mobileScreen) ? styles.lvPadding0_6Rem : '';

    return (
        <>
            {footerLinks.map(link => (
                <li key={link.label} className={`${styles.lvMarginX6} ${styles.lvListStyleNone} ${styles.lvMarginX6} ${linkClass} ${paddingClass}`}>
                    <a href={link.href} className={`${styles.lvColorWhite} ${styles.lvTextDecorationNone} ${styles.lvTransition300} ${styles.lvFontMontserrat}`}>
                        {link.label}
                    </a>
                </li>
            ))}
        </>
    );
}

export default function Footer() {
    const media = MediaQueries();

    let footerClass = '';
    if (media.mobileScreen || media.extraSmallScreen || media.smallScreen || media.smallMediumScreen || media.mediumScreen || media.mediumLargeScreen) {
        footerClass = `${styles.lvFlexDirectionColumn} ${styles.lvPaddingY15} ${styles.lvPaddingX20} ${styles.lvJustifyContentCenter}`;
    } else if (media.largeScreen) {
        footerClass = `${styles.lvJustifyContentSpaceBetween}`
    }

    return (
        <>
            <footer className={`${styles.lvBgColorBlack} ${styles.lvPositionRelative} ${styles.lvColorWhite} ${styles.lvW100} ${styles.lvTransition500} ${styles.lvPaddingY16}`}>
                <div className={`${styles.lvFlex} ${styles.lvFlexWrap} ${styles.lvTextAlignCenter} ${styles.lvAlignItemsCenter} ${styles.lvPaddingX35} ${styles.lvBoxSizingBorderBox} ${styles.lvTransition500} ${footerClass}`}>

                    {/* Top */}
                    <div className={`${styles.lvFlex} ${styles.lvFontNone} ${styles.lvAlignItemsCenter}`}>
                        <Logo href="#top" fontsize="1.5em" margin="0 20px 0 20px" />
                        <p className={`${styles.lvFontMontserrat} ${styles.lvMarginY8}`}>© 2024 Limovia Ltd</p>
                    </div>

                    {/* Bottom */}
                    <div className={`${styles.lvPadding5} ${styles.lvFlex} ${styles.lvAlignItemsCenter}`}>
                        <ul className={`${media.largeScreen ? `${styles.lvFlex}` : ``}`}>
                            <NewFooterLinks />
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
