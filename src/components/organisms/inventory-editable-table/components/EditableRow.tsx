import { useRef, useState, useEffect } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import styles from './EditableRow.module.css';

interface EditableRowProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
}

const EditableRow: React.FC<EditableRowProps> = ({
  value,
  onChange,
  type = 'number',
}) => {
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState(value.replace('.', ','));
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    if (!editable) return;
    setEditable(false);

    if (type === 'number') {
      const normalized = inputValue.replace(',', '.');
      const parsed = parseFloat(normalized);

      if (!isNaN(parsed)) {
        const stringified = parsed.toString();
        onChange(stringified);
        setInputValue(stringified.replace('.', ','));
      } else {
        setInputValue(value.replace('.', ','));
      }
    } else {
      onChange(inputValue);
    }
  });

  const handleClick = () => {
    setEditable(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    if (type === 'number') {
      const validRegex = /^-?\d*,?\d*$/;
      if (
        (validRegex.test(val) || val === '' || val === '-') &&
        val.length <= 10
      ) {
        setInputValue(val);
        onChange(val.replace(',', '.'));
      }
    } else {
      setInputValue(val);
      onChange(val);
    }
  };

  useEffect(() => {
    setInputValue(value.replace('.', ','));
  }, [value]);

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={styles.container}
      data-focus={editable}
    >
      <input
        value={inputValue}
        onChange={handleChange}
        autoFocus
        type="text"
        className={styles.input}
        readOnly={!editable}
      />
    </div>
  );
};

export default EditableRow;
