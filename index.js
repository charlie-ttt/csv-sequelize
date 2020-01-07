const csv = require('csvtojson');
const Sequelize = require('sequelize');

const testObj = {
  csvFilePath: './testproducts.csv',
  databaseName: 'testcsv',
  tableName: 'testTable',
  columnTypes: [
    'TEXT',
    'TEXT',
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

const seed = async obj => {
  try {
    // console.log('here is test data obj: ', obj);
    const jsonObjArray = await csv().fromFile(obj.csvFilePath);
    // console.log('TCL: jsonObjArray', jsonObjArray);

    const db = new Sequelize(
      process.env.DATABASE_URL ||
        `postgres://localhost:5432/${obj.databaseName}`,
      {
        // logging: false
      }
    );
    //forcefully drop existing tables(if any) and creates new ones. creates if they don't exist at all.
    await db.sync({ force: true });
    console.log('db synced!');

    //initialize table by looping through CSV's json object
    const columnNames = Object.keys(jsonObjArray[0]);
    console.log('TCL: columnNames', columnNames);
    console.log('TCL: columnNames.length', columnNames.length);

    //check to see if number of column matches
    if (obj.columnTypes.length !== columnNames.length) {
      console.log(`Number of columns doesn't match`);
      console.log('columnTypes input length: ', obj.columnTypes.length);
      console.log('CSV column length: ', columnNames.length);
      return;
    }

    const columnInfo = [];
    for (let i = 0; i < columnNames.length; i++) {
      columnInfo.push({ name: columnNames[i], type: obj.columnTypes[i] });
    }
    console.log('TCL: columnInfo', columnInfo);

    const initializeObj = {};

    // console.log('TCL: Sequelize.INTEGER', Sequelize.INTEGER);
    columnInfo.forEach(col => {
      initializeObj[col.name] = {
        type: Sequelize[col.type]
      };
    });
    //if id column exists -> make it the primary key
    if (initializeObj.id) {
      initializeObj.id.primaryKey = true;
    }
    console.log('TCL: initializeObj', initializeObj);

    const DBseed = db.define(obj.tableName, initializeObj);

    // force: true will drop the table if it already exists
    await DBseed.sync({ force: true });

    await DBseed.bulkCreate(jsonObjArray);

    //closing connection
    db.close();
    console.log('db connection closed');
    return DBseed;
  } catch (error) {
    console.log(error);
  }
};

seed(testObj);

// const execSync = require('child_process').execSync;
// const output = execSync('ls', { encoding: 'utf-8' }); // the default is 'buffer'
// console.log('Output was:\n', output);
