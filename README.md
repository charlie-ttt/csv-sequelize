# NPM csv-sequelize

To install

```bash
npm install csv-sequelize
```

To use

Make sure to create a database with a name.

```bash
const transfer = require('csv-sequelize');
transfer.runSeed(obj)
```

##obj

```bash
const obj = {
  csvFilePath: './testproducts.csv',
  databaseName: 'testcsv',    //Name must match with your local database
  tableName: 'testTable',     //Pick a name for your table
  columnTypes: [      //The number of column must match your data from csv
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
