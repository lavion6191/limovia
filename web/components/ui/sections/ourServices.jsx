import styles from 'css/main.module.css'
import MediaQueries from 'ui/mediaQueries'
import { OurServiceCard } from 'ui/cards';

import ThreeVolvosInRow from 'image/3VolvosInRow.jpg'
import VolvoInterior from 'image/VolvoInterior.jpg'
import Airport from 'image/Airport.jpg'
import WeddingRing from 'image/WeddingRings.jpg'
import CarRainWindow from 'image/CarRainWindow.jpg'
import GuyOpensDoorForWoman from 'image/GuyOpensDoorForWoman.jpg'
import VolvoXC60BridgeUp from 'image/VolvoXC60BridgeUp.jpg'

export default function OurService() {
    const media = MediaQueries();

    return (
        <>
            <section className={`${!media.largeScreen? `${styles.lvPaddingY50} ${styles.lvPaddingX25}` : `${styles.lvPadding50}`} ${styles.lvBgColorCustomBlack1} ${styles.lvFontNone}`} id="ourServices" data-offset="100">
                <div>
                    <h1 className={`${styles.lvColorCustomLightPink} ${styles.lvFontWeightLighter} ${styles.lvTextAlignCenter} ${styles.lvPaddingBottom50} ${styles.lvFontSize35}`}>
                        Våra Tjänster
                    </h1>
                </div>

                <div className={`${styles.lvGrid} ${styles.lvGridGap30}`} style={{ gridTemplateColumns: `${media.mobileScreen || media.extraSmallScreen  ? `repeat(1, 1fr)` : `${media.smallScreen || media.smallMediumScreen || media.mediumScreen || media.mediumLargeScreen ? `repeat(2, 1fr)` : `${media.largeScreen ? `repeat(3, 1fr)` : ``}`} ` }` }}>
                    
                    <OurServiceCard
                        top="Privatleasing" 
                        bottom="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cm exercitationem rerum soluta eius odit facere?"
                        image={ThreeVolvosInRow}
                        imageAlt="3 Volvos In Row"
                        booking="/404"
                        readMore="/404"
                    />
                    <OurServiceCard
                        top="Abonnemang" 
                        bottom="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ullam deleniti ipsam voluptatibus magnam mollitia consectetur hic."
                        image={VolvoInterior}
                        imageAlt="Volvo Interior"
                        booking="/404"
                        readMore="/404"
                    />
                    <OurServiceCard
                        top="Flygplatstransfer" 
                        bottom="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure neque consectetur sint eveniet odio tenetur, nulla distinctio est!"
                        image={Airport}
                        imageAlt="Airport"
                        booking="/404"
                        readMore="/404"
                    />
                    <OurServiceCard
                        top="Evenemangstransfer" 
                        bottom="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi laborum ces, nihil officia inexpedita."
                        image={WeddingRing}
                        imageAlt="Wedding Rings"
                        booking="/404"
                        readMore="/404"
                    />
                    <OurServiceCard
                        top="Timbokning" 
                        bottom="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi esse vel fugit nihil. fugiatmodi! Ea incidunt aperiam in."
                        image={CarRainWindow}
                        imageAlt="Car Window View"
                        booking="/404"
                        readMore="/404"
                    />
                    <OurServiceCard
                        top="Lokal Transfer" 
                        bottom="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ducimus vitae,laudantiumdolorum maxime vero sint reprehenderit consequatur?"
                        image={GuyOpensDoorForWoman}
                        imageAlt="Guy Opens Door For Woman"
                        booking="/404"
                        readMore="/404"
                    />
                    <OurServiceCard
                        top="Stad till Stad-transfer" 
                        bottom="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas, facilis quia etpraesentiumconsectetur fugiat modi! Ea incidunt aperiam in."
                        image={VolvoXC60BridgeUp}
                        imageAlt="Volvo XC60 Bridge Up"
                        booking="/404"
                        readMore="/404"
                    />
                </div>
            </section>
        </>
    )
}