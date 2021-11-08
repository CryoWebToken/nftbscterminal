export default function Mail() {
    const strokeColor = "var(--black)";

    return (
        <svg className="icon" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path
                d="M4.03818 4.83218H20.0382C21.1382 4.83218 22.0382 5.73218 22.0382 6.83218V18.8322C22.0382 19.9322 21.1382 20.8322 20.0382 20.8322H4.03818C2.93818 20.8322 2.03818 19.9322 2.03818 18.8322V6.83218C2.03818 5.73218 2.93818 4.83218 4.03818 4.83218Z"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M22.0382 6.83218L12.0382 13.8322L2.03818 6.83218"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
