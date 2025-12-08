/**
 * 
 * @returns 랜덤 숫자 5개
 */
function generateNumbers () {
    const nums = [];
    while(nums.length < 5) {
        const n = Math.floor(Math.random() * 10);
        nums.push(n);
    }
    return nums;
 }
 module.exports = {generateNumbers};