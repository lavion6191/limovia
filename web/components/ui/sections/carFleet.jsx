import React, { useState, useEffect } from 'react';
import styles from 'css/main.module.css';
import { FleetCard } from 'ui/cards';

import BMWI7 from 'image/BMWI7.jpg';
import MercedesMaybach from 'image/MercedesMaybach.jpg';
import MercedesEQV from 'image/MercedesEQV.jpeg';
import VolvoEM90 from 'image/VolvoEM90.jpg';
import VolvoEX90 from 'image/VolvoEX90.png';
import RollsRoys from 'image/RollsRoys.jpg';

export default function CarFleet() {
    const defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget sagittis nisi. In non eros vestibulum, consectetur felis non, mattis nunc. Sed lobortis auctor sagittis.";

    const slides = [
        { image: BMWI7, imageAlt: "BMW I7", model: "BMW i7", description: defaultDescription, type: "Sedan", seats: "5", luggage: "5", power: "Elektrisk", USB_C: "True", USB_A: "True", FourG: "True", FiveG: "True", water: "True", color: "Svart" },
        { image: MercedesMaybach, imageAlt: "Mercedes Maybach", model: "Mercedes-Maybach S-Klass", description: defaultDescription, type: "Sedan", seats: "4", luggage: "4", power: "Hybrid", USB_C: "True", USB_A: "True", FourG: "True", FiveG: "True", water: "True", color: "Svart" },
        { image: MercedesEQV, imageAlt: "Mercedes EQV", model: "Mercedes-Benz EQV", description: defaultDescription, type: "Van", seats: "8", luggage: "7", power: "Elektrisk", USB_C: "True", USB_A: "True", FourG: "True", FiveG: "True", water: "True", color: "Svart" },
        { image: VolvoEM90, imageAlt: "Volvo EM90", model: "Volvo EM90", description: defaultDescription, type: "Minibuss", seats: "6", luggage: "6", power: "Elektrisk", USB_C: "True", USB_A: "True", FourG: "True", FiveG: "True", water: "True", color: "Svart" },
        { image: VolvoEX90, imageAlt: "Volvo EX90", model: "Volvo EX90", description: defaultDescription, type: "SUV", seats: "7", luggage: "5", power: "Elektrisk", USB_C: "True", USB_A: "True", FourG: "True", FiveG: "True", water: "True", color: "Svart" },
        { image: RollsRoys, imageAlt: "Rolls Roys", model: "The Rolls-Royce Spectre", description: defaultDescription, type: "2-D Coupé", seats: "4", luggage: "3", power: "Elektrisk", USB_C: "True", USB_A: "True", FourG: "True", FiveG: "True", water: "True", color: "Chartreuse" }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = slides.length;
    let intervalId;

    useEffect(() => {
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            // console.log('Switching slide to', currentSlide + 1);
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(intervalId);
    }, [currentSlide, totalSlides]);

    const handlePrevSlide = () => {
        clearInterval(intervalId);
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    const handleNextSlide = () => {
        clearInterval(intervalId);
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    return (
        <section id="fleet" data-offset="200" className={`${styles.lvPadding60} ${styles.lvPositionRelative} ${styles.lvOverflowHidden} ${styles.lvBgColorCustomBlack1} ${styles.lvBoxSizingBorderBox}`}>
            <div>
                {slides.map((slide, index) => (
                    <div key={index} style={{ display: `${currentSlide === index ? "block" : "none" }`}}>
                        <FleetCard
                            key={index}
                            image={slide.image}
                            imageAlt={slide.imageAlt}
                            model={slide.model}
                            description={slide.description}
                            type={slide.type}
                            seats={slide.seats}
                            luggage={slide.luggage}
                            power={slide.power}
                            USB_C={slide.USB_C}
                            USB_A={slide.USB_A}
                            FourG={slide.FourG}
                            FiveG={slide.FiveG}
                            water={slide.water}
                            color={slide.color}
                        />
                    </div>
                ))}
            </div>

            <div>
                <a onClick={handlePrevSlide} className={`${styles.lvLeft10} ${styles.lvPositionAbsolute} ${styles.lvTop50P} ${styles.lvFontSize40} ${styles.lvColorWhite} ${styles.lvTextDecorationNone} ${styles.lvPadding10} ${styles.lvCursorPointer} ${styles.lvUserSelectNone} ${styles.lvCursorPointer}`} style={{ transform: "translateY(-50%)" }}>❮</a>
                <a onClick={handleNextSlide} className={`${styles.lvRight10} ${styles.lvPositionAbsolute} ${styles.lvTop50P} ${styles.lvFontSize40} ${styles.lvColorWhite} ${styles.lvTextDecorationNone} ${styles.lvPadding10} ${styles.lvCursorPointer} ${styles.lvUserSelectNone} ${styles.lvCursorPointer}`} style={{ transform: "translateY(-50%)" }}>❯</a>
            </div>
        </section>
    );
}
