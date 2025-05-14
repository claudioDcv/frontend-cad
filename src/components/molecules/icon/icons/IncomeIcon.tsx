import React from 'react';

interface IncomeIconProps {
  color?: string;
  width?: string | number;
  height?: string | number;
}

const IncomeIcon: React.FC<IncomeIconProps> = ({
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
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      xmlSpace="preserve"
      style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
    >
      <g transform="matrix(-1.28514,-1.57384e-16,1.57384e-16,-1.28514,26.2364,20.1342)">
        <path 
          d="M9.972,8.639L9.972,4.087L7.76,4.087L11.078,-0.881L14.396,4.087L12.184,4.087L12.184,8.639C13.19,9.069 13.896,10.068 13.896,11.231C13.896,12.787 12.633,14.049 11.078,14.049C9.522,14.049 8.26,12.787 8.26,11.231C8.26,10.068 8.965,9.069 9.972,8.639Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default IncomeIcon;