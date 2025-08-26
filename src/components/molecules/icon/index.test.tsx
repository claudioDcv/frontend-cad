import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Icon from './index';

describe('Icon', () => {
  test('should render the icon correctly', () => {
    render(<Icon name='sent' />);

    const iconElement = screen.getByTestId('send-icon');
    expect(iconElement).toBeInTheDocument();
  });
});
