import styles from 'css/main.module.css'
import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import api from 'util/api'
import Logo from 'ui/logo'
import SEO from 'ui/SEO'
import ImgCover from 'logo/LimoviaLogo2x.png'

import Custom403 from 'page/403'
import LoadingScreen from 'ui/loadingScreen'

export default function Login() {

    const router = useRouter();
    const navigateTo = (path) => { router.push(path)};

    const [isEmailFocused,      setIsEmailFocused]      = useState(false);
    const [isPasswordFocused,   setIsPasswordFocused]   = useState(false);
    const [isLoginHovered,      setIsLoginHovered]      = useState(false);
    const [isForgotPassword,    setIsForgotPassword]    = useState(false);
    const [isSignup,            setIsSignup]            = useState(false);
    const [rememberMe,          setRememberMe]          = useState(false);
    const [loading,             setLoading]             = useState(true);
    const [hasRefreshToken,     setHasRefreshToken]     = useState(false);
    const [errors,              setErrors]              = useState([]);

    useEffect(() => {
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
            setHasRefreshToken(true);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: inputValue });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/v1/user/auth/login', formData);
            console.log('Login successful:', response.data);

            const domain = process.env.NODE_ENV === 'development' ? '.invalsia.com' : '.limovia.se';
            Cookies.set('refreshToken', response.data.token.refreshToken, { expires: response.data.token.refreshTokenEXP, domain });
            Cookies.set('accessToken', response.data.token.accessToken, { expires: (1 / 1440) * 15, domain });
            Cookies.set('ID', response.data.data.ID, { expires: response.data.token.refreshTokenEXP, domain });

            router.push('/dashboard');
        } catch (error) {
            console.error('Signup failed:', error);
            // Handle error response
            if (error.response && error.response.data && error.response.data.errors) {
                // Set errors in state
                console.log("Errors:", error.response.data.errors)
                setErrors(error.response.data.errors);
            } else {
                // Set generic error message if no specific error is provided
                setErrors([{ id: 'generic_error', title: 'Error', detail: 'An error occurred while processing your request.', context: 'generic' }]);
            }
        }
    };

    const customBar = `
        ${styles.lvW100} 
        ${styles.lvFontSize16} 
        ${styles.lvOutlineNone}
        ${styles.FontStyleOblique}
        ${styles.lvColorWhite} 
        ${styles.lvTransition500}
        ${styles.lvFontRoboto}
        ${styles.lvBoxSizingBorderBox}
        ${styles.lvBgColorBlack}
        ${styles.lvBorderStyleSolid}
        ${styles.lvBorderWidth2}
        ${styles.lvBorderColorCustomGray1}
        ${styles.lvFontStylePlaceholderItalic}
        ${styles.lvPadding13}
    `

    const renderErrors = () => {
        return (
            <div className={`${styles.lvColorRed}`}>
                {errors.map((error, index) => (
                    <div key={index}>
                        <p>{error.detail}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>

            <SEO
                title="Login"
                description=""
                image={ImgCover.src}
            />
            
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    {hasRefreshToken ? (
                        <>
                            You are already logged in
                        </> 
                    ) : (
                        <div className={`${styles.lvWrapper} ${styles.lvBgColorBlack} ${styles.lvMinHeight100vh} ${styles.lvJustifyContentCenter} ${styles.lvFlex} ${styles.lvAlignItemsCenter} ${styles.lvOverflowYHidden}`}>
                            <main>
                                <div className={`${styles.lvFlex} ${styles.lvAlignItemsCenter} ${styles.lvJustifyContentCenter} ${styles.lvBorderRadius10} ${styles.lvBoxShadow1}`}>
                                    
                                    {/* Side Image */}
                                    <div className={`
                                        ${styles.lvFlexBasis50}
                                        ${styles.lvMinHeight70vh}
                                        ${styles.lvVolvoOceanSmallScreen} 
                                        ${styles.lvBackgroundPositionRight}
                                        ${styles.lvBackgroundNoRepeat}
                                        ${styles.lvBackgroundSizeCover}
                                        ${styles.lvPositionRelative}
                                        ${styles.lvPadding40}
                                        ${styles.lvHideOnSmallScreen} 
                                        ${styles.lvHideOnExtraSmallScreen}
                                        ${styles.lvHideOnLargeScreen}
                                    `} style={{minWidth: "300px"}}></div>

                                    <div className={`
                                        ${styles.lvFlexBasis65}
                                        ${styles.lvMinHeight60vh}
                                        ${styles.lvVolvoOceanSmallScreen} 
                                        ${styles.lvBackgroundPositionRight}
                                        ${styles.lvBackgroundNoRepeat}
                                        ${styles.lvBackgroundSizeCover}
                                        ${styles.lvPositionRelative}
                                        ${styles.lvPadding40}
                                        ${styles.lvOnlyShowOnLargeScreen} 
                                    `} style={{minWidth: "900px"}}></div>

                                    {/* Login Side */}
                                    <div className={`${styles.lvPadding40}`}>
                                        
                                        {/* Logo */}
                                        <div className={`${styles.lvMarginY16}`}>
                                            <Logo title="Logga in" fontsize="2.5em" href="/"/>
                                        </div>

                                        <div>
                                            {/* Title */}
                                            <div className={`${styles.lvColorWhite} ${styles.lvFontRaleway}`}>
                                                <p className={`${styles.lvMarginY16}`}>Logga in med din e-postadress</p>
                                            </div>

                                            {/* Errors */}
                                            {renderErrors()}

                                            {/* Login Form */}
                                            <form onSubmit={handleSubmit}>
                                                {/* Email */}
                                                <div className={`${styles.lvPaddingBottom10}`}>
                                                    <input 
                                                        className={customBar} 
                                                        style={{
                                                            border: isEmailFocused ? "2px solid white" : "2px solid var(--CustomGray1)",
                                                        }} 
                                                        onFocus={() => setIsEmailFocused(true)}
                                                        onBlur={() => setIsEmailFocused(false)}
                                                        type="email" 
                                                        placeholder="E-post" 
                                                        name="email" 
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required 
                                                        autoComplete="off"
                                                    />
                                                </div>

                                                {/* Password */}
                                                <div className={`${styles.lvPaddingBottom10}`}>
                                                    <input 
                                                        className={customBar}
                                                        style={{
                                                            border: isPasswordFocused ? "2px solid white" : "2px solid var(--CustomGray1)",
                                                        }} 
                                                        onFocus={() => setIsPasswordFocused(true)}
                                                        onBlur={() => setIsPasswordFocused(false)}
                                                        type="password" 
                                                        placeholder="Lösenord" 
                                                        name="password" 
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                        required 
                                                        autoComplete="off"
                                                    />
                                                </div>

                                                {/* Remember Me */}
                                                <div className={`${styles.lvPaddingBottom10} ${styles.lvFlex} ${styles.lvAlignItemsCenter} ${styles.lvFontRoboto} ${styles.lvColorWhite}`}>
                                                    <input 
                                                        className={`${styles.lvWidth16} ${styles.lvHeight16} ${styles.lvCursorPointer} ${styles.lvMarginY3} ${styles.lvMarginLeft4} ${styles.lvMarginRight3}`} 
                                                        type="checkbox" 
                                                        name="remember"
                                                        checked={formData.remember}
                                                        onChange={(e) => setFormData({ ...formData, remember: e.target.checked })} 
                                                    />
                                                    <span className={`${styles.lvFontSize14} ${styles.lvFontRaleway}`} >Kom Ihåg</span>
                                                </div>

                                                {/* Submit */}
                                                <div className={`${styles.lvPaddingBottom10}`}>
                                                    <button 
                                                        className={`${styles.lvBgColorWhite} ${styles.lvColorBlack} ${styles.lvCursorPointer} ${styles.lvFontSizeLarger} ${styles.lvBorderColorWhite} ${styles.lvBorderStyleSolid} ${styles.lvBorderWidth2} ${styles.lvTransition500} ${styles.lvPadding13} ${styles.lvFontStyleOblique} ${styles.lvW100} ${styles.lvFontRaleway}`} 
                                                        type="submit"
                                                        style={{
                                                            color: isLoginHovered ? "white" : "black",
                                                            backgroundColor: isLoginHovered ? "black" : "white",
                                                        }}
                                                        onMouseEnter={() => setIsLoginHovered(true)}
                                                        onMouseLeave={() => setIsLoginHovered(false)}
                                                    >
                                                        Logga In
                                                    </button>
                                                </div>

                                                {/* Forgot Password */}
                                                <div className={`${styles.lvPaddingBottom10}`}>
                                                    <ul className={`${styles.lvListStyleNone} ${styles.lvMarginY16} ${styles.lvTextAlignCenter}`}>
                                                        <li>
                                                            <a
                                                                onClick={() => navigateTo('/forgot-password')} 
                                                                style={{ color: isForgotPassword ? "var(--CustomLightPink)" : "white" }}
                                                                onMouseEnter={() => setIsForgotPassword(true)}
                                                                onMouseLeave={() => setIsForgotPassword(false)}
                                                                className={`${styles.lvColorWhite} ${styles.lvTextDecorationNone} ${styles.lvFontRaleway} ${styles.lvTransition500} ${styles.lvCursorPointer}`}
                                                            >
                                                                Glömt Lösenordet?
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                {/* No account */}
                                                <div className={`${styles.lvPaddingBottom10} ${styles.lvTextAlignCenter}`}>
                                                    <span className={`${styles.lvColorWhite} ${styles.lvFontRaleway}`}>Har du inget Limovia-konto?</span>
                                                    <ul className={`${styles.lvListStyleNone} ${styles.lvMarginY16}`}>
                                                        <li>
                                                            <a 
                                                            onClick={() => navigateTo('/signup')}
                                                            style={{ 
                                                                borderBottom: isSignup ? "2px solid" : "2px solid black"
                                                            }}
                                                            onMouseEnter={() => setIsSignup(true)}
                                                            onMouseLeave={() => setIsSignup(false)}
                                                            className={`${styles.lvColorCustomLightPink} ${styles.lvTextDecorationNone} ${styles.lvFontRaleway} ${styles.lvTransition500} ${styles.lvCursorPointer}`}
                                                            >Bli Medlem</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
