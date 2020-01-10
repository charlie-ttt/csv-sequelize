const csv = require('csvtojson');
const Sequelize = require('sequelize');

module.exports = async function(obj) {
  try {
    const jsonObjArray = await csv().fromFile(obj.csvFilePath);

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

    //check to see if number of column matches
    if (obj.columnTypes.length !== columnNames.length) {
      console.log(`Number of columns doesn't match`);
      console.log('columnTypes input length: ', obj.columnTypes.length);
      console.log('CSV column length: ', columnNames.length);
      return;
    }

    /*
     * create an obj of data to initializ the database table
     */
    const columnInfo = [];
    for (let i = 0; i < columnNames.length; i++) {
      columnInfo.push({ name: columnNames[i], type: obj.columnTypes[i] });
    }

    const initializeObj = {};

    columnInfo.forEach(col => {
      initializeObj[col.name] = {
        type: Sequelize[col.type]
      };
    });

    //if id column exists -> make it the primary key
    if (initializeObj.id) {
      initializeObj.id.primaryKey = true;
    }
    // console.log('TCL: initializeObj', initializeObj);

    const dbTable = db.define(obj.tableName, initializeObj);

    // force: true will drop the table if it already exists
    await dbTable.sync({ force: true });

    //create data on the database here!
    await dbTable.bulkCreate(jsonObjArray);

    //returning db and the created table
    return { dbTable: dbTable, db: db };
  } catch (error) {
    console.log(error);
  }
};
