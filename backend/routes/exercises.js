const express = require('express');
const Exercise = require('../models/exercise.model');
const router = express.Router();

//全ての記事を取得
router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json({data:exercises});
    } catch (error) {
        res.status(400).json({'Error':error});
    }
});

//個別記事を取得
router.get('/:id',async(req,res)=>{
    try{
        const _id=req.params.id;
        const exercise=await Exercise.findById(_id);
        res.json(exercise);
    }catch(error){
        res.status(400).json({'Error':error});
    }
})

//削除
router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        await Exercise.deleteOne({ _id });
        res.json('削除完了');
    } catch (error) {
        res.status(400).json({'Error':error});
    }
});

//記事の修正
router.post('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const { username, description, duration, date } = req.body;
        const exercise = await Exercise.findById(_id);
        if (username !== undefined) exercise.username = username;
        if (description !== undefined) exercise.description = description;
        if (duration !== undefined) exercise.duration = duration;
        if (date !== undefined) exercise.date = date;
        const result = await exercise.save();
        res.json(result);
    } catch (error) {
        res.status(400).json({'Error':error});
    }

//記事の投稿
});

router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const description = req.body.description;
        const duration = Number(req.body.duration);
        const date = Date.parse(req.body.date);
        if(!username&&!description){return res.status(400).json({error:'ユーザーと説明文を入力して下さい'})}
        if(!username){return res.status(400).json({error:'ユーザーを選んでください'})}
        if(!description){return res.status(400).json({error:'説明文は必須です'})}
        const newExercise = new Exercise({
            username,
            description,
            duration,
            date,
        });
        const result = await newExercise.save();
        res.json(result);
    } catch (error) {
        res.status(400).json({'Error':error});
    }

})

module.exports = router;
