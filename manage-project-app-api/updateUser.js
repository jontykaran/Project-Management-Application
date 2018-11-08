import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

    const a1 = await dynamoDbLib.call("get",{
        TableName: 'UserDetails',
        Key: {
            userEmail: event.userEmail,
        },});

  const data = event.updatevalue;
  const params = {
    TableName: 'UserDetails',
    Key: {
        userEmail: event.userEmail,
    },
    UpdateExpression: "SET userName = :userName, userNumber = :userNumber, userRole = :userRole",
    ExpressionAttributeValues: {
        ":userNumber": data.userNumber||a1.Item.userNumber,
        ":userRole": data.userRole||a1.Item.userRole,
        ":userName": data.userName||a1.Item.userName
    },ReturnValues: "ALL_NEW"
  };

  try {
      const a = await dynamoDbLib.call("get",{
        TableName: 'UserDetails',
        Key: {
            userEmail: event.userEmail,
        },});
    const result = await dynamoDbLib.call("update", params);
    return success(a.Item);
  } catch (e) {
    return failure({ status: false });
  }
}