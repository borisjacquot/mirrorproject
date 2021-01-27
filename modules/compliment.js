module.exports.compliment = function (nb) {
    let res;
    switch (nb) {
        case 0:
            res = "Hello Beauty!";
            break;
        case 1:
            res = "You inspire me.";
            break;
        case 2:
            res = "You bring out the best in people.";
            break;
        case 3:
            res = "You always know what to say.";
            break;
        default:
            res = "Hello World!";
            break;
    }

    return res;
}