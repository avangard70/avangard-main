import styles from './ServicePreview.module.css';
import classNames from "classnames";
import ImgTag from "../ImgTag/ImgTag";
import Link from "next/link";
import { StaticImageData } from "next/image";

export interface ServicePreviewProps {
    title: string,
    img: string | StaticImageData,
    src: string,
    gloss?: boolean
    className?: string,
}

export default function ServicePreview({ title, img, src, gloss=false, className, ...props} : ServicePreviewProps ) {

    return (
        <Link href={src} className={classNames(styles.wrapper, className)} {...props}>
            <ImgTag className={styles.image} src={img} alt={`Превью услуги "${title}"`}/>
            <div className={classNames(styles.title, {
                [styles.glossTitle] : gloss,
            })}><span>{ title }</span></div>
        </Link>
    );
}