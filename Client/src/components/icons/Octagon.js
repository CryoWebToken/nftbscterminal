export default function Octagon() {
    const strokeColor = "var(--red)";

    return (
        <svg className="icon" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path
                d="M8.61505 2.96977H16.8951L22.7551 8.82977V17.1098L16.8951 22.9698H8.61505L2.75505 17.1098V8.82977L8.61505 2.96977Z"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.7551 9.96977L9.75505 15.9698"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.75505 9.96977L15.7551 15.9698"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
