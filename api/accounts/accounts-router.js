const router = require('express').Router();
const Accounts = require('./accounts-model');

const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  Accounts.getAll()
  .then(accounts => {
    res.json(accounts);
  })
  .catch(err => {
    next({status: 500, message: 'could not get accounts'})
  })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  console.log('res:', req.result)
  res.json(req.result)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const data = await Accounts.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
