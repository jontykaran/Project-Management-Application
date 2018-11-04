const uuid = require("uuid");

import * as  dynamoDbLib from "./libs/dynamodb-lib";
const { success, failure } = require ("./libs/response-lib");


export async function main(event, context) {
  const data = JSON.parse(event.body);
  var params = {
    
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    //ConditionExpression: 'attribute_not_exists(ProjectName)',
    
//    AttributrValueList: [{ProjectName: data.ProjectName}],
    Item: {
      //ProjectID: uuid.v1(),
      //ProjectName: data.ProjectName,
      ProductName: data.ProductName,
      ProjectDescription: data.ProjectDescription,
      ProjectManager: data.ProjectManager,
      ProjectAdmin: data.ProjectAdmin,
      ProjectDevelopers: data.ProjectDevelopers,
      ProjectStatus: data.ProjectStatus
    },
    
    //TableName: 'ProjectDetails',
    TableName: 'Product',
    
    //ExpressionAttributeNames : {
     // '#ProjectName' : 'ProjectName' //'ProjectName',
     // '#email' : 'email',
  //},
  //ExpressionAttributeValues:{ ":onGoing":{"S":"On Going"}, ":completed":{"S":"Competed"}, ":notStart":{"S":"Not Started"} },
  //ConditionExpression : "attribute_not_exists(ProductName)" 
  //ConditionExpression : 'ProjectStatus IN {onGoing, completed,notStart}',//'attribute_not_exists(#ProjectName)',//OR attribute_not_exists(#email)',
  //Expected: {
  //  ProductName: { Exists: false }
  //}
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
        console.log(e);
    return failure({ status: false });
  }
}