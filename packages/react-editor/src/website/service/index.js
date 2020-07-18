/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import initialDatabase from '../database';

const LOCAL_STORAGE_KEY = 'jafar-editor';

const getDB = () => {
  // fetch local db
  let db = localStorage.getItem(LOCAL_STORAGE_KEY);
  db = db ? JSON.parse(db) : {};
  return db;
};

export default {
  reset: async () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialDatabase));
  },
  searchEntity: async (name) => {
    const db = getDB();
    const entityMap = db[name] || {};
    const data = Object.keys(entityMap).map(id => ({ id, ...entityMap[id] }));
    return { data, count: data.length };
  },
  getEntity: async (name, id) => {
    const db = getDB();
    const entityMap = db[name] || {};
    return { id, ...entityMap[id] };
  },
  setEntity: async (name, id, entity) => {
    const db = getDB();
    db[name] = db[name] || {};
    db[name][id] = entity;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  },
  removeEntity: async (name, id) => {
    const db = getDB();
    db[name] = db[name] || {};
    delete db[name][id];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  },
};
