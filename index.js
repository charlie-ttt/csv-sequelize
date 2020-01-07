const csv = require('csvtojson');
const Sequelize = require('sequelize');

const testObj = {
  csvFilePath: './testproducts.csv',
  databaseName: 'testcsv',
  tableName: 'testTable',
  columnsInfo: [
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
    const jsonObj = await csv().fromFile(obj.csvFilePath);
    // console.log('TCL: jsonObj', jsonObj);

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
    const columnNames = Object.keys(jsonObj[0]);
    console.log('TCL: columnNames', columnNames);
    const initializeObj = {};

    // console.log('TCL: Sequelize.INTEGER', Sequelize.INTEGER);
    columnNames.forEach(name => {
      initializeObj[name] = {
        type: Sequelize.INTEGER
      };
    });
    initializeObj.id.primaryKey = true;
    // delete initializeObj.id;
    console.log('TCL: initializeObj', initializeObj);

    const DBseed = db.define(obj.tableName, initializeObj);

    // force: true will drop the table if it already exists
    await DBseed.sync({ force: true });
    // await DBseed.create({ name: 'hello' });

    //closing connection
    db.close();
    console.log('db connection closed');
    return db;
  } catch (error) {
    console.log(error);
  }
};

seed(testObj);

// const execSync = require('child_process').execSync;
// const output = execSync('ls', { encoding: 'utf-8' }); // the default is 'buffer'
// console.log('Output was:\n', output);
