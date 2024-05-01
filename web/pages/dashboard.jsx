import React, { useEffect, useRef, useState } from 'react';
import styles from 'css/main.module.css';
import { nameGET } from 'api/user/name';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Custom403 from 'page/403'

export default function Dashboard() {
    const router = useRouter();
    const videoRef = useRef(null);
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [firstNameInitial, setFirstNameInitial] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameInitial, setLastNameInitial] = useState('');
    const [hasAccess, setHasAccess] = useState(true); // State to track access

    useEffect(() => {
        const fetchName = async () => {
            try {
                const refreshToken = Cookies.get('refreshToken');
                if (!refreshToken) {
                    setHasAccess(false);
                    return;
                }
                const identifier = Cookies.get("ID");
                const response = await nameGET(identifier);
                // Update state with fetched data
                setTitle(response.data.data.title);
                setFirstName(response.data.data.firstName);
                setFirstNameInitial(response.data.data.firstName.charAt(0) + ".");
                setLastName(response.data.data.lastName);
                setLastNameInitial(response.data.data.lastName.charAt(0) + ".");
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        };

        fetchName();
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;
            video.controls = false;
            video.autoplay = true;
            video.volume = 1.0;
        }
    }, []);

    const handleRedirect = () => {
        router.push('/');
    };

    if (!hasAccess) {
        return <Custom403 />;
    }

    // Render Dashboard component if user has access
    return (
        <>
            <div className={`${styles.lvFlex} ${styles.lvJustifyContentCenter} ${styles.lvAlignItemsCenter} ${styles.lvMinHeight100vh} ${styles.lvFlexDirectionColumn} ${styles.lvBgColorBlack} ${styles.lvColorWhite}`}>
                <h1>Welcome to your dashboard, {title} {firstName} {lastNameInitial}</h1>
                {/* 
                <video controls ref={videoRef}>
                    <source src="/videos/rickroll.mp4" type="video/mp4" />
                    <track
                        src="/path/to/captions.vtt"
                        kind="subtitles"
                        srcLang="en"
                        label="English"
                    />
                    Your browser does not support the video tag.
                </video>
                */}
                <button onClick={handleRedirect}>Go Home</button>
            </div>
        </>
    );
}
