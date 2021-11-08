export default function ArrowUp() {
    const strokeColor = "var(--black)";

    return (
        <svg className="icon" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                d="M18 15L12 9L6 15"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
