const csv = require('csvtojson');
const Sequelize = require('sequelize');
const pkg = require('./package.json');

const testObj = { csvFilePath: './testproducts.csv', databaseName: 'testcsv' };

const runSeed = obj => {
  console.log('here it is', obj);
  csv()
    .fromFile(obj.csvFilePath)
    .then(jsonObj => {
      console.log(jsonObj);
      //find column numbers by looking at first object
      const length = Object.keys(jsonObj[0]).length;
      console.log('TCL: length', length);
      /**
       * [
       * 	{a:"1", b:"2", c:"3"},
       * 	{a:"4", b:"5". c:"6"}
       * ]
       */
    });
  // const db = new Sequelize(
  //   process.env.DATABASE_URL || `postgres://localhost:5432/${obj.databaseName}`,
  //   {
  //     logging: false
  //   }
  // );
  // return db;
};
runSeed(testObj);

// const execSync = require('child_process').execSync;
// const output = execSync('ls', { encoding: 'utf-8' }); // the default is 'buffer'
// console.log('Output was:\n', output);
