export function stringIsEmpty(str) {
    return (str.length == 0 ? true : false)
}

export function cleanString(str) {
    return str.replace(/[|&;$%@"<>()+,]/g, "")
}