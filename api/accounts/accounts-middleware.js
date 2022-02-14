const Accounts = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  const error = { status: 400 }
  const { name, budget } = req.body;
  if ( !name || !budget ) {
    error.message = 'name and budget are required'
  } else if ( name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100'
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number'
  } else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is to large or to small'
  } else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.params.name;
  try { 
    const existing = await db('Accounts')
    .where('name', name.trim())
    .first()

    if (existing) {
      next({status: 400, message: 'that name is taken'})
    }else {
      next()
    }
  }
  catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  let id = req.params.id;
  let result = await Accounts.getById(id);
  if(!result) {
    next({status: 404, message: 'account not found'})
  } else {
    next();
  }
}
