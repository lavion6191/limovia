import React from 'react';
import styles from 'css/main.module.css';
import MediaQueries from 'ui/mediaQueries';
import Image from 'next/image';

import ManProfileFace from 'image/ManProfileFace.jpg';
import WomanProfileFace from 'image/WomenProfileFace.png';

export default function Contact() {
    const media = MediaQueries();

    const profiles = [
        { name: "Marcel Fontaine", role: "Verkställande Direktör", email: "marcel.fontaine@limovia.se", image: ManProfileFace },
        { name: "Mia Tussaud", role: "Försäljningsansvarig", email: "mia.tussaud@limovia.se", image: WomanProfileFace },
        { name: "Céline Chapelle", role: "Verksamhetschef - Region Stockholm / Västerås", email: "celine.chapelle@limovia.se", image: WomanProfileFace },
        { name: "Raphaël Dumas", role: "Verksamhetschef - Region Väst / Sydost", email: "raphael.dumas@limovia.se", image: ManProfileFace }
    ];

    return (
        <section id="contact" data-offset="70" className={`${media.mobileScreen ? `${styles.lvPaddingY50} ${styles.lvPaddingX10}` : `${styles.lvPadding50}`} ${styles.lvBgColorBlack}`}>
            <div>
                <h1 className={`${styles.lvColorCustomLightPink} ${styles.lvFontSize40} ${styles.lvFontWeightLighter} ${styles.lvTextAlignCenter} ${styles.lvFontNone}`}>
                    Hör av dig vid frågor och funderingar!
                </h1>
            </div>

            <div className={`${styles.lvFlex} ${styles.lvAlignItemsCenter} ${!media.largeScreen ? `${styles.lvFlexDirectionColumnReverse}` : ``}`}>
                <div className={`${styles.lvFlexBasis60P} ${styles.lvGrid} ${media.mobileScreen ? `${styles.lvGridGap30} ${styles.lvTextAlignCenter}` : `${media.extraSmallScreen || media.smallScreen ? `${styles.lvPaddingY40} ${styles.lvPaddingX10} ${styles.lvGridGap10}` : ``}`}`} style={{ gridTemplateColumns: `${media.mobileScreen ? `repeat(1, 1fr)` : `repeat(2, 1fr)`}` }}>
                    {profiles.map((profile, index) => (
                        <div key={index} className={`${styles.lvPadding15} ${styles.lvFontNone} ${styles.lvTransition500}`} style={{ boxShadow: "0px 8px 10px -5px rgba(25, 25, 25)" }}>
                            <figure>
                                <Image src={profile.image} alt={profile.name} className={`${media.mobileScreen ? `${styles.lvWidth350} ${styles.lvHeight250}` : `${media.extraSmallScreen ? `${styles.lvWidth200} ${styles.lvHeight150}` : `${media.smallScreen ? `${styles.lvWidth290} ${styles.lvHeight190}` : `${!media.largeScreen ? `${styles.lvWidth290} ${styles.lvHeight190}` : `${styles.lvWidth400} ${styles.lvHeight270}`}`}`}`} ${styles.lvBorderRadius3}`} style={{ maxWidth: `${media.mobileScreen ? `100%` : `${media.extraSmallScreen || media.smallScreen ? `150%` : `${!media.largeScreen ? `150%` : `100%`}`}`}`}}/>
                                <figcaption className={`${styles.lvColorCustomLightPink} ${styles.lvFontSize25} ${styles.lvFontWeightLighter} ${styles.lvTextAlignCenter}`}>
                                    {profile.name}
                                </figcaption>
                                <figcaption className={`${styles.lvColorWhite} ${styles.lvFontSize15} ${styles.lvTextAlignCenter} ${styles.lvFontRaleway}`}>
                                    {profile.role}
                                </figcaption>
                                <figcaption className={`${styles.lvColorWhite} ${styles.lvFontSize15} ${styles.lvTextAlignCenter} ${styles.lvFontRaleway}`}>
                                    {profile.email}
                                </figcaption>
                            </figure>
                        </div>
                    ))}
                </div>

                <div className={`${styles.lvFlexBasis40P} ${styles.lvPaddingY40} ${media.mobileScreen || media.extraSmallScreen || media.smallScreen ? `${styles.lvPaddingX10}` : `${styles.lvPaddingX60}`}`}>
                    <div className={`${styles.lvColorWhite} ${styles.lvPaddingY20} ${styles.lvLineHeight25} ${styles.lvLetterSpacing1} ${styles.lvFontRaleway} ${styles.lvBoxSizingBorderBox} ${styles.lvW100}`}>
                        <p>Använd formuläret nedan för att kontakta oss om du vill veta mer om Limovia. Eller ring oss på 08 777 83 47.</p>
                    </div>

                    <form>
                        <div className={`${styles.lvFlex} ${styles.lvJustifyContentSpaceBetween} ${styles.lvW100}`}>
                            <div className={`${styles.lvFlexBasis100P} ${styles.lvPadding3}`}>
                                <input
                                    type="text"
                                    placeholder="Namn"
                                    name="namn"
                                    required
                                    autoComplete="off"
                                    className={`${styles.lvBorderStyleSolid} ${styles.lvBorderWidth2} ${styles.lvBorderTopNone} ${styles.lvBorderRightNone} ${styles.lvBorderLeftNone} ${styles.lvFontSize15} ${styles.lvW100} ${styles.lvOutlineNone} ${styles.lvBgColorBlack} ${styles.lvFontStyleOblique} ${styles.lvColorWhite} ${styles.lvPadding10} ${styles.lvTransition500} ${styles.lvFontRoboto} ${styles.lvBoxSizingBorderBox} ${styles.lvBorderColorCustomGray1} ${styles.lvPlaceholderColorSemiTransparentWhite}`}
                                    onFocus={(e) => e.target.classList.add(styles.lvBorderColorWhite)}
                                    onBlur={(e) => e.target.classList.remove(styles.lvBorderColorWhite)}
                                />
                            </div>

                            <div className={`${styles.lvFlexBasis100P} ${styles.lvPadding3}`}>
                                <input
                                    type="text"
                                    placeholder="Efternamn"
                                    name="efternamn"
                                    required
                                    autoComplete="off"
                                    className={`${styles.lvBorderStyleSolid} ${styles.lvBorderWidth2} ${styles.lvBorderTopNone} ${styles.lvBorderRightNone} ${styles.lvBorderLeftNone} ${styles.lvFontSize15} ${styles.lvW100} ${styles.lvOutlineNone} ${styles.lvBgColorBlack} ${styles.lvFontStyleOblique} ${styles.lvColorWhite} ${styles.lvPadding10} ${styles.lvTransition500} ${styles.lvFontRoboto} ${styles.lvBoxSizingBorderBox} ${styles.lvBorderColorCustomGray1} ${styles.lvPlaceholderColorSemiTransparentWhite}`}
                                    onFocus={(e) => e.target.classList.add(styles.lvBorderColorWhite)}
                                    onBlur={(e) => e.target.classList.remove(styles.lvBorderColorWhite)}
                                />
                            </div>
                        </div>

                        <div className={`${styles.lvFlex} ${styles.lvJustifyContentSpaceBetween} ${styles.lvW100}`}>
                            <div className={`${styles.lvFlexBasis100P} ${styles.lvPadding3}`}>
                                <input
                                    type="email"
                                    placeholder="E-post"
                                    name="email"
                                    required
                                    autoComplete="off"
                                    className={`${styles.lvBorderStyleSolid} ${styles.lvBorderWidth2} ${styles.lvBorderTopNone} ${styles.lvBorderRightNone} ${styles.lvBorderLeftNone} ${styles.lvFontSize15} ${styles.lvW100} ${styles.lvOutlineNone} ${styles.lvBgColorBlack} ${styles.lvFontStyleOblique} ${styles.lvColorWhite} ${styles.lvPadding10} ${styles.lvTransition500} ${styles.lvFontRoboto} ${styles.lvBoxSizingBorderBox} ${styles.lvBorderColorCustomGray1} ${styles.lvPlaceholderColorSemiTransparentWhite}`}
                                    onFocus={(e) => e.target.classList.add(styles.lvBorderColorWhite)}
                                    onBlur={(e) => e.target.classList.remove(styles.lvBorderColorWhite)}
                                />
                            </div>

                            <div className={`${styles.lvFlexBasis100P} ${styles.lvPadding3}`}>
                                <input
                                    type="tel"
                                    placeholder="Telefonnummer"
                                    name="telefonNr"
                                    required
                                    autoComplete="off"
                                    className={`${styles.lvBorderStyleSolid} ${styles.lvBorderWidth2} ${styles.lvBorderTopNone} ${styles.lvBorderRightNone} ${styles.lvBorderLeftNone} ${styles.lvFontSize15} ${styles.lvW100} ${styles.lvOutlineNone} ${styles.lvBgColorBlack} ${styles.lvFontStyleOblique} ${styles.lvColorWhite} ${styles.lvPadding10} ${styles.lvTransition500} ${styles.lvFontRoboto} ${styles.lvBoxSizingBorderBox} ${styles.lvBorderColorCustomGray1} ${styles.lvPlaceholderColorSemiTransparentWhite}`}
                                    onFocus={(e) => e.target.classList.add(styles.lvBorderColorWhite)}
                                    onBlur={(e) => e.target.classList.remove(styles.lvBorderColorWhite)}
                                />
                            </div>
                        </div>

                        <div className={`${styles.lvFlexBasis100P} ${styles.lvPadding3}`}>
                            <input
                                type="text"
                                placeholder="Ämne"
                                name="ämne"
                                required
                                autoComplete="off"
                                className={`${styles.lvBorderStyleSolid} ${styles.lvBorderWidth2} ${styles.lvBorderTopNone} ${styles.lvBorderRightNone} ${styles.lvBorderLeftNone} ${styles.lvFontSize15} ${styles.lvW100} ${styles.lvOutlineNone} ${styles.lvBgColorBlack} ${styles.lvFontStyleOblique} ${styles.lvColorWhite} ${styles.lvPadding10} ${styles.lvTransition500} ${styles.lvFontRoboto} ${styles.lvBoxSizingBorderBox} ${styles.lvBorderColorCustomGray1} ${styles.lvPlaceholderColorSemiTransparentWhite}`}
                                onFocus={(e) => e.target.classList.add(styles.lvBorderColorWhite)}
                                onBlur={(e) => e.target.classList.remove(styles.lvBorderColorWhite)}
                            />
                        </div>

                        <div className={`${styles.lvFlexBasis100P} ${styles.lvPadding3}`}>
                            <textarea
                                name="message"
                                id="message"
                                rows="5"
                                placeholder="Meddelande"
                                required
                                className={`${styles.lvBorderStyleSolid} ${styles.lvBorderWidth2} ${styles.lvBorderTopNone} ${styles.lvBorderRightNone} ${styles.lvBorderLeftNone} ${styles.lvFontSize15} ${styles.lvW100} ${styles.lvOutlineNone} ${styles.lvBgColorBlack} ${styles.lvFontStyleOblique} ${styles.lvColorWhite} ${styles.lvPadding10} ${styles.lvTransition500} ${styles.lvFontRoboto} ${styles.lvBoxSizingBorderBox} ${styles.lvBorderColorCustomGray1} ${styles.lvPlaceholderColorSemiTransparentWhite}`}
                                style={{ resize: "none" }}
                                onFocus={(e) => e.target.classList.add(styles.lvBorderColorWhite)}
                                onBlur={(e) => e.target.classList.remove(styles.lvBorderColorWhite)}
                            ></textarea>
                        </div>

                        <div className={`${styles.lvPadding3}`}>
                            <button type="submit" className={`${styles.lvBgColorWhite} ${styles.lvColorBlack} ${styles.lvCursorPointer} ${styles.lvFontSizeLarger} ${styles.lvBorderStyleSolid} ${styles.lvBorderWidth2} ${styles.lvBorderColorWhite} ${styles.lvPadding10} ${styles.lvFontStyleOblique} ${styles.lvFontRaleway} ${styles.lvW100}`}>
                                Skicka
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    );
}
