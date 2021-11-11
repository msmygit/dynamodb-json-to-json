// Leverages the AWS SDK for JavaScript v3 - https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_util_dynamodb.html#unmarshall-1
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const gfs = require("graceful-fs");
const readline = require('readline');


const args = process.argv;   

if (args.length < 3){
  console.log("Provide a file path")
  process.exit(0)
}
console.log(args[2])

filePath = args[2]

/*
fs.readFile(filePath , 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  //console.log(data)
  jsonData = JSON.parse(data)
  parsed  = AWS.DynamoDB.Converter.unmarshall(jsonData)
  console.log(parsed)

})
*/

async function processLineByLine() {

  const fileStream = gfs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    jsonData = JSON.parse(line)
    parsed  = unmarshall(jsonData)
    console.log(JSON.stringify(parsed))
  }
}

processLineByLine();
