/*
    Navigation
*/

import styles from 'css/main.module.css'
import { React, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import api from 'util/api'

/* Logo */
import Logo from 'ui/logo'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Set default value to false
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [firstNameInitial, setFirstNameInitial] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameInitial, setLastNameInitial] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const refreshToken = Cookies.get('refreshToken');
            if (refreshToken) {
                try {
                    const idCookie = Cookies.get('ID');
                    let userId;
                    if (!idCookie) {
                        // If ID cookie doesn't exist, get new ID using accessToken
                        const response = await api.post('/v1/user/id/get', {
                            accessToken: yourAccessToken,
                        });
                        userId = response.data.ID;
                        setIsLoggedIn(true);
                    } else {
                        userId = idCookie;
                        setIsLoggedIn(true); // Set isLoggedIn to true
                    }
                    // Get user name using the ID
                    const response = await api.get(`/v1/user/name/get?ID=${userId}`);
                    setTitle(response.data.data.title);
                    setFirstName(response.data.data.firstName);
                    setFirstNameInitial(response.data.data.firstName.charAt(0) + ".");
                    setLastName(response.data.data.lastName);
                    setLastNameInitial(response.data.data.lastName.charAt(0) + ".");
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                // If refreshToken doesn't exist, user is not logged in
                setIsLoggedIn(false);
            }
        };
        fetchData();
    }, []);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const navigateTo = (path) => {
        if (path === '/logout') {
            const domain = process.env.NODE_ENV === 'development' ? '.invalsia.com' : '.limovia.se';
    
            // Remove cookies with domain and path specified
            Cookies.remove('refreshToken', { domain, path: '/' });
            Cookies.remove('accessToken', { domain, path: '/' });
            Cookies.remove('ID', { domain, path: '/' });
        
            // Reload the page
            router.reload();
        } else {
            router.push(path)
            setIsOpen(false)
        }
    };

    const aClickable = `${styles.lvTextDecorationNone} ${styles.lvColorWhite} ${styles.lvCursorPointer}`;
    const navButton = `${styles.lvWidth40} ${styles.lvHeight40} ${styles.lvBgColorCustomBlack1} ${styles.lvColorWhite} ${styles.lvCursorPointer} ${styles.lvFontSize16} ${styles.lvLineHeight10} ${styles.lvBottom27} ${styles.lvRight19} ${styles.lvPositionFixed} ${styles.lvBorderRadius50P} ${styles.lvBorderStyleSolid} ${styles.lvBorderWidth2} ${styles.lvBorderColorWhite} ${styles.lvShadowNone} ${styles.lvHideOnLargeScreen}`;
    const smallNavHR = `${styles.lvBorderColorCustomGray1} ${styles.lvShadowNone} ${styles.lvBorderRadius5} ${styles.lvW100} ${styles.lvMarginY20} ${styles.lvBorderWidth0_1} ${styles.lvBorderStyleSolid}`;
    const smallNavItems = `${styles.lvDisplayBlock} ${styles.lvPaddingY8} ${styles.lvTextDecorationNone} ${styles.lvFontSize25} ${styles.lvColorWhite} ${styles.lvTransition500} ${styles.lvFontMontserrat} ${styles.lvCursorPointer} ${styles.lvBlock}`;

    return (
        <header className={`${styles.lvPositionFixed} ${styles.lvW100} ${styles.lvPaddingY16} ${styles.lvZIndex1} ${styles.lvBgColorBlack}`}>
            <div className={`${styles.lvW100} ${styles.lvMarginYAuto} ${styles.lvMarginX0} ${styles.lvFlex} ${styles.lvAlignItemsCenter} ${styles.lvJustifyContentSpaceEvenly} ${styles.lvBoxSizingBorderBox} ${styles.lvTransition500}`} id="navigation">

                {/* Logo */}
                <div className={`${styles.lvFontIsabel}`}>
                    <Logo href="#top" margin="0 0 0 0"/>
                </div>

                {/* ONLY FOR LARGE SCREEN */}
                <nav className={`${styles.lvOnlyShowOnLargeScreen} ${isOpen ? 'open' : ''}`} id="navigationLinks">
                    <ul className={`${styles.lvFlex} ${styles.lvGap2Rem} `}>
                        <li className={`${styles.lvListStyleNone}`}><a className={aClickable} onClick={() => navigateTo('#aboutLimovia')}>Om Limovia</a></li>
                        <li className={`${styles.lvListStyleNone}`}><a className={aClickable} onClick={() => navigateTo('#ourServices')}>Våra Tjänster</a></li>
                        <li className={`${styles.lvListStyleNone}`}><a className={aClickable} onClick={() => navigateTo('#FAQ')}>FAQ</a></li>
                        <li className={`${styles.lvListStyleNone}`}><a className={aClickable} onClick={() => navigateTo('#fleet')}>Flotta</a></li>
                        <li className={`${styles.lvListStyleNone}`}><a className={aClickable} onClick={() => navigateTo('#contact')}>Kontakt</a></li>
                    </ul>
                </nav>

                <div className={styles.lvOnlyShowOnLargeScreen}>
                    {!isLoggedIn ? (
                        // Show login/signup options if user is not logged in
                        <ul className={`${styles.lvFlex} ${styles.lvGap2Rem}`}>
                            <li className={styles.lvListStyleNone}><a className={aClickable} onClick={() => navigateTo('/login')}>Logga In</a></li>
                            <li className={styles.lvListStyleNone}><a className={aClickable} onClick={() => navigateTo('/signup')}>Bli medlem</a></li>
                        </ul>
                    ) : (
                        // Show user-specific content if user is logged in
                        <ul className={`${styles.lvFlex} ${styles.lvGap2Rem}`}>
                            <li className={styles.lvListStyleNone}><a className={aClickable} onClick={() => navigateTo('/dashboard')}>{title} {firstName} {lastNameInitial}</a></li>
                            <li className={styles.lvListStyleNone}><a className={aClickable} onClick={() => navigateTo('/logout')}>Logga ut</a></li>
                        </ul>
                    )}
                </div>
            </div>

            <button id="openNavbutton" onClick={toggleNavbar}
                className={navButton}>
                <span>&#9776;</span>
            </button>

            {/* Side menu opened on "openNavbutton" */}
            <nav className={`${styles.lvH100} ${styles.lvPositionFixed} ${styles.lvZIndex1} ${styles.lvTop0} ${styles.lvRight0} ${styles.lvBgColorCustomBlack2} ${styles.lvOverflowXHidden} ${styles.lvPaddingTop60} ${styles.lvTransition500} ${styles.lvBorderStyleSolid} ${styles.lvBorderWidth1} ${styles.lvBorderColorWhite} ${styles.lvBorderTopVisibilityHidden} ${styles.lvBorderRightVisibilityHidden} ${styles.lvBorderBottomVisibilityHidden} ${isOpen ? 'open' : ''}`} id="smallNavigation" style={{ width: isOpen ? "35%" : "0px" }}>
                <ul className={`${styles.lvPaddingX20}`}>
                    <li className={`${styles.lvListStyleNone}`}>
                        <a onClick={() => navigateTo('#aboutLimovia')} className={smallNavItems}>
                            Om Limovia
                        </a>
                    </li>
                    <hr className={smallNavHR} />
                    <li className={`${styles.lvListStyleNone}`}>
                        <a onClick={() => navigateTo('#ourServices')} className={smallNavItems}>
                            Våra Tjänster
                        </a>
                    </li>
                    <hr className={smallNavHR} />
                    <li className={`${styles.lvListStyleNone}`}>
                        <a onClick={() => navigateTo('#FAQ')} className={smallNavItems}>
                            FAQ
                        </a>
                    </li>
                    <hr className={smallNavHR} />
                    <li className={`${styles.lvListStyleNone}`}>
                        <a onClick={() => navigateTo('#fleet')} className={smallNavItems}>
                            Flotta
                        </a>
                    </li>
                    <hr className={smallNavHR} />
                    <li className={`${styles.lvListStyleNone}`}>
                        <a onClick={() => navigateTo('#contact')} className={smallNavItems}>
                            Kontakt
                        </a>
                    </li>
                    <hr className={smallNavHR} />
                    {!isLoggedIn ? (
                        // Show login/signup options if user is not logged in
                        <>
                            <li className={`${styles.lvListStyleNone}`}>
                                <a onClick={() => navigateTo('/login')} className={smallNavItems}>
                                    Logga In
                                </a>
                            </li>
                            <hr className={smallNavHR} />
                            <li className={`${styles.lvListStyleNone}`}>
                                <a onClick={() => navigateTo('/signup?type=private')} className={smallNavItems}>
                                    Bli medlem
                                </a>
                            </li>
                        </>
                    ) : (
                        // Show user-specific content if user is logged in
                        <>
                            <li className={`${styles.lvListStyleNone}`}>
                                <a onClick={() => navigateTo('/dashboard')} className={smallNavItems}>
                                    {title} {firstName} {lastNameInitial}
                                </a>
                            </li>
                            <hr className={smallNavHR} />
                            <li className={`${styles.lvListStyleNone}`}>
                                <a onClick={() => navigateTo('/logout')} className={smallNavItems}>
                                    Logga ut
                                </a>
                            </li>
                        </>
                    )}
                </ul>

                {/* Button to close menu*/}
                <button id="closeNavbutton" onClick={toggleNavbar} className={navButton} style={{ display: isOpen ? "block" : "none" }}><span>&#9932;</span></button>
            </nav>
        </header>
    );
}
