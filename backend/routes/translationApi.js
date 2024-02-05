"use strict";

require("dotenv").config();
const express = require("express");
const router = express.Router();
const deepl = require("deepl-node");
const translator = new deepl.Translator(process.env.TRANSLATOR_API_KEY);

/** Routes for DeepL API. */

/** GET /translate {text, sourcelanguage, targetLanguage, options} =>
 *      {detected_source_language, text}
 *   Uses translation library to send text, a source language,
 *   and a target languge to request a translation
 *   If source language is ommitted, the API will attempt to detect it
 **/
router.get("/translate", async function (req, res, next) {
  const { to, from, text } = req.body;
  try {
    const result = await translator.translateText(text, from, to, {
      splitSentences: "on",
      formality: "prefer_less",
    });
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

/** GET /source-languages {} => {language, name, supports_formality}
 *   Uses translation library to request array of valid source languages
 **/
router.get("/source-languages", async function (req, res, next) {
  try {
    const sourceLanguages = await translator.getSourceLanguages();
    return res.json(sourceLanguages);
  } catch (err) {
    return next(err);
  }
});

/** GET /target-languages {} => {language, name, supports_formality}
 *   Uses translation library to request array of valid target languages
 **/
router.get("/target-languages", async function (req, res, next) {
  try {
    const targetLanguages = await translator.getTargetLanguages();
    return res.json(targetLanguages);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
