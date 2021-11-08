export default function Move() {
    const strokeColor = "var(--black)";

    return (
        <svg className="icon" fill="none" width="24" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25">
            <path
                d="M5 9.5L2 12.5L5 15.5"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 5.5L12 2.5L15 5.5"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 19.5L12 22.5L9 19.5"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19 9.5L22 12.5L19 15.5"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2 12.5H22"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 2.5V22.5"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
