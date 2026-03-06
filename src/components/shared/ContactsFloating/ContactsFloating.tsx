'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './ContactsFloating.module.css';
import ImgTag from "@/src/components/shared/ImgTag/ImgTag";
import Phone from './img/phone.png';
import WhatsApp from './img/whatsapp.png';
import Tg from './img/tg.png';
import Max from './img/max.png';
import Bip from './img/bip.png';
import Toggle from './img/toggle.svg';
import classNames from 'classnames';

export default function ContactsFloating() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: { target: any; }) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const contacts = [
        {
            id: 'tg',
            href: 'https://t.me/avangard70ru?text=Здравствуйте!',
            icon: Tg,
            text: 'Напишите нам в Телеграм!',
            className: styles.whatsAppButton
        },
        {
            id: 'wa',
            href: 'https://wa.me/79539193800?text=Здравствуйте!',
            icon: WhatsApp,
            text: 'Напишите нам в WhatsApp!',
            className: styles.whatsAppButton
        },
        {
            id: 'max',
            href: 'https://max.ru/u/f9LHodD0cOLGeSNM23Hgmz7GCIMBnEryY81gupi2MIu1fVmOEvd4b8LZxVc?text=Здравствуйте!',
            icon: Max,
            text: 'Напишите нам в Max!',
            className: styles.whatsAppButton
        },
        {
            id: 'bip',
            href: 'https://web.bip.com/79539193800',
            icon: Bip,
            text: 'Напишите нам в Bip!',
            className: styles.whatsAppButton
        },
        {
            id: 'phone',
            href: 'tel:83822233800',
            icon: Phone,
            text: null,
            className: styles.phoneButton
        }
    ];

    return (
        <div className={styles.stickyWrapper} ref={menuRef}>
            <div className={styles.stickyWrapperInner} >
                <div className={`${styles.contactsDropdown} ${isOpen ? styles.open : ''}`}>
                    {contacts.map((contact, index) => (
                        <Link
                            key={contact.id}
                            className={`${contact.className} ${styles.dropdownItem}`}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
                            >
                            <ImgTag className={styles.noBorder} src={contact.icon} />
                            {contact.text && (
                                <div className={styles.buttonText}>{contact.text}</div>
                            )}
                        </Link>
                    ))}
                </div>
                <button
                    className={classNames(styles.toggleButton, {
                        [styles.toggleNoAnimate] : isOpen
                    })}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Закрыть меню контактов' : 'Открыть меню контактов'}
                    aria-expanded={isOpen}
                >
                    <div className={classNames(styles.iconWrapper, {
                        [styles.iconWrapperNoAnimate] : isOpen
                    })}>
                        <Toggle className={classNames(styles.icon, {
                            [styles.iconActive] : isOpen
                        })} />
                    </div>
                    <div className={styles.buttonText}>Свяжитесь с нами!</div>
                </button>
                
            </div>
        </div>
    );
}