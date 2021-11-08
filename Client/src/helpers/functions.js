export const getCurPath = () => {
    const str = window.location.pathname;
    return str[str.length - 1] === "/" ? str.substring(-1) : str;
}

export const intlNumFormat = function (num, locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 0
    }).format(num);
}

export const intlNumFormatMaxDecimals = function (num, decimals = 2, locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        style: "decimal",
        maximumFractionDigits: decimals
    }).format(num);
}

export const intlCurrNumFormat = function (num, curr, locale = "en-US") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: curr,
        minimumFractionDigits: 0
    }).format(num);
}

export const intlDateFormat = function (date, locale = "en-US") {
    return new Intl.DateTimeFormat(locale).format(date);
}

export const trimAddress = address => {
    if(!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export const sortByName = (a, b, name) => {
    const nameA = a[name].toLowerCase();
    const nameB = b[name].toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;        
}

export const getColorFromRarity = value => {
    if(value <= 0.01) return "yellow";
    if(value <= 0.1) return "blue";
    if(value <= 1) return "pink";
    return "gray";
}
