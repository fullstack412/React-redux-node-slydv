const Sequelize = require('sequelize');
const db = require('../db');

const Deck = db.define('deck', {
  deckTitle: {
    type: Sequelize.STRING,
    defaultValue: 'Untitled Deck',
  },
  viewable: {
    type: Sequelize.BOOLEAN,
  },
  theme: {
    type: Sequelize.ENUM,
    values: ['antique', 'swiss', 'ulysses', 'red', 'green', 'blue'],
    defaultValue: 'antique',
  },
  hasFooter: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  footerText: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },
});

module.exports = Deck;
