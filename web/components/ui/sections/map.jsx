import styles from 'css/main.module.css'
import Image from 'next/image'
import MapImage from 'image/ContactMap.png'

export default function Map() {
    return(
        <>
            <section className={`${styles.lvBgColorBlack}`}>
                <div>
                    <Image src={MapImage} alt="Contact Map" className={`${styles.lvW100} ${styles.lvHeightAuto}`}/>
                </div>
            </section>
        </>
    )
}