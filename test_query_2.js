const neo4j = require('neo4j-driver')
const uri = 'bolt://3.132.43.101:7687';
//const uri = 'bolt://graph.culture.tech:7687';
const driver = neo4j.driver(uri, neo4j.auth.basic('user','pwd'))
const session = driver.session()
const personName = 'Gerhard Richter'

console.log("Starting");

async function test_bolt() {

  try {
    const result = await session.run(
      'MATCH (n:Name{uid: $name})-[works_documented_in]-(a) RETURN a',
      { name: personName }
    )

    const singleRecord = result.records[1]
    console.log(singleRecord)
    const node = singleRecord.get(0)
    console.log(node.properties)

    var i = 0;
    for (i=0; i < result.records.length; i++) {
      const singleRecord = result.records[i]
      const node = singleRecord.get(0)
      console.log(node.properties)
    }
  } finally {
    await session.close()
  }

  // on application exit:
  await driver.close()

}


//console.log("Preparing to run test_bolt()");
//test_bolt();

module.exports = { test_bolt };
