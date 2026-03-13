const _0WJriaK4HVSTKtTwpHBX = require('../dictionary/offer.json');
const _HCskeNfDbZXnK8VA8T6R = require('../dictionary/quiz.json');
const _87rSQR2K6Wyf63mVVIZD = require('../dictionary/results.json');

const dictionaries = {
  "offer": _0WJriaK4HVSTKtTwpHBX,
  "quiz": _HCskeNfDbZXnK8VA8T6R,
  "results": _87rSQR2K6Wyf63mVVIZD
};
const getDictionaries = () => dictionaries;

module.exports.getDictionaries = getDictionaries;
module.exports = dictionaries;
