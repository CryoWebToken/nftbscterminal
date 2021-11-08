export default function Link() {
    const strokeColor = "var(--black)";

    return (
        <svg className="icon" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path
                d="M12.6408 22.9698C18.1636 22.9698 22.6408 18.4926 22.6408 12.9698C22.6408 7.44692 18.1636 2.96977 12.6408 2.96977C7.11793 2.96977 2.64078 7.44692 2.64078 12.9698C2.64078 18.4926 7.11793 22.9698 12.6408 22.9698Z"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.6408 16.9698V12.9698"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.6408 8.96977H12.6508"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
