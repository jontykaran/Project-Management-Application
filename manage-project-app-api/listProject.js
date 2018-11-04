

import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: 'ProjectDetails',
    //Select: "SPECIFIC_ATTRIBUTES",

    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
    //KeyConditionExpression: null //"userId = :userId",
    //ExpressionAttributeValues: {
    //  ":userId": event.requestContext.identity.cognitoIdentityId
    //}
    //: {}

    ExpressionAttributeNames:{
        "#Attr": event.Attr
    },
    
    ExpressionAttributeValues: {
      ":value" : event.value1,
      //":ProjectStatus": event.pathParameters.ProjectStatus
        

    },
    //KeyConditionExpression:'ProjectStatus = :ProjectStatus',
     
    FilterExpression: '#Attr = :value'
    //'ProjectStatus = :ProjectStatus',
    //AttributesToGet: ['ProjectAdmin','ProjectName']
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}