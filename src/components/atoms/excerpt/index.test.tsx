import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Excerpt from '.';

describe('Excerpt component', () => {
  const longText =
    'This is a very long text that exceeds the default 100 character limit. We keep writing here to make sure it is really long.';
  const shortText = 'Short text';

  test('displays full text if it is short', () => {
    render(<Excerpt text={shortText} />);
    expect(screen.getByText(shortText)).toBeInTheDocument();
  });

  test('displays truncated text with ellipsis if it is long', () => {
    render(<Excerpt text={longText} maxLength={50} />);
    expect(
      screen.getByText(/This is a very long text that exceeds the defaul.../)
    ).toBeInTheDocument();
  });

  test('shows tooltip only if tooltip=true and text is long', async () => {
    render(<Excerpt text={longText} maxLength={50} tooltip={true} />);
    // Tooltip is not visible initially
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    // Hover over the text to show tooltip
    await userEvent.hover(
      screen.getByText(/This is a very long text that exceeds the defaul.../)
    );

    // Now tooltip should appear with the full text
    expect(await screen.findByRole('tooltip')).toHaveTextContent(longText);
  });

  test('does not show tooltip if tooltip=false', async () => {
    render(<Excerpt text={longText} maxLength={50} tooltip={false} />);
    await userEvent.hover(
      screen.getByText(/This is a very long text that exceeds the defaul.../)
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
