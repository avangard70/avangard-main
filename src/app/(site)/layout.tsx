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
import YandexMetrica from "../../components/shared/YandexMetrica/YandexMetrica";
import ContactsFloating from "@/src/components/shared/ContactsFloating/ContactsFloating";


const montserrat = Montserrat({
  variable: "--main-font",
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {

  return {
    title: "ООО «Авангард» | Экспертно-оценочная компания в Томске",
    description: "ООО «АВАНГАРД» - Мы проводим любой вид независимой оценки и экспертизы имущества. Помогаем клиентам отстоять их интересы и получить достойную компенсацию в г. Томске и Области",
    icons: "/logo.png",
    openGraph: {
      title: "ООО «Авангард» | Экспертно-оценочная компания в Томске",
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
      title: "ООО «Авангард» | Экспертно-оценочная компания в Томске",
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
                <YandexMetrica />
                <Header menu='client' className={styles.header} />
                <Sidebar menu='client' className={styles.sidebar} />
                <Main className={styles.main}>
                    {children}
                    <ContactsFloating/>
                </Main>
                <Footer className={styles.footer}/>
            </body>
        </html>
    );
}
