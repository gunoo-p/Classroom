const { hasUncaughtExceptionCaptureCallback } = require("process");

function checkNumbers(input, answer) {
    const inputArr = input.split("").map(Number);
    let strike = 0;
    
    const answerCount = Array(10).fill(0);
    const inputCount = Array(10).fill(0);

    for (let i = 0; i < answer.length; i++) {
        const a = answer[i];
        const g = inputArr[i];
        if (a === g) {
            strike++;
        }
        answerCount[a]++;
        inputCount[g]++;
    }
    let totalMatched = 0;
    for (let d = 0; d < 10; d++) {
        totalMatched += Math.min(answerCount[d], inputCount[d]);
    }
    const ball = totalMatched - strike;
    return {strike, ball};
}
module.exports = {checkNumbers};