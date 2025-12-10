import Script from 'next/script';
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import styles from '../../components/layouts/MainLayout/MainLayout.module.css';
import { ReactNode } from "react";
import classNames from "classnames";
import Header from "../../components/sections/Header/Header";
import Sidebar from "../../components/sections/Sidebar/Sidebar";
import Main from "../../components/sections/Main/Main";
import Footer from "../../components/sections/Footer/Footer";
import Link from "next/link";
import ImgTag from "@/src/components/shared/ImgTag/ImgTag";
import Phone from './img/phone.png';
import WhatsApp from './img/whatsapp.png';
import Tg from './img/tg.png';
import Max from './img/max.png';


const montserrat = Montserrat({
  variable: "--main-font",
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {

  return {
    title: "ООО «Авангард» | Юридическая помощь в Томске",
    description: "ООО «АВАНГАРД» - Мы проводим любой вид независимой оценки и экспертизы имущества. Помогаем клиентам отстоять их интересы и получить достойную компенсацию в г. Томске и Области",
    icons: "/logo.png",
    openGraph: {
      title: "ООО «Авангард» | Юридическая помощь в Томске",
      description: "ООО «АВАНГАРД» - Мы проводим любой вид независимой оценки и экспертизы имущества. Помогаем клиентам отстоять их интересы и получить достойную компенсацию в г. Томске и Области",
      url: 'https://avangard-70.ru',
      images: [
        {
          url: `https://avangard-70.ru/videoPreview.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "ООО «Авангард» | Юридическая помощь в Томске",
      description: "ООО «АВАНГАРД» - Мы проводим любой вид независимой оценки и экспертизы имущества.",
      images: [`https://avangard-70.ru/videoPreview.jpg`],
    },
  };
}

export interface MainLayoutProps {
    children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {

    return (
        <html lang="ru">
            <body className={classNames(montserrat.variable, styles.layout)}>
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
                <noscript>
                <div>
                    <img
                    src="https://mc.yandex.ru/watch/83079244"
                    style={{ position: 'absolute', left: '-9999px' }}
                    alt=""
                    />
                </div>
                </noscript>
                <Header menu='client' className={styles.header} />
                <Sidebar menu='client' className={styles.sidebar} />
                <Main className={styles.main}>
                    {children}
                    <div className={styles.stickyWrapper}>
                        <div className={styles.contactsWrapper}>
                            <Link className={styles.whatsAppButton} href="https://t.me/avangard70ru?text=Здравствуйте!" target="_blank" rel="noopener noreferrer" >
                                <ImgTag className={styles.noBorder} src={Tg} />
                                <div className={styles.buttonText}> Напишите нам в Телеграм! </div>
                            </Link>
                            <Link className={styles.whatsAppButton} href="https://wa.me/79539193800?text=Здравствуйте!" target="_blank" rel="noopener noreferrer" >
                                <ImgTag className={styles.noBorder} src={WhatsApp} />
                                <div className={styles.buttonText}> Напишите нам в WhatsApp! </div>
                            </Link>
                            <Link className={styles.whatsAppButton} href="https://max.ru/u/f9LHodD0cOLGeSNM23Hgmz7GCIMBnEryY81gupi2MIu1fVmOEvd4b8LZxVc?text=Здравствуйте!" target="_blank" rel="noopener noreferrer" >
                                <ImgTag className={styles.noBorder} src={Max} />
                                <div className={styles.buttonText}> Напишите нам в Max! </div>
                            </Link>
                            <Link className={styles.phoneButton} href="tel:83822233800">
                                <ImgTag className={styles.noBorder} src={Phone} />
                            </Link>
                        </div>
                    </div>
                </Main>
                <Footer className={styles.footer}/>
            </body>
        </html>
    );
}
