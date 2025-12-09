// 선언
const {config} = require('dotenv').config();
const express = require('express');
// express 사용
const app = express();
// 기본 포트 설정
const port = process.env.PORT;

// 통신할 떄 json을 사용하겠다
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.get('/hello', (req, res) => {
    res.json({
        message: '안녕하세요! 이것은 간단한 Express API입니다.',
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})