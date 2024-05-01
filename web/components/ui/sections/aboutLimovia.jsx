import styles from 'css/main.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import MediaQueries from 'ui/mediaQueries'
import PrivateDriverOpensDoor from 'image/PrivateDriverOpensDoor.jpg'
import QuoteRightSolid from 'icon/quote-right-solid.svg'

export default function AboutLimovia() {
    const media = MediaQueries();

    const slidesData = [
        {
            quote: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus rem inventore dolorum nulla, sint quibusdam dicta ad nihil dignissimos, praesentium, nesciunt commodi quidem amet.",
            author: "F. Ljungberg",
        },
        {
            quote: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta repudiandae temporibus fugiat facilis quasi incidunt vel. Sed laudantium explicabo accusamus reiciendis officia quam dolores quaerat.",
            author: "S. Cederström",
        },
        {
            quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, ab officiis repudiandae porro, corrupti obcaecati ratione explicabo architecto sint fuga eveniet eius quam nemo magni.",
            author: "H. Lundin",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fadeInNextSlide = (nextSlide) => {
      const slideElements = document.querySelectorAll('.slides');
      slideElements.forEach((slide, index) => {
        slide.style.opacity = index === nextSlide ? '1' : '0';
      });
    };

    fadeInNextSlide(currentSlide);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  const plusSlides = (step) => {
    setCurrentSlide((prevSlide) => (prevSlide + step + slidesData.length) % slidesData.length);
  };

    return (
        <>
            <section className={`${styles.lvGrid} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter} ${styles.lvPaddingY20} ${styles.lvBgColorCustomBlack1} ${styles.lvFontNone} ${styles.lvBoxSizingBorderBox}`} style={{ gridTemplateColumns: "repeat(3, 1fr)" } }> 
                <div></div>
                <div className={`${styles.lvPadding30}`}>
                    <figure>
                        <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter}`}>
                            <Image 
                            src={PrivateDriverOpensDoor} 
                            alt="Private Driver Opens Door" 
                            style={
                                { 
                                    width: `${media.mobileScreen ? `300px` : `${media.extraSmallScreen ? `370px` : `${media.smallScreen ? `500px` : `${media.smallMediumScreen ? `600px` : `${media.mediumScreen ? `700px` : `900px`}`}`}`}`}`,
                                    height: "auto" 
                                }
                            }/>
                        </div>
 
                        <figcaption className={`${styles.lvTextAlignCenter} ${styles.lvFontSize35} ${styles.lvW100} ${styles.lvColorCustomLightPink} ${styles.lvPaddingTop25}`}>
                            <h1 className={`${styles.lvFontWeightLighter}`}>
                                LIMOVIA: <br/>
                                TRANSPORTTJÄNSTER DU BEHÖVER
                            </h1>
                        </figcaption>

                        <figcaption className={`${styles.lvTextAlignCenter} ${styles.lvColorWhite} ${styles.lvFontSizeLarger} ${styles.lvPaddingY20}`}>
                            <p>
                                <i>Tar dig dit du behöver åka</i>
                            </p>
                        </figcaption>

                        <figcaption className={`${styles.lvTextAlignCenter} ${styles.lvColorWhite} ${styles.lvLineHeight25} ${styles.lvFontRaleway}`}>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Possimus voluptate laboriosam repellat pariatur ratione 
                                harum quibusdam consequuntur sapiente tempore, ipsum nam 
                                tenetur debitis natus dolores necessitatibus. Accusamus, 
                                dolorum. Dignissimos quae aliquid sit possimus! Delectus, 
                                ex est modi aspernatur magni obcaecati.
                            </p>
                        </figcaption>
                    </figure>
                </div>
                <div></div>
            </section>
            
            <section className={`${styles.lvMinHeight80vh} ${styles.lvW100} ${styles.lvGuyInCar} ${styles.lvBackgroundPositionTop} ${styles.lvBackgroundNoRepeat} ${styles.lvBackgroundSizeCover} ${styles.lvPositionRelative} ${styles.lvFontNone}`}>
                <div className={`${styles.lvTop50P} ${styles.lvLeft50P} ${styles.lvPositionAbsolute} ${styles.lvTranslateCenter} ${styles.lvLetterSpacing1} ${styles.lvColorWhite} ${styles.lvTextAlignCenter} ${styles.lvBoxSizingBorderBox} ${styles.lvPadding20} 
                    ${!media.largeScreen ? `${styles.lvW90}` : `` }
                `}>
                    <h1 className={`${styles.lvPaddingBottom20} ${styles.lvFontSize45} ${styles.lvFontWeight400}`}>
                        Om oss
                    </h1>
                    <p className={`${!media.largeScreen ? `` : `${styles.lvPaddingX100}`} ${styles.lvLineHeight25} ${styles.lvFontRaleway}`}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Ut sapiente illo odit! Placeat consectetur accusantium neque. 
                        Animi reiciendis doloribus voluptate eos beatae dolores assumenda repellendus, 
                        eveniet sapiente earum qui, nam quos voluptas similique ab, 
                        id amet dolorum commodi consectetur culpa ullam est delectus perferendis. 
                        Minus illum voluptatem nemo doloribus ab sequi, dolorem facere perspiciatis. 
                        Alias quod quis molestiae ipsa illum quam delectus. 
                        Officiis corrupti veritatis amet nostrum sequi id sunt impedit eum neque soluta.
                    </p>
                </div>
            </section>

            <section className={`${styles.lvMinHeight50vh} ${styles.lvPositionRelative} ${styles.lvW100} ${styles.lvBgColorBlack} ${styles.lvColorWhite} ${styles.lvFontRaleway}`}>
                {slidesData.map((slide, index) => (
                    <div 
                    key={index} 
                    className={`
                        ${media.mobileScreen || media.extraSmallScreen || media.smallScreen ? `${styles.lvW80}` : `${media.smallMediumScreen || media.mediumScreen || media.mediumLargeScreen ? `${styles.lvW70}` : ``}`} 
                        ${media.largeScreen ? `${styles.lvPadding75}` : ``}
                        ${styles.lvTextAlignCenter} 
                        ${styles.lvPositionAbsolute} 
                        ${styles.lvTop50P} 
                        ${styles.lvLeft50P} 
                        ${styles.lvTranslateCenter}
                    `} 
                    style={{ transition: "opacity 1s ease", opacity: index === currentSlide ? '1' : '0' }}>
                        <div>
                            <span>
                                <Image src={QuoteRightSolid} alt="Quote Right Solid" className={`${styles.lvWidth50} ${styles.lvHeightAuto}`}/>
                            </span>
                        </div>
                        <p className={`${styles.lvPadding20} ${styles.lvFontSizeLarger} ${styles.lvUserSelectNone}`}>
                            {slide.quote}
                        </p>
                        <p className={`${styles.lvPadding20} ${styles.lvFontSizeLarger} ${styles.lvUserSelectNone} ${styles.lvFontStyleOblique} ${styles.lvColorCustomLightPink}`}>
                            {slide.author}
                        </p>
                    </div>
                ))}

                <a 
                className={`${styles.lvCursorPointer} ${styles.lvPositionAbsolute} ${styles.lvTop40P} ${styles.lvWidthAuto} ${styles.lvPadding20} ${styles.lvColorWhite} ${styles.lvFontWeight100} ${styles.lvFontSize30} ${styles.lvUserSelectNone} ${styles.lvTransition500} ${media.mobileScreen || media.extraSmallScreen || media.smallScreen ? `` : `${styles.lvMarginX40}`}`}
                onClick={() => { plusSlides(-1); }}
                >
                    ❮
                </a>

                <a 
                className={`${styles.lvCursorPointer} ${styles.lvPositionAbsolute} ${styles.lvTop40P} ${styles.lvWidthAuto} ${styles.lvPadding20} ${styles.lvColorWhite} ${styles.lvFontWeight100} ${styles.lvFontSize30} ${styles.lvUserSelectNone} ${styles.lvTransition500} ${styles.lvRight0} ${styles.lvBorderRadiusTopRight3} ${styles.lvBorderRadiusTopLeft3} ${media.mobileScreen || media.extraSmallScreen || media.smallScreen ? `` : `${styles.lvMarginX40}`}`}
                onClick={() => { plusSlides(1); }}
                >
                    ❯
                </a>
            </section>
        </>
    );
}