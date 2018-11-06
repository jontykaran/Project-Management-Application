import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

    const a1 = await dynamoDbLib.call("get",{
        TableName: 'ProjectDetails',
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            ProjectID: event.pathParameters.ProjectID,
            ProjectName: event.pathParameters.ProjectName,
        },});
   // const dataa = JSON.parse(a1);

    
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'ProjectDetails',
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
        ProjectID: event.pathParameters.ProjectID,
        ProjectName: event.pathParameters.ProjectName,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET ProjectAdmin = :ProjectAdmin, ProjectManager = :ProjectManager, ProjectDevelopers = :ProjectDevelopers, ProjectStatus = :ProjectStatus",
    ExpressionAttributeValues: {
        //":ProjectName": data.ProjectName||null,
        ":ProjectAdmin": data.ProjectAdmin||a1.Item.ProjectAdmin,
        ":ProjectManager": data.ProjectManager||a1.Item.ProjectManager,
        ":ProjectDevelopers": data.ProjectDevelopers||a1.Item.ProjectDevelopers,
        ":ProjectStatus": data.ProjectStatus||a1.Item.ProjectStatus
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
      const a = await dynamoDbLib.call("get",{
        TableName: 'ProjectDetails',
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            ProjectID: event.pathParameters.ProjectID,
            ProjectName: event.pathParameters.ProjectName,
        },});
    const result = await dynamoDbLib.call("update", params);
    return success(a.Item);//{ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}