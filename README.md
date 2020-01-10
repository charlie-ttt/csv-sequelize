# NPM csv-sequelize

This module allows you to create a sequelize database table (Works for postgreSQL, but have not tested for other database type) from csv file.

## To Install

```bash
npm install csv-sequelize
```

## To Use

Make sure to create a database with a name.

```bash
const dbMod = require('csv-sequelize');
  const dbObj = await dbMod(obj);
  //make sure to put this in an async function if you want to use await.

  const table = dbObj.dbTable;
  const db = dbObj.db;
```

## object input

```bash
const obj = {
  csvFilePath: './testproducts.csv',
  databaseName: 'testcsv', //Name must match with your local database
  tableName: 'testTableName', //Pick a name for your table
  columnTypes: [
    //The number of column must match your data from csv
    'TEXT',
    'INTEGER',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT'
  ]
};
```

## Example file on how to use this module

```bash
// const Sequelize = require('sequelize');
const dbMod = require('csv-sequelize');

const obj = {
  csvFilePath: './testproducts.csv',
  databaseName: 'testcsv', //Name must match with your local database
  tableName: 'testTableName', //Pick a name for your table
  columnTypes: [
    //The number of column must match your data from csv
    'TEXT',
    'INTEGER',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT',
    'TEXT'
  ]
};

const runThis = async () => {
  try {
    const dbObj = await dbMod(obj);
    const table = dbObj.dbTable;
    const db = dbObj.db;

    await table.create({
      id: 'hellow',
      ndbNumber: 3,
      longName: 'hellow',
      dataSource: 'hellow',
      gtinupc: 'hellow',
      manufacturer: 'hellow',
      dateModified: 'hellow',
      dateAvailable: 'hellow',
      ingredientsEnglish: 'hellow',
      photoUrl: 'hellow',
      asin: 'hellow'
    });

    db.close;
    console.log('db connection closed');
  } catch (error) {
    console.log(error);
  }
};

runThis();



```
