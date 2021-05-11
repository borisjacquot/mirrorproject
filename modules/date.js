module.exports.month = function (nb) {
    let res;
    switch (nb) {
        case 1:
            res = "Janvier";
            break;
        case 2:
            res = "Février";
            break;
        case 3:
            res = "Mars";
            break;
        case 4:
            res = "Avril";
            break;
        case 5:
            res = "Mai";
            break;
        case 6:
            res = "Juin";
            break;
        case 7:
            res = "Juillet";
            break;
        case 8:
            res = "Août";
            break;
        case 9:
            res = "Septembre";
            break;
        case 10:
            res = "Octobre";
            break;
        case 11:
            res = "Novembre";
            break;
        case 12:
            res = "Décembre";
            break;
        default:
            res = "Month";
            break;
    }

    return res;
}
