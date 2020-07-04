/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import initial from './initial';

const LOCAL_STORAGE_KEY = 'jafar-editor';

const getDB = () => {
  // fetch local db
  let db = localStorage.getItem(LOCAL_STORAGE_KEY);
  db = db ? JSON.parse(db) : {};
  return db;
};

export default {
  reset: () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
  },
  searchEntity: (type) => {
    const db = getDB();
    const entityMap = db[type] || {};
    return entityMap;
  },
  getEntity: (type, id) => {
    const db = getDB();
    const entityMap = db[type] || {};
    return entityMap[id];
  },
  setEntity: (type, id, entity) => {
    const db = getDB();
    db[type] = db[type] || {};
    db[type][id] = entity;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  },
  removeEntity: (type, id) => {
    const db = getDB();
    db[type] = db[type] || {};
    delete db[type][id];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  },
};
