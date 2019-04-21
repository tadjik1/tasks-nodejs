const mongoose = require('../libs/mongoose');

const schema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

schema.path('createdAt').index({expires: '7d'});

module.exports = mongoose.model('Session', schema);
