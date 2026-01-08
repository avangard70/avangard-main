'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import styles from './YandexMetrica.module.css';
import Button from '../Button/Button';
import Link from 'next/link';

export default function YandexMetrica() {

    const [cookiesAccepted, setCookiesAccepted] = useState<'true' | 'false' | 'init'>('false');

    useEffect(() => {
        const consent = localStorage.getItem('cookiesAccepted');
        if (consent === 'true') setCookiesAccepted('true');
        else if (consent === 'false') setCookiesAccepted('false');
        else setCookiesAccepted('init');
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setCookiesAccepted('true');
    };

    const handleReject = () => {
        localStorage.setItem('cookiesAccepted', 'false');
        setCookiesAccepted('false');
    };

    return (
        <>
            {cookiesAccepted === 'init' && (
                <div className={styles.cookies}>
                    <p>
                        Мы используем cookie и сервисы аналитики для улучшения работы сайта.
                        Нажимая «Принять», вы соглашаетесь с их использованием.
                    </p>
                    <div className={styles.buttonContainer}>
                        <Button className={styles.acceptButton} onClick={handleAccept}>
                            Принять
                        </Button>
                        <Button className={styles.rejectButton} onClick={handleReject}>
                            Отклонить
                        </Button>
                    </div>
                    <Link className={styles.link} href="/politicy" target='_blank' rel="noopener noreferrer">Политика конфиденциальности</Link>
                </div>
            )}
            
            {cookiesAccepted === 'true' && (
                <Script
                    id="yandex-metrica"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function(m,e,t,r,i,k,a){
                            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                            m[i].l=1*new Date();
                            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                        })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

                        ym(83079244, 'init', {
                            webvisor: true,
                            clickmap: true,
                            accurateTrackBounce: true,
                            trackLinks: true
                        });
                        `,
                    }}
                />
            )}
        </>
    );
}
