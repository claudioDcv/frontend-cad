import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import BoxIcon from './BoxIcon';
import ExpenditureIcon from './ExpenditureIcon';
import IncomeIcon from './IncomeIcon';
import Note from './Note';
import Receivable from './Receivable';
import IIcon from './IIcon';
import ExpenditureMovement from './ExpenditureMovement';
import IncomeMovement from './IncomeMovement';
import Movement from './Movement';
import CIcon from './CIcon';

const icons = [
  { name: 'BoxIcon', component: BoxIcon },
  { name: 'ExpenditureIcon', component: ExpenditureIcon },
  { name: 'IncomeIcon', component: IncomeIcon },
  { name: 'IIcon', component: IIcon },
  { name: 'ExpenditureMovement', component: ExpenditureMovement },
  { name: 'IncomeMovement', component: IncomeMovement },
  { name: 'Movement', component: Movement },
  { name: 'Note', component: Note },
  { name: 'Receivable', component: Receivable },
  { name: 'CIcon', component: CIcon },
];

describe('Icon components', () => {
  icons.forEach(({ name, component: Icon }) => {
    test(`${name} renders correctly with default props`, () => {
      const { container } = render(<Icon />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');

      const paths = container.querySelectorAll('path');
      expect(paths.length).toBeGreaterThan(0);
    });

    test(`${name} applies custom color and size`, () => {
      const { container } = render(<Icon color="red" width={32} height={32} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '32');
      expect(svg).toHaveAttribute('height', '32');

      const paths = container.querySelectorAll('path');
      paths.forEach((path) => {
        const fill = path.getAttribute('fill');

        if (fill) expect(fill).toBe('red');
      });

      const svgFill = svg?.getAttribute('fill');
      if (svgFill) expect(svgFill).toBe('red');
    });
  });
});
