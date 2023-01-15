const router = require('express').Router({ mergeParams: true });
let Exercise = require('../models/exercise.model');

router.get('/', async (req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.json(400).json('Error: ' + err));
});

router.post('/add', async (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const newExercise = new Exercise({ username, description, duration, date });
  await newExercise
    .save()
    .then(() => res.json('Exercise added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});
router.get('/:id', async (req, res) => {
  await Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/:id', async (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then((exercise) => res.json('Exercise deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.put('/update/:id', async (req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      exercise
        .save()
        .then(() => res.json('Exercise updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});
module.exports = router;
