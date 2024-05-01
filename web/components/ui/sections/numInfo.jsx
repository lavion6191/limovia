import { useState, useEffect } from 'react';
import { NumCard } from 'ui/cards';
import styles from 'css/main.module.css';
import { usersGET } from 'api/statistics/users';
import MediaQueries from 'ui/mediaQueries'

export default function NumInfo() {
    const media = MediaQueries();

    const [totalUsers, setTotalUsers] = useState(null);

    useEffect(() => {
        const fetchTotalUsers = async () => {
            try {
                const users = await usersGET();
                setTotalUsers(users.data.data.totalUsers);
            } catch (error) {
                console.error("Error fetching total users:", error);
            }
        };
        fetchTotalUsers();
    }, []);

    const formatTotalUsers = (num) => {
        return num.toLocaleString('sv-SE');
    };

    return (
        <>
            {/* Display numerical information */}
            <section>
                <div className={`${media.mobileScreen || media.extraSmallScreen || media.smallScreen ? `${styles.lvGrid}` : `${styles.lvFlex}`} ${styles.lvJustifyContentSpaceEvenly} ${styles.lvAlignItemsCenter} ${styles.lvTextAlignCenter} ${styles.lvFlexWrap} ${styles.lvW100} ${styles.lvPadding50} ${styles.lvBgColorBlack} ${styles.lvColorCustomLightPink} ${styles.lvBoxSizingBorderBox}`}>
                    <NumCard top="24/7" bottom="Boka dygnet runt" />
                    <hr className={` ${media.mobileScreen || media.extraSmallScreen || media.smallScreen ? `${styles.lvMargin40}` : `${styles.lvMargin10} ${styles.lvW10}`} ${styles.lvBorderStyleSolid} ${styles.lvBorderRadius5} ${styles.lvBgColorCustomOrange1}`} style={media.mobileScreen || media.extraSmallScreen || media.smallScreen ? { transform: "rotate(0deg)", width: "25rem" } : { transform: "rotate(90deg)" }} />
                    <NumCard top="12" bottom="Olika Regioner" />
                    <hr className={` ${media.mobileScreen || media.extraSmallScreen || media.smallScreen ? `${styles.lvMargin40}` : `${styles.lvMargin10} ${styles.lvW10}`} ${styles.lvBorderStyleSolid} ${styles.lvBorderRadius5} ${styles.lvBgColorCustomOrange1}`} style={media.mobileScreen || media.extraSmallScreen || media.smallScreen ? { transform: "rotate(0deg)", width: "25rem" } : { transform: "rotate(90deg)" }} />
                    <NumCard top={totalUsers !== null ? formatTotalUsers(totalUsers) : "Loading..."} bottom="Medlemmar" />
                </div>
            </section>
        </>
    );
}
