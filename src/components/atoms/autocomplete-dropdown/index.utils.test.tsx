import { AutocompleteRenderInputParams } from '@mui/material';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  createItem,
  handleAutocompleteChange,
  renderInputHandler,
} from './index.utils';
import { Item } from '@/entities/Item.entity';

describe('handleAutocompleteChange', () => {
  test('should call onChange with new value', () => {
    const onChangeMock = vi.fn();
    const event = {
      preventDefault: () => {},
      stopPropagation: () => {},
      nativeEvent: new Event('change'),
    } as React.SyntheticEvent;
    const newValue = 'Nuevo valor';

    handleAutocompleteChange(event, newValue, onChangeMock);

    expect(onChangeMock).toHaveBeenCalledWith(event, newValue);
  });
});

describe('renderInputHandler', () => {
  test('should return a function that renders a TextField with the correct label', () => {
    const label = 'Categorías';
    const renderInput = renderInputHandler(label);

    const params: AutocompleteRenderInputParams = {
      id: 'autocomplete',
      disabled: false,
      fullWidth: true,
      size: 'small',
      InputLabelProps: {},
      InputProps: {
        ref: null,
        className: '',
        startAdornment: undefined,
        endAdornment: undefined,
        onMouseDown: function (): void {
          throw new Error('Function not implemented.');
        },
      },
      inputProps: { ref: null },
    };

    render(renderInput(params));

    const textField = screen.getByLabelText(label);
    expect(textField).toBeInTheDocument();
  });

  describe('createItem', () => {
    test('should return empty Item for null or undefined', () => {
      expect(createItem(null)).toEqual({ label: '', value: '' });
      expect(createItem(undefined)).toEqual({ label: '', value: '' });
    });

    test('should return Item for string value', () => {
      expect(createItem('Test')).toEqual({ label: 'Test', value: 'Test' });
    });

    test('should return Item for number value', () => {
      expect(createItem(123)).toEqual({ label: '123', value: '123' });
    });

    test('should return same Item for existing Item object', () => {
      const item: Item = { label: 'Test', value: 'test' };
      expect(createItem(item)).toEqual(item);
    });
  });
});
