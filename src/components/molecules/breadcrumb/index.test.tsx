import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Breadcrumb from './index';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe('Breadcrumb', () => {
  test('renders simple breadcrumbs', () => {
    render(<Breadcrumb items={[{ label: 'Home' }, { label: 'Page' }]} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Page')).toBeInTheDocument();
  });

  test('renders items with links', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', link: '/' },
          { label: 'Page', link: '/page' },
        ]}
      />
    );

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');

    const pageItem = screen.getByText('Page');
    expect(pageItem.tagName).toBe('P');
  });

  test('renders last item as link when lastItemLink is true', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', link: '/' },
          { label: 'Page', link: '/page' },
        ]}
        lastItemLink={true}
      />
    );

    const pageLink = screen.getByText('Page').closest('a');
    expect(pageLink).toHaveAttribute('href', '/page');
  });

  test('renders action if provided', () => {
    render(
      <Breadcrumb
        items={[{ label: 'Home' }, { label: 'Page' }]}
        action={<button>Click me</button>}
      />
    );

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
