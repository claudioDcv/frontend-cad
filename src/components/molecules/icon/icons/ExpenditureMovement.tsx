import React from 'react';

interface ExpenditureMovementIconProps {
  color?: string;
  width?: string | number;
  height?: string | number;
}

const ExpenditureMovementIcon: React.FC<ExpenditureMovementIconProps> = ({
  color = 'currentColor',
  width = 24,
  height = 24,
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
    >
      <g transform="matrix(-1,1.22465e-16,-1.22465e-16,-1,23.2523,23.8998)">
        <path 
          d="M9.033,6.56C8.48,7.853 7.196,8.76 5.701,8.76C3.702,8.76 2.08,7.137 2.08,5.138C2.08,3.139 3.702,1.516 5.701,1.516C7.196,1.516 8.48,2.424 9.033,3.717L16.294,3.717C16.636,3.717 16.963,3.853 17.205,4.094C17.447,4.336 17.582,4.664 17.582,5.005L17.582,15.898L20.425,15.898L16.161,22.283L11.897,15.898L14.74,15.898L14.74,6.56L9.033,6.56Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default ExpenditureMovementIcon;