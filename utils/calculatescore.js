/**
 * 计算用户场景学习得分
 */
let score = 0;
let ppq = 2;//每题2分
function addScore(){
    score = score + ppq;
    return score;
}

module.exports = { addScore, score}