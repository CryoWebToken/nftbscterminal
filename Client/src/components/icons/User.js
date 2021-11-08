export default function User() {
    const strokeColor = "var(--black)";

    return (
        <svg className="icon" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path
                d="M20.0382 21.9698V19.9698C20.0382 18.9089 19.6167 17.8915 18.8666 17.1413C18.1165 16.3912 17.099 15.9698 16.0382 15.9698H8.03818C6.97731 15.9698 5.9599 16.3912 5.20975 17.1413C4.4596 17.8915 4.03818 18.9089 4.03818 19.9698V21.9698"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.0382 11.9698C14.2473 11.9698 16.0382 10.1789 16.0382 7.96977C16.0382 5.76063 14.2473 3.96977 12.0382 3.96977C9.82904 3.96977 8.03818 5.76063 8.03818 7.96977C8.03818 10.1789 9.82904 11.9698 12.0382 11.9698Z"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
