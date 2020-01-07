const stringUtils = (function() {

    function stringIsEmpty(str) {
        return (str.length == 0 ? true : false);
    }

    function cleanString(str) {
        return str.replace(/[|&;$%@"<>()+,]/g, '');
    }

    return {
        stringIsEmpty: stringIsEmpty,
        cleanString: cleanString
    }

}());

export { stringUtils };