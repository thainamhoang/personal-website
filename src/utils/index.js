export const dateConverter = date => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    switch (month) {
        case '01':
            return `January ${day}, ${year}`;
        case '02':
            return `February ${day}, ${year}`;
        case '03':
            return `March ${day}, ${year}`;
        case '04':
            return `April ${day}, ${year}`;
        case '05':
            return `May ${day}, ${year}`;
        case '06':
            return `June ${day}, ${year}`;
        case '07':
            return `July ${day}, ${year}`;
        case '08':
            return `August ${day}, ${year}`;
        case '09':
            return `September ${day}, ${year}`;
        case '10':
            return `October ${day}, ${year}`;
        case '11':
            return `November ${day}, ${year}`;
        case '12':
            return `December ${day}, ${year}`;
    }
};
