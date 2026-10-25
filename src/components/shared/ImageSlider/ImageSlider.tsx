'use client';

import { KeyboardEvent, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import classNames from "classnames";
import Button from "../Button/Button";
import ImgTag from "../ImgTag/ImgTag";
import styles from './ImageSlider.module.css';

export interface ImageSliderProps {
    images: string[],
    label: string,
}

export default function ImageSlider({ images, label }: ImageSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        breakpoints: { '(prefers-reduced-motion: reduce)': { duration: 0 } },
    }, [Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })]);
    const hasControls = images.length > 1;

    useEffect(() => {
        if (!emblaApi) return;

        const updateIndex = () => setActiveIndex(emblaApi.selectedScrollSnap());
        updateIndex();
        emblaApi.on('select', updateIndex).on('reInit', updateIndex);

        return () => {
            emblaApi.off('select', updateIndex).off('reInit', updateIndex);
        };
    }, [emblaApi]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!hasControls || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;

        event.preventDefault();
        if (event.key === 'ArrowRight') emblaApi?.scrollNext();
        else emblaApi?.scrollPrev();
    };

    return (
        <div
            className={styles.wrapper}
            role="region"
            aria-roledescription="карусель"
            aria-label={label}
            tabIndex={hasControls ? 0 : undefined}
            onKeyDown={handleKeyDown}>
            {images.length === 0 ? (
                <div className={styles.empty}>
                    <span className={styles.emptyTitle}>{label}</span>
                    <p>Изображения скоро появятся.</p>
                </div>
            ) : (
                <>
                    <div className={styles.stage}>
                        <div className={styles.viewport} ref={emblaRef}>
                            <div className={styles.track}>
                                {images.map((src, index) => (
                                    <div
                                        key={src}
                                        className={styles.slide}
                                        role="group"
                                        aria-roledescription="слайд"
                                        aria-label={`${index + 1} из ${images.length}`}
                                        aria-hidden={index !== activeIndex}>
                                        <ImgTag src={src} alt={`${label} — ${index + 1}`} width={1200} height={900} className={styles.image} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {hasControls && (
                            <>
                                <Button type="button" className={classNames(styles.arrow, styles.previous)} onClick={() => emblaApi?.scrollPrev()} aria-label="Предыдущее изображение">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="m15 18-6-6 6-6" />
                                    </svg>
                                </Button>
                                <Button type="button" className={classNames(styles.arrow, styles.next)} onClick={() => emblaApi?.scrollNext()} aria-label="Следующее изображение">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="m9 6 6 6-6 6" />
                                    </svg>
                                </Button>
                            </>
                        )}
                    </div>
                    {hasControls && (
                        <div className={styles.dots}>
                            {images.map((src, index) => (
                                <button
                                    key={src}
                                    type="button"
                                    className={classNames(styles.dot, { [styles.activeDot]: index === activeIndex })}
                                    aria-label={`Показать изображение ${index + 1}`}
                                    aria-current={index === activeIndex ? 'true' : undefined}
                                    onClick={() => emblaApi?.scrollTo(index)} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
