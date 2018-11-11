import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'ProjectDetails',
    Key: {
        ProjectID:  event.pathParameters.id,
        //ProjectName: event.ProjectName,
    },
    UpdateExpression: "SET ProjectAdmin = :ProjectAdmin, ProjectManager = :ProjectManager, ProjectDevelopers = :ProjectDevelopers, ProjectStatus = :ProjectStatus",
    ExpressionAttributeValues: {
        ":ProjectName": data.ProjectName||null,
        ":ProjectAdmin": data.ProjectAdmin||null,
        ":ProjectManager": data.ProjectManager||null,
        ":ProjectDevelopers": data.ProjectDevelopers||null,
        ":ProjectStatus": data.ProjectStatus||null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
      
    const result = await dynamoDbLib.call("update", params);
    return success(a.Item);} 
    catch (e) {
    return failure({ status: false });
  }
}

/**  const a1 = await dynamoDbLib.call("get",{
        TableName: 'ProjectDetails',
        Key: {
            ProjectID:  event.pathParameters.id,
        },});
        const a = await dynamoDbLib.call("get",{
        TableName: 'ProjectDetails',
        Key: {
            ProjectID: event.pathParameters.id,
        },});
        */