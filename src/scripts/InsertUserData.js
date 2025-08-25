import AWS from "aws-sdk";
import fs from "fs";

AWS.config.update({
  region: "ap-south-1",
});

console.log("Writing entries to UserData table.");

var dynamodb = new AWS.DynamoDB.DocumentClient();
var userData = JSON.parse(fs.readFileSync("../mock-data/users.json", "utf8"));

userData.forEach(function (user) {
  var params = {
    TableName: "UserData",
    Item: {
      NIC: user.NIC,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Gender: user.Gender,
      Address: user.Address,
      MobileNumber: user.MobileNumber,
      Email: user.Email,
    },
  };

  dynamodb.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to load data into table for user",
        user.NIC,
        ". Error: ",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Added", user.NIC, "to table.");
    }
  });
});
