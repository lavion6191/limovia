import styles from 'css/main.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Logo from 'ui/logo'
import api from 'util/api'

export default function SignupPage() {
    const router = useRouter();
    const { type } = router.query;
    const navigateTo = (path) => router.push(path);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const [formData, setFormData] = useState({
        format: 'private',
        firstName: '',
        title: '',
        lastName: '',
        orgName: '',
        orgNumber: '',
        ssn: '',
        email: '',
        phoneNumber: '',
        password: '',
        address: '',
        postalCode: '',
        city: '',
        rememberMe: true,
    });

    useEffect(() => {
        console.log('Type:', type);
        // Check if type is valid
        if (type && (type === 'private' || type === 'organization')) {
            // If it's organization, set format
            if (type === 'organization') {
                setFormData(prevData => ({ ...prevData, format: 'organization' }));
            }
        }
    }, [type, router]);

    // Handle input change for all fields EXCEPT title
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    // Handle input change FOR title field
    const handleTitleChange = (event) => {
        const { value } = event.target;
        setFormData(prevData => ({ ...prevData, title: value }));
    };

    // Handle signup stuff
    const handleSignup = async (event) => {
        event.preventDefault();

        // Clear errors state
        setErrors([]);
    
        let formatValue = type === 'organization' ? 'organization' : 'private';
        const updatedFormData = { ...formData, format: formatValue };

        // Check if passwords match
        if (updatedFormData.password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        // Update the formData state
        setFormData(updatedFormData);
    
        try {
            const response = await api.post('/v1/user/auth/signup', updatedFormData);
            console.log('Signup successful:', response.data);
            
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
    }

    const displayType = (typeValue) => router.push(`/signup?type=${typeValue}`);
    const isIndividual = type === 'private' || !type;
    console.log('Is Individual:', isIndividual);

    const formTypeStyle = `
        ${styles.lvWidth180} 
        ${styles.lvFontSizeLarge} 
        ${styles.lvOutlineNone}
        ${styles.FontStyleOblique}
        ${styles.lvColorBlack} 
        ${styles.lvTransition500}
        ${styles.lvFontRaleway}
        ${styles.lvBoxSizingBorderBox}
        ${styles.lvBgColorWhite}
        ${styles.lvBorderStyleSolid}
        ${styles.lvBorderWidth2}
        ${styles.lvBorderColorWhite}
        ${styles.lvFontStylePlaceholderItalic}
        ${styles.lvPadding5}
        ${styles.lvCursorPointer}
        ${styles.lvMarginRight10}
    `

    const customFormFields = `
        ${styles.lvPaddingBottom10}
    `

    const customBar = `
        ${styles.lvMargin5}
        ${styles.lvW100} 
        ${styles.lvFontSize16} 
        ${styles.lvOutlineNone}
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
        <div className={`${styles.lvWrapper} ${styles.lvBgColorBlack} ${styles.lvMinHeight100vh} ${styles.lvJustifyContentCenter} ${styles.lvFlex} ${styles.lvAlignItemsCenter} ${styles.lvOverflowYHidden}`}>
            <div>
                {/* Logo */}
                <Logo href="/" title={isIndividual ? 'Privat' : 'För Företag'} fontsize="2.5em" />

                {/* Change form type */}
                <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvPadding10} ${styles.lvMarginBottom20}`}>
                    
                    <button 
                        className={formTypeStyle} 
                        onMouseEnter={(e) => { e.target.style.color = "white"; e.target.style.backgroundColor = "black"; }}
                        onMouseLeave={(e) => { e.target.style.color = ""; e.target.style.backgroundColor = ""; }}
                        onClick={() => displayType('private')}
                    >Privat</button>

                    <button 
                        className={formTypeStyle}
                        onMouseEnter={(e) => { e.target.style.color = "white"; e.target.style.backgroundColor = "black"; }}
                        onMouseLeave={(e) => { e.target.style.color = ""; e.target.style.backgroundColor = ""; }}
                        onClick={() => displayType('organization')}
                    >Företag</button>

                </div>

                {/* Errors */}
                {renderErrors()}

                {/* Signup form */}
                <div>
                    <form onSubmit={handleSignup}>

                        {/* User titles */}
                        {isIndividual &&
                            <div className={customFormFields}>
                                <div className={`${styles.lvMargin5} ${styles.lvWidth120} ${styles.lvPaddingbottom10}`} style={{ position: 'relative' }}>
                                    <select 
                                        required="" 
                                        defaultValue="" // Set defaultValue to an empty string or default option value
                                        className={`${styles.lvWebkitAppearanceNone} ${styles.lvBgColorWhite} ${styles.lvBorderWidth1} ${styles.lvBorderStyleSolid} ${styles.lvBorderColorCustomLightGray1} ${styles.lvPadding13} ${styles.lvW100} ${styles.lvFontSize16} ${styles.lvCursorPointer} ${styles.lvFontRaleway} ${styles.lvOutlineNone}`}
                                        style={{ paddingRight: '30px' }}
                                        name="title" // Add name attribute for title field
                                        onChange={handleTitleChange} // Handle title change
                                    >
                                        <option value="" disabled="">Titel*</option>
                                        <option value="Ms.">Ms.</option>
                                        <option value="Mr.">Mr.</option>
                                    </select>
                                    <span 
                                        className={styles.lvMargin5} 
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                        }}
                                    >
                                        ▼
                                    </span>
                                </div>
                            </div>
                        }
                        {/* Common form fields */}
                        <div className={customFormFields}>
                            <label className={`${styles.lvMargin5} ${styles.lvBoxSizingBorderBox} ${styles.lvColorWhite} ${styles.lvFontRaleway}`}>{isIndividual ? 'Personuppgifter' : 'Företagsuppgifter'}</label>
                            <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter}`}>
                                
                                {isIndividual && <input 
                                    className={customBar} 
                                    type="text" 
                                    placeholder="Förnamn*" 
                                    name="firstName" required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    onFocus={(e) => e.target.style.borderColor = "white"}
                                    onBlur={(e) => e.target.style.borderColor = ""}
                                />}

                                {isIndividual && <input 
                                    className={customBar} 
                                    type="text" 
                                    placeholder="Efternamn*" 
                                    name="lastName" required 
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    autoComplete="off" 
                                    onFocus={(e) => e.target.style.borderColor = "white"}
                                    onBlur={(e) => e.target.style.borderColor = ""}
                                />}
                                
                                {!isIndividual && <input 
                                    className={customBar} 
                                    type="text" 
                                    placeholder="Företagsnamn*" 
                                    name="orgName" required
                                    value={formData.orgName}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    onFocus={(e) => e.target.style.borderColor = "white"}
                                    onBlur={(e) => e.target.style.borderColor = ""}
                                />}

                                {!isIndividual && <input 
                                    className={customBar} 
                                    type="text" 
                                    placeholder="Org. Nr.*" 
                                    name="orgNumber" required
                                    value={formData.orgNumber}
                                    onChange={handleInputChange}
                                    autoComplete="off" 
                                    onFocus={(e) => e.target.style.borderColor = "white"}
                                    onBlur={(e) => e.target.style.borderColor = ""}
                                />}
                            </div>
                        </div>

                        {/* Social Security Number */}
                        {isIndividual &&
                        <div className={customFormFields}>
                            <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter}`}>
                                <input 
                                    className={customBar} 
                                    type="number" 
                                    placeholder="Personnummer*" 
                                    name="ssn" required 
                                    value={formData.ssn}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    onFocus={(e) => e.target.style.borderColor = "white"}
                                    onBlur={(e) => e.target.style.borderColor = ""}
                                />
                            </div>
                        </div>
                        }

                        {/* Forms of contact */}
                        <div className={customFormFields}>
                            <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter}`}>
                                
                                {isIndividual && <input 
                                    className={customBar} 
                                    type="email" 
                                    placeholder="E-post*" 
                                    name="email" required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    onFocus={(e) => e.target.style.borderColor = "white"}
                                    onBlur={(e) => e.target.style.borderColor = ""}
                                />}

                                {isIndividual && <input 
                                    className={customBar} 
                                    type="number" 
                                    placeholder="Telefonnummer*" 
                                    name="phoneNumber" required
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    onFocus={(e) => e.target.style.borderColor = "white"}
                                    onBlur={(e) => e.target.style.borderColor = ""}
                                />}
                                
                                {!isIndividual && <input 
                                    className={customBar} 
                                    type="text" 
                                    placeholder="Adress*" 
                                    name="address" required
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    onFocus={(e) => e.target.style.borderColor = "white"}
                                    onBlur={(e) => e.target.style.borderColor = ""}
                                />}

                            </div>
                        </div>

                        {/* ORGANIZATION Postal and City */}
                        {!isIndividual &&
                            <div className={customFormFields}>
                                <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter}`}>
                                    
                                    <input 
                                        className={customBar} 
                                        type="number" 
                                        placeholder="Postnummer*" 
                                        name="postalCode" required
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        onFocus={(e) => e.target.style.borderColor = "white"}
                                        onBlur={(e) => e.target.style.borderColor = ""}
                                    />

                                    <input 
                                        className={customBar} 
                                        type="text" 
                                        placeholder="Stad*" 
                                        name="city" required
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        onFocus={(e) => e.target.style.borderColor = "white"}
                                        onBlur={(e) => e.target.style.borderColor = ""}
                                    />

                                </div>
                            </div>
                        }

                        {/* Available regions *
                        <div className={customFormFields}>
                            <div className="selectWheelRegion">
                                <select required>
                                    <option value="" disabled selected>Region*</option>
                                    <option value="option1">Hallands Län</option>
                                    <option value="option2">Jönköpings Län</option>
                                    <option value="option3">Kalmar Län</option>
                                    <option value="option4">Kronobergs Län</option>
                                    <option value="option5">Stockholms Län</option>
                                    <option value="option6">Södermanlands Län</option>
                                    <option value="option7">Uppsala Län</option>
                                    <option value="option8">Värmlands Län</option>
                                    <option value="option9">Västmanlands Län</option>
                                    <option value="option10">Västra Gotlands Län</option>
                                    <option value="option11">Örebro Län</option>
                                    <option value="option12">Östergötlands Län</option>
                                </select>
                            </div>
                        </div>
                    */}

                        {/* TEMPORARY PASSWORD SECTION */}
                        <div className={customFormFields}>
                            <label className={`${styles.lvMargin5} ${styles.lvBoxSizingBorderBox} ${styles.lvColorWhite} ${styles.lvFontRaleway}`}>Lösenord</label>
                            <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter}`}>
                                
                                {/* Password */}
                                <input 
                                    className={customBar} 
                                    type="password"
                                    placeholder="Lösenord*"
                                    name="password" required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    onFocus={(e) => e.target.style.borderColor = "white"}
                                    onBlur={(e) => e.target.style.borderColor = ""}
                                />

                                {/* Double Check */}
                                <input 
                                    className={customBar}
                                    type="password"
                                    placeholder="Bekräfta lösenord*"
                                    name="confirmPassword" required
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    autoComplete="off"
                                    onFocus={(e) => e.target.style.borderColor = "white"}
                                    onBlur={(e) => e.target.style.borderColor = ""}
                                />

                            </div>
                        </div>

                        {/* ORGANIZATION location */}
                        {isIndividual && (
                            <>
                                <div className={customFormFields}>
                                    <label className={`${styles.lvMargin5} ${styles.lvBoxSizingBorderBox} ${styles.lvColorWhite} ${styles.lvFontRaleway}`}>Faktureringsadress</label>
                                    <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter}`}>
                                        
                                        <input 
                                            className={customBar} 
                                            type="text" 
                                            placeholder="Adress*" 
                                            name="address" required
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            onFocus={(e) => e.target.style.borderColor = "white"}
                                            onBlur={(e) => e.target.style.borderColor = ""}
                                        />

                                    </div>
                                </div>

                                <div className={customFormFields}>
                                <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter}`}>
                                        
                                        <input 
                                            className={customBar} 
                                            type="number" 
                                            placeholder="Postnummer*" 
                                            name="postalCode" required
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            onFocus={(e) => e.target.style.borderColor = "white"}
                                            onBlur={(e) => e.target.style.borderColor = ""}
                                        />

                                        <input 
                                            className={customBar} 
                                            type="text" 
                                            placeholder="Stad*" 
                                            name="city" required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            onFocus={(e) => e.target.style.borderColor = "white"}
                                            onBlur={(e) => e.target.style.borderColor = ""}
                                        />

                                    </div>
                                </div>
                            </>
                        )}

                        {/* ORGANIZATION Contact Person */}
                        {!isIndividual && (
                            <>
                                <div className={customFormFields}>
                                    <label className={`${styles.lvMargin5} ${styles.lvBoxSizingBorderBox} ${styles.lvColorWhite} ${styles.lvFontRaleway}`}>Kontaktperson</label>
                                    <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter}`}>
                                        
                                        <input 
                                            className={customBar} 
                                            type="text" 
                                            placeholder="Förnamn*" 
                                            name="firstName" required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            onFocus={(e) => e.target.style.borderColor = "white"}
                                            onBlur={(e) => e.target.style.borderColor = ""}
                                        />
                                        
                                        <input 
                                            className={customBar} 
                                            type="text" 
                                            placeholder="Efternamn*" 
                                            name="lastName" required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            onFocus={(e) => e.target.style.borderColor = "white"}
                                            onBlur={(e) => e.target.style.borderColor = ""}
                                        />

                                    </div>
                                </div>

                                <div className={customFormFields}>
                                    <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter}`}>
                                        
                                        <input 
                                            className={customBar} 
                                            type="email" 
                                            placeholder="E-post*" 
                                            name="email" required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            onFocus={(e) => e.target.style.borderColor = "white"}
                                            onBlur={(e) => e.target.style.borderColor = ""}
                                        />

                                        <input 
                                            className={customBar} 
                                            type="number" 
                                            placeholder="Telefonnummer*" 
                                            name="phoneNumber" required
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            onFocus={(e) => e.target.style.borderColor = "white"}
                                            onBlur={(e) => e.target.style.borderColor = ""}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className={`${customFormFields} ${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvBoxSizingBorderBox}`}>
                            <button 
                                type="submit"
                                className={`'
                                ${styles.lvBgColorWhite}
                                ${styles.lvColorBlack}
                                ${styles.lvCursorPointer}
                                ${styles.lvFontSizeLarger}
                                ${styles.lvBorderStyleSolid}
                                ${styles.lvBorderWidth2}
                                ${styles.lvBorderColorWhite}
                                ${styles.lvTransition500}
                                ${styles.lvPadding13}
                                ${styles.lvFontStyleOblique}
                                ${styles.lvW50}
                                ${styles.lvFontRaleway}
                                ${styles.lvBoxSizingBorderBox}
                                ${styles.lvMarginTop10}
                                `}
                                onMouseEnter={(e) => { e.target.style.color = "white"; e.target.style.backgroundColor = "black"; }}
                                onMouseLeave={(e) => { e.target.style.color = ""; e.target.style.backgroundColor = ""; }}
                                >
                                Skapa Konto
                            </button>
                        </div>

                        <div className={`${customFormFields} ${styles.lvFlex} ${styles.lvAlignItemsCenter} ${styles.lvJustifyContentCenter} ${styles.lvFlexWrap}`}>
                            <span className={`${styles.lvColorWhite} ${styles.lvFontRaleway}`}>Har du redan ett {isIndividual ? 'konto' : 'företagskonto'}?</span>
                            <ul className={`${styles.lvListStyleNone} ${styles.lvPaddingLeft5} ${styles.lvFontRaleway} ${styles.lvMarginY16}`}>
                                <li>
                                    <a 
                                        onClick={() => navigateTo('/login')} 
                                        className={`${styles.lvColorCustomLightPink} ${styles.lvCursorPointer} ${styles.lvTransition500} ${styles.lvTextDecorationNone} ${styles.lvBorderColorBlack} ${styles.lvBorderStyleSolid} ${styles.lvBorderWidth2} ${styles.lvBorderLeftNone} ${styles.lvBorderRightNone} ${styles.lvBorderTopNone}`}
                                        onMouseEnter={(e) => e.target.style.borderBottom = "white solid 2px"}
                                        onMouseLeave={(e) => e.target.style.borderBottom = "black solid 2px"}
                                    > 
                                    Logga In
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
