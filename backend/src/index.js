// // 선언
// const {config} = require('dotenv').config();
// const express = require('express');
// // express 사용
// const app = express();
// // 기본 포트 설정
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiRoutes from './api/api.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/chart', apiRoutes);

const PORT = process.env.PORT;

// app.get('/', (req, res) => {
//     res.send('Hello Express!');
// });

// app.get('/hello', (req, res) => {
//     res.json({
//         message: '안녕하세요! 이것은 간단한 Express API입니다.',
//     });
// });

app.listen(PORT, () => {
    console.log(`Backend Sever running on port ${PORT}`);
});

export { app };