import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-south-1",
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: "UserData",
  KeySchema: [
    { AttributeName: "NIC", KeyType: "HASH" }, // Partition Key
  ],
  AttributeDefinitions: [{ AttributeName: "NIC", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, (err, data) => {
  if (err)
    console.error("Unable to create table:", JSON.stringify(err, null, 2));
  else console.log("Created table:", JSON.stringify(data, null, 2));
});
