/**
 * 计算用户场景学习得分
 */
let score = 0;
let ppq = 2;//每题2分
//分数增加
function addScore(){
    score = score + ppq;
    return score;
}
//分数重置
function resetScore(){
    score = 0;
}

module.exports = { addScore, resetScore}