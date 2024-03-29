const uuid = require("uuid");
import * as dynamoDbLib from "./libs/dynamodb-lib";
const { success, failure } = require ("./libs/response-lib");


export async function main(event, context) {
  const data = JSON.parse(event.body);
  var params = {
    
    Item: {
      ProjectID: uuid.v1(),
      ProjectName: data.ProjectName,
      ProjectDescription: data.ProjectDescription,
      ProjectManager: data.ProjectManager,
      ProjectAdmin: data.ProjectAdmin,
      ProjectDevelopers: data.ProjectDevelopers,
      ProjectStatus: data.ProjectStatus,
    },
    
    TableName: 'ProjectDetails',
    
    ConditionExpression : "attribute_not_exists(ProjectName)" 
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
        console.log(e);
    return failure({ status: false });
  }
}