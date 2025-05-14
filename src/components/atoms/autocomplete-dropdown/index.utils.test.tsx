import { describe, expect, test, vi } from 'vitest';
import { AutocompleteRenderInputParams } from '@mui/material';
import { render, screen } from '@testing-library/react';
import {
  handleAutocompleteChange,
  renderInputHandler,
} from './index.utils';

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
});
