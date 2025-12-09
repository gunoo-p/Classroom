const {generateNumbers} = require("./generate");
const {validateInput} = require("./validate");
const {checkNumbers} = require("./compare");

const readline = require("readline");

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

let answer = [];
let attempts = 0; // 시도횟수
const maxAttempts = 15; // 최대 시도횟수

function startGame() {
    answer = generateNumbers();
    attempts = 0;

    console.log("=======================");
    console.log("숫자 야구 게임");
    console.log("=======================");
    console.log("0 ~ 9까지의 중복이 있는 5자리 숫자를 맞춰보세요!")
    console.log("종료하려면 exit를 입력해주세요.");
    console.log(answer);
    askInput();
}

startGame();

function askInput() {
    rl.question("숫자를 입력하세요 : ", (input) => {
        if(input === "exit") return endGame();
        
        if(!validateInput(input)) {
            console.log("올바르지 않은 입력입니다! (중복 O, 5자리)");
            return askInput();
        }
        attempts++;
        const { strike, ball } = checkNumbers(input, answer);

        console.log(`결과 : ${strike}S ${ball}B`);

        if (strike === 5) {
            console.log("\n 정답입니다! 게임 종료!");
            return endGame();
        }

        if (attempts >= maxAttempts) {
            console.log(`\n 실패! 정답은 ${answer.join("")} 입니다.`);
            return endGame();
        }

        askInput();
    });
}

function endGame() {
    console.log("\n 게임을 종료 합니다.");
    rl.close();
}