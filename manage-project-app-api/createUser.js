import * as  dynamoDbLib from "./libs/dynamodb-lib";
const { success, failure } = require ("./libs/response-lib");

export async function main(event, context) {
  const data = JSON.parse(event.body);
  var params = {
    Item: {
      userEmail: data.userEmail,
      userName: data.userName,
      userNumber: data.userNumber,
      userRole: data.userRole
    },    
    TableName: 'UserDetails',
    ConditionExpression : "attribute_not_exists(userEmail)" 
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
        console.log(e);
    return failure({ status: false });
  }
}