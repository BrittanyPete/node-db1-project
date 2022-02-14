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

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try{
    const data = await Accounts.updateById(req.params.id, req.body)
    res.json(data)
  }
  catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
    const acct = await Accounts.getById(req.params.id)
    await Accounts.deleteById(req.params.id);
    res.json(acct);
  }
  catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
