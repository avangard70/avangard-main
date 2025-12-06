'use client';

import { DetailedHTMLProps, HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import styles from './Info.module.css';
import classNames from "classnames";
import ImgTag from "../ImgTag/ImgTag";

export interface InfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    title?: string,
    image?: string;
    className?: string,
    children: ReactNode,
}

export default function Info({ title, image, className, children, ...props }: InfoProps) {

    const titleRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const animate = (el: HTMLElement | null) => {
            if (!el) return;

            const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add(styles.visible);
                    obs.disconnect();
                }
            });

            obs.observe(el);
        };

        animate(titleRef.current);
        animate(textRef.current);

    }, []);

    return (
        <div className={classNames(styles.wrapper, className, {
            [styles.withImage]: image,
            [styles.withoutImage]: !image,
        })}>
            {title && <h3 ref={titleRef} className={styles.title} {...props}>{title}</h3>}
            <div ref={textRef} className={classNames(styles.text, {
                [styles.bigger]: image,
                [styles.lower]: !image,
            })}>{children}</div>
            {image && <ImgTag width={50} height={50} src={image} className={styles.image}/>}
        </div>
    );
}