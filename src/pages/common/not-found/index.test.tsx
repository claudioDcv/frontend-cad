import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

import * as useAccessModule from '@components/atoms/access/useAccess';
import NotFoundPage from './index';

vi.mock('@components/atoms/access/useAccess');

describe('NotFoundPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders correctly', () => {
        (useAccessModule.default as vi.Mock).mockReturnValue(() => true);
        render(<NotFoundPage />);
        expect(screen.getByText('error.404Error')).toBeInTheDocument();
    });
});