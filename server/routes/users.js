import express from 'express';

import { AddExercise, AddTarget, getUser, getUsers, signin, signup, UpdateExercise, RemoveExercise, ReplaceExercise } from '../controllers/users.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/', getUsers);
router.get('/:id', getUser);

router.post('/:id', AddExercise);

//this overrites, so can add or update - needs to come as {target: num}
router.post('/:id/:exerciseId', AddTarget);

router.put('/:id/:exerciseId', UpdateExercise);

router.patch('/:id/:exerciseId', ReplaceExercise);

router.delete('/:id/:exerciseId', RemoveExercise);



export default router;