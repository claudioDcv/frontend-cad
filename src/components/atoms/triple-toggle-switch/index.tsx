import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

interface TripleToggleSwitchProps {
    value: unknown;
    options: { value: unknown; label: string }[];
    label?: string;
    onChange: (value: unknown) => void;
}

const TripleToggleSwitch: React.FC<TripleToggleSwitchProps> = ({ value, options, label, onChange }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [sliderStyle, setSliderStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

    const updateSliderPosition = useCallback(() => {
        const activeIndex = options.findIndex(option => option.value === value);
        if (activeIndex !== -1 && optionRefs.current[activeIndex] && containerRef.current) {
            const activeElement = optionRefs.current[activeIndex];

            if (activeElement) {
                setSliderStyle({
                    left: activeElement.offsetLeft,
                    width: activeElement.offsetWidth
                });
            }
        }
    }, [value, options]);

    useEffect(() => {
        updateSliderPosition();
    }, [updateSliderPosition]);

    useEffect(() => {
        // Actualizar posición después del primer render
        const timer = setTimeout(updateSliderPosition, 0);
        return () => clearTimeout(timer);
    }, [updateSliderPosition]);

    return (
        <div className={styles.tripleToggleSwitchContainer} data-value={value}>
            {label && <label>{label}</label>}
            <div ref={containerRef}>
                {options.map((option, index) => (
                    <div
                        key={`option-${option.value}`}
                        ref={(el) => { optionRefs.current[index] = el; }}
                        className={`${styles.option} ${value === option.value ? styles.active : ''}`}
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                    </div>
                ))}
                <div
                    className={styles.slider}
                    style={{
                        left: `${sliderStyle.left}px`,
                        width: `${sliderStyle.width}px`
                    }}
                ></div>
            </div>
        </div>
    );
};

export default TripleToggleSwitch;
