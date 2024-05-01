import styles from 'css/main.module.css'
import MediaQueries from 'ui/mediaQueries'
import Image from 'next/image'
import { useRouter } from 'next/router'

export function NumCard({ top, bottom }) {
    return (
        <div>
            <p className={`${styles.lvFontSize5Rem} ${styles.lvPaddingBottom10} ${styles.lvTransition500} ${styles.lvFontHedvigLettersSerif}`}>{top}</p>
            <p className={`${styles.lvFontSizeLarger} ${styles.lvFontMontserrat}`}>{bottom}</p>
        </div>
    )
}

export function OurServiceCard({ top, bottom, booking, readMore, image, imageAlt }) {
    const media = MediaQueries();
    const router = useRouter();

    const buttonToBooking = () => router.push(booking)
    const buttonToReadMore = () => router.push(readMore)

    return (
        <>
            <div className={`${styles.lvTransition300} ${styles.lvBorderStyleSolid} ${styles.lvBorderTopNone} ${styles.lvBorderLeftNone} ${styles.lvBorderRightNone} ${styles.lvBorderColorCustomLightOrange1} ${styles.lvBorderWidth1}`} style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.6)" }}>
                
                {/* Image of the card */}
                <Image src={image} alt={imageAlt} className={`${styles.lvW100} ${styles.lvHeight250} ${styles.lvObjectFitCover}`}/>
                
                {/* Information of the card */}
                <div className={`${styles.lvPaddingY10} ${styles.lvPaddingX20}`}>
                    <h2 className={`${styles.lvFontWeightLighter} ${styles.lvFontSize28} ${styles.lvColorCustomLightPink} ${styles.lvPaddingBottom15}`}>
                        {top}
                    </h2>
                    <p className={`${styles.lvColorWhite} ${styles.lvFontRaleway} ${styles.lvFontSize16}`}>
                        {bottom}
                    </p>
                </div>
                
                {/* Navigation of the card */}
                <div>
                    <ul className={`${styles.lvFlex} ${styles.lvBoxSizingBorderBox} ${styles.lvPaddingY25} ${styles.lvPaddingX20} ${styles.lvListStyleNone}`}>
                        <li>
                            <a onClick={buttonToBooking} className={`${styles.lvTextDecorationNone} ${styles.lvColorBlack} ${styles.lvBgColorWhite} ${styles.lvPaddingY15} ${styles.lvPaddingX50} ${styles.lvTransition500} ${styles.lvBorderStyleSolid} ${styles.lvBorderWidth1} ${styles.lvBorderColorWhite} ${styles.lvFontRaleway} ${styles.lvFontStyleOblique} ${styles.lvCursorPointer}`}>
                                Boka
                            </a>
                        </li>
                        
                        <li>
                            <a onClick={buttonToReadMore} className={`${styles.lvTextDecorationNone} ${styles.lvColorWhite} ${styles.lvTransition500} ${styles.lvPadding5} ${styles.lvFontRaleway} ${!media.largeScreen ? `${styles.lvMargin10}` :`${styles.lvMargin30}`}`}>
                                Läs mer
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export function QuestionCard({ top, bottom }) {
    const media = MediaQueries();

    return (
        <>
            <div className={`${styles.lvMaxWidth390} ${styles.lvMargin30} ${styles.lvFontNone}`}>
                <h2 className={`${styles.lvColorCustomLightPink} ${styles.lvPaddingBottom25} ${styles.lvFontWeightLighter} ${styles.lvFontSize25} ${media.mobileScreen || media.extraSmallScreen ? `${styles.lvHeight115}`:`${media.smallScreen ? `${styles.lvHeight120}`:`${!media.largeScreen ? `${styles.lvHeight150}`:`${styles.lvHeight100}`}`}`}`}>
                    {top}
                </h2>
                <p className={`${styles.lvColorWhite} ${styles.lvFontRaleway} ${styles.lvLetterSpacing1} ${styles.lvLineHeight25}`}>
                    {bottom}
                </p>
            </div>
        </>
    )
}

import CarImage from 'icon/car-solid.svg'
import UserImage from 'icon/user-solid.svg'
import SuitcaseImage from 'icon/suitcase-solid.svg'
import GasPumpImage from 'icon/gas-pump-solid.svg'
import PlugSolidImage from 'icon/plug-solid.svg'
import WifiSolidImage from 'icon/wifi-solid.svg'
import GlassWaterSolidImage from 'icon/glass-water-solid.svg'
import DropletImage from 'icon/droplet-solid.svg'

function FleetIconCard({ image, imageAlt, text }) {
    const media = MediaQueries();

    return <>
        <div>
            <span className={`${styles.lvFlex} ${styles.lvPadding20} ${styles.lvBgColorWhite} ${styles.lvJustifyContentCenter} ${styles.lvTextAlignCenter} ${styles.lvBorderRadius5}`}>
                <Image 
                src={image} 
                alt={imageAlt}
                className={`${media.mobileScreen || media.extraSmallScreen ? `${styles.lvWidth15} ${styles.lvHeight15}` : `${styles.lvWidth25} ${styles.lvHeight25}`}`}
                />
            </span>

            <p className={`${media.mobileScreen || media.extraSmallScreen ? `${styles.lvFontSize10}` : `${styles.lvFontSize15}`} ${styles.lvPaddingTop5} ${styles.lvFontRaleway} ${styles.lvLetterSpacing1} ${styles.lvLineHeight25}`}>
                {text}
            </p>
        </div>
    </>
}


export function FleetCard({ image, imageAlt, model, description, type, seats, luggage, power, USB_C, USB_A, FourG, FiveG, water, color }) {
    const media = MediaQueries();

    return (
        <>
            <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter} ${styles.lvBorderStyleSolid} ${styles.lvBorderWidth2} ${styles.lvBorderColorCustomLightOrange1} ${styles.lvBorderRightNone} ${styles.lvBorderLeftNone} ${styles.lvBorderTopNone} ${styles.lvBoxSizingBorderBox} ${!media.largeScreen ? `${styles.lvFlexDirectionColumn}` : ``}`} style={{ flex: "0 0 100%", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.6)" }}>
                <div className={`${styles.lvFlex} ${styles.lvBoxSizingBorderBox}`}>
                    <Image 
                    src={image}
                    alt={imageAlt}
                    className={`${media.mobileScreen || media.extraSmallScreen ? `${styles.lvWidth300} ${styles.lvHeight200}` : `${media.smallScreen ? `${styles.lvWidth640} ${styles.lvHeight500}` : `${!media.largeScreen ? `${styles.lvWidth902} ${styles.lvHeight500}` : `${styles.lvWidth800} ${styles.lvHeight410}`}`}`} ${styles.lvObjectFitCover} ${styles.lvBoxSizingBorderBox}`}
                    />
                </div>
                <div className={`${styles.lvColorWhite} ${styles.lvPadding20}`}>
                    
                    {/* Car Model */}
                    <h1 className={`${media.mobileScreen || media.extraSmallScreen ? `${styles.lvFontSize35}`:`${styles.lvFontSize40}`} ${styles.lvFontWeightLighter} ${styles.lvColorCustomLightPink} ${styles.lvTextAlignCenter} ${styles.lvPadding20} ${styles.lvFontNone}`}>
                        {model}
                    </h1>

                    {/* Car Description */}
                    <p className={`${styles.lvTextAlignCenter} ${styles.lvPadding10} ${styles.lvFontRaleway} ${styles.lvLetterSpacing1} ${styles.lvLineHeight25}`}>
                        {description}
                    </p>

                    {/* Car Specifications */}
                    <div>
                        <div className={`${styles.lvGrid} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter} ${styles.lvTextAlignCenter} ${styles.lvUserSelectNone}`} style={{ gridTemplateColumns: `${media.mobileScreen || media.extraSmallScreen ? `repeat(4, 65px)`:`repeat(4, 90px)`}`, gridGap: `${media.mobileScreen || media.extraSmallScreen ? `5px`:`15px`}` }}>
                            
                            <FleetIconCard 
                                image={CarImage}
                                imageAlt="car"
                                text={type}
                            />

                            <FleetIconCard 
                                image={UserImage}
                                imageAlt="user"
                                text={seats}
                            />

                            <FleetIconCard 
                                image={SuitcaseImage}
                                imageAlt="suitcase"
                                text={luggage}
                            />

                            <FleetIconCard 
                                image={GasPumpImage}
                                imageAlt="gas pump"
                                text={power ? power : "Unknown"}
                            />

                            {(USB_A.toLowerCase() === "true" || USB_C.toLowerCase() === "true") && (
                                <FleetIconCard 
                                    image={PlugSolidImage}
                                    imageAlt="plug"
                                    text={`USB- ${USB_C.toLowerCase() === "true" ? `C${USB_A.toLowerCase() === "true" ? `/A`:``}` : `${USB_A.toLowerCase() === "true" ? `A`:``}`}`}
                                />
                            )}

                            {(FourG.toLowerCase() === "true" || FiveG.toLowerCase() === "true") && (
                                <FleetIconCard 
                                    image={WifiSolidImage}
                                    imageAlt="wifi"
                                    text={`${FourG.toLowerCase() === "true" ? `4G${FiveG.toLowerCase() === "true" ? '/5G' : ''}` : `${FiveG.toLowerCase() === "true" ? '5G' : ''}`}`}
                                />
                            )}


                            {(water.toLowerCase() === "true") && (
                                <FleetIconCard 
                                    image={GlassWaterSolidImage}
                                    imageAlt="glass water"
                                    text="Vatten"
                                />
                            )}
                            
                            <FleetIconCard 
                                image={DropletImage}
                                imageAlt="droplet"
                                text={color}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}