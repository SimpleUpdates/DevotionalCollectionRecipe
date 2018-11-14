function mutateIndex(dates, i, delta, iOfToday) {
    if (isNaN(delta)) return;

    let newI = i + delta;
    let iLoopedLeft = (newI < 0) ? iOfToday : newI;
    let iLoopedLeftRight = (iLoopedLeft >= dates.length) ? 0 : iLoopedLeft;

    return iLoopedLeftRight;
}

function setParamValue(url, key, value) {
    const cleanUrl = url.split("#")[0],
        hasParams = cleanUrl.includes("?"),
        regex = RegExp(`\\b${key}=[\\w-]*&?`),
        hasParam = regex.test(cleanUrl),
        keyValue = `${key}=${value}`;

    if (hasParam) return cleanUrl.replace(regex, `${keyValue}`);

    return hasParams ? `${cleanUrl}&${keyValue}` : `${cleanUrl}?${keyValue}`;
}

function getParamValue(url, key) {
    const regex = RegExp(`\\b${key}=[\\w-]*&?`),
        matches = url.match(regex);

    return matches ? matches[0].split("=")[1] : null;
}

function removeQueryString(url) {
    return url.split("?")[0];
}

function getTargetIndex(dates, target) {
    if (! dates || ! target) return null;

    const exactMatch = [].indexOf.call(dates, target);

    if (exactMatch !== -1) return exactMatch;

    const M = target.split("-")[1],
        D = target.split("-")[2];

    const proximities = dates.map(date => {
        const m = date.split("-")[1],
            d = date.split("-")[2],
            deltaM = (M - m > 0) ? M - m : M - m + 12,
            deltaD = (D - d > 0) ? D - d : D - d + 365;

        return (deltaM * 31) + deltaD;
    });

    return proximities.indexOf(Math.min(...proximities));
}

function shouldShowNext(i, dates, dateToday) {
    if (! dates) return false;

    const initialIndex = getTargetIndex(dates, dateToday);

    return i < initialIndex;
}

document.addEventListener("DOMContentLoaded", function (event) {
    function showI(i) {
        Array.from(days, day => day.classList.remove("recipe-devotional-current"));
        days[i].classList.add("recipe-devotional-current");
    }

    function applyDelta(delta) {
        i = mutateIndex(dates, i, delta, i);
        document.location.href = setParamValue(document.location.href, "date", dates[i]);
    }

    function getI() {
        const urlDate = getParamValue(document.location.href, "date");
        const iOfDate = getTargetIndex(dates, urlDate);

        return iOfDate ? iOfDate : iOfToday;
    }

    if (!document.getElementsByClassName("recipe-devotional").length) return;

    const days = document.getElementsByClassName("recipe-devotional-day"),
        dates = Array.from(days, day => day.getAttribute("data-date"));

    const dateToday = new Date().toJSON().slice(0,10);
    const iOfToday = getTargetIndex(dates, dateToday);
    let i = getI();

    showI(i);

    const previousButton = document.getElementById("recipe-devotional-previous");
    const todayButton = document.getElementById("recipe-devotional-today");
    const nextButton = document.getElementById("recipe-devotional-next");

    if (! shouldShowNext(i, dates, dateToday)) {
        nextButton.style.display = 'none';
    }

    previousButton.addEventListener("click", function (event) {
        event.preventDefault();
        applyDelta(-1);
    });

    todayButton.addEventListener("click", function () {
        event.preventDefault();
        document.location.href = removeQueryString(document.location.href);
    });

    nextButton.addEventListener("click", function () {
        event.preventDefault();
        applyDelta(1);
    });
});