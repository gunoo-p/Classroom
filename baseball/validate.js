function validateInput(input) {
    if (input.length !== 5) {
        return false;
    }

    if (isNaN(input)) {
        return false;
    }

    const arr = input.split("");
    return true;
}

module.exports = {validateInput};