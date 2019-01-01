const express = require('express');
const { checkSchema, validationResult } = require('express-validator/check');
const app = express();

app.get('/', checkSchema({
  limit: {
    in: ['query'],
    optional: true,
    toInt: true,
    custom: {
      options: value => {
        if (value < 0 || value > 10) {
          throw new Error('limit must be between 0 and 10');
        }
        return value;
      }
    }
  }
}), (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    res.send('All good');
  } else {
    res.status(400).send(errors.array());
  }
});

app.listen(3000);