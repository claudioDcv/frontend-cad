import React from 'react';

interface NoteProps {
    color?: string;
    width?: string | number;
    height?: string | number;
}

const Note: React.FC<NoteProps> = ({
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
            <g transform="matrix(1.07079,0,0,1.07079,-1.79213,-0.94632)">
                <path
                    d="M12.88,1.793C18.564,1.793 23.178,6.407 23.178,12.09C23.178,17.774 18.564,22.388 12.88,22.388C7.197,22.388 2.582,17.774 2.582,12.09C2.582,6.407 7.197,1.793 12.88,1.793ZM7.827,6.759L7.827,17.422L10.177,17.422L10.177,9.831L10.207,9.831L14.861,17.422L17.933,17.422L17.933,6.759L15.584,6.759L15.584,14.169L15.554,14.169L11.02,6.759L7.827,6.759Z"
                    style={{ fillRule: 'nonzero', fill: color }}
                />
            </g>
        </svg>
    );
};

export default Note;
