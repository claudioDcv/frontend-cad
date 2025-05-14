import React from 'react';

interface BoxIconProps {
  color?: string;
  width?: string | number;
  height?: string | number;
}

const BoxIcon: React.FC<BoxIconProps> = ({
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
      <g transform="matrix(1,0,0,1,1.77636e-15,0.695755)">
        <path 
          d="M16.41,2.086L16.41,10.608L7.887,10.608L7.887,2.086L16.41,2.086ZM15.062,3.504L9.235,3.504L9.235,7.301L15.062,7.301L15.062,3.504Z"
          fill={color}
        />
        <g transform="matrix(1,0,0,1,-5.1058,9.91432)">
          <path 
            d="M16.41,2.086L16.41,10.608L7.887,10.608L7.887,2.086L16.41,2.086ZM15.062,3.504L9.235,3.504L9.235,7.301L15.062,7.301L15.062,3.504Z"
            fill={color}
          />
        </g>
        <g transform="matrix(1,0,0,1,4.80852,9.91432)">
          <path 
            d="M16.41,2.086L16.41,10.608L7.887,10.608L7.887,2.086L16.41,2.086ZM15.062,3.504L9.235,3.504L9.235,7.301L15.062,7.301L15.062,3.504Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};

export default BoxIcon;