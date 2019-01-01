const express = require('express');
const { checkSchema, validationResult } = require('express-validator/check');
const app = express();

app.get('/', checkSchema({
  limit: {
    in: ['query'],
    optional: true,
    custom: {
      options: value => {
        const v = parseInt(value);
        if (!isNaN(v)) {
          if (v < 0 || v > 10) {
            throw new Error('limit must be between 0 and 10');
          }
          return v; // RETURN THE SANITIZED NUMBER VALUE
        }
        throw new Error('Limit must be a number');
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