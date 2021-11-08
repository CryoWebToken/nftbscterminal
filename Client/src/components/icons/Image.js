export default function Image() {
    const strokeColor = "var(--black)";

    return (
        <svg className="icon" fill="none" width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path
                d="M19.6369 3.80093H5.63693C4.53236 3.80093 3.63693 4.69636 3.63693 5.80093V19.8009C3.63693 20.9055 4.53236 21.8009 5.63693 21.8009H19.6369C20.7415 21.8009 21.6369 20.9055 21.6369 19.8009V5.80093C21.6369 4.69636 20.7415 3.80093 19.6369 3.80093Z"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.13693 10.8009C9.96536 10.8009 10.6369 10.1294 10.6369 9.30093C10.6369 8.47251 9.96536 7.80093 9.13693 7.80093C8.30851 7.80093 7.63693 8.47251 7.63693 9.30093C7.63693 10.1294 8.30851 10.8009 9.13693 10.8009Z"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21.6369 15.8009L16.6369 10.8009L5.63693 21.8009"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
