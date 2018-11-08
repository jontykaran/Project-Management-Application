import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

    const a1 = await dynamoDbLib.call("get",{
        TableName: 'ProjectDetails',
        Key: {
            ProjectID: event.ProjectID,
            ProjectName: event.ProjectName,
        },});
    
  const data = event.updatevalue;
  const params = {
    TableName: 'ProjectDetails',
    Key: {
        ProjectID: event.ProjectID,
        ProjectName: event.ProjectName,
    },
    UpdateExpression: "SET ProjectAdmin = :ProjectAdmin, ProjectManager = :ProjectManager, ProjectDevelopers = :ProjectDevelopers, ProjectStatus = :ProjectStatus",
    ExpressionAttributeValues: {
        //":ProjectName": data.ProjectName||null,
        ":ProjectAdmin": data.ProjectAdmin||a1.Item.ProjectAdmin,
        ":ProjectManager": data.ProjectManager||a1.Item.ProjectManager,
        ":ProjectDevelopers": data.ProjectDevelopers||a1.Item.ProjectDevelopers,
        ":ProjectStatus": data.ProjectStatus||a1.Item.ProjectStatus
    },
    ReturnValues: "ALL_NEW"
  };

  try {
      const a = await dynamoDbLib.call("get",{
        TableName: 'ProjectDetails',
        Key: {
            ProjectID: event.ProjectID,
            ProjectName: event.ProjectName,
        },});
    const result = await dynamoDbLib.call("update", params);
    return success(a.Item);} 
    catch (e) {
    return failure({ status: false });
  }
}