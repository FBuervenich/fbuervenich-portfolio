// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
require('dotenv').config();
const axios = require('axios');

const LOCALES = [
  // locales list
  'de',
  'en',
];

module.exports = function (api, options) {
  api.loadSource(async actions => {
    const baseUrl = process.env.DATA_BASE_URL;
    const authToken = process.env.AUTH_TOKEN;

    const dataFiles = [
      { fileName: 'career.json', collectionName: 'Career' },
      { fileName: 'education.json', collectionName: 'Education' },
      { fileName: 'knowledge.json', collectionName: 'Knowledge' },
      { fileName: 'projects.json', collectionName: 'Projects' },
      { fileName: 'qualification.json', collectionName: 'Qualification' },
    ];

    const axiosOptions = { headers: { 'x-auth-token': authToken } };

    console.info('Fetching data...');

    for (const dataFile of dataFiles) {
      const { data } = await axios.get(
        baseUrl + dataFile.fileName,
        axiosOptions
      );
      const collection = actions.addCollection(dataFile.collectionName);

      data.forEach(v => {
        enricheAllWithLocalizationKeys(v);
        collection.addNode(v);
      });
    }

    const { data: personalData } = await axios.get(
      baseUrl + 'personal.json',
      axiosOptions
    );
    enricheAllWithLocalizationKeys(personalData);

    const singletonCollection = actions.addCollection('Singletons');
    singletonCollection.addNode({
      type: 'Personal',
      data: personalData,
    });
  });
};

/**
 * Searches through an object, finds all LocalizedStrings and adds
 * the default translation for missing languages
 */
function enricheAllWithLocalizationKeys(object) {
  Object.values(object).forEach(v => {
    if (typeof v === 'object' || Array.isArray(v)) {
      if (isLocalizedString(v)) {
        enricheWithLocalizationKeys(v);
      } else if (Array.isArray(v)) {
        v.forEach(arrayElem => {
          enricheWithLocalizationKeys(arrayElem);
        });
      } else {
        enricheAllWithLocalizationKeys(v);
      }
    }
  });
}

function enricheWithLocalizationKeys(val) {
  LOCALES.forEach(locale => {
    if (!val[locale]) {
      val[locale] = val.en;
    }
  });
}

function isLocalizedString(val) {
  return (
    val &&
    typeof val === 'object' &&
    val.en &&
    Object.entries(val).every(
      ([key, value]) => key.length === 2 && typeof value === 'string'
    )
  );
}
