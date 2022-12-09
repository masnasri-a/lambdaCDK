import { Handler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamo = new DynamoDB.DocumentClient();
const TABLE_NAME: string = "TestingTable";

export const handler: Handler = async (event, context) => {
  console.log(event);
  const httpMethod = event.httpMethod;
  if (httpMethod == "GET") {
    const username = event.queryStringParameters.username;
    if (username !== undefined) {
      const item = await getItem(username);
      return {
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } else {
      const message = "Nobody was greeted with that name";
      return {
        statusCode: 200,
        body: JSON.stringify(message),
      };
    }
  } else if (httpMethod == "POST") {
    return await save(event);
  } else if (httpMethod == "DELETE") {
    const username = event.queryStringParameters.username;
    if (username !== undefined) {
      const item = await deletes(username);
      return {
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } else {
      const message = "Nobody was greeted with that name";
      return {
        statusCode: 200,
        body: JSON.stringify(message),
      };
    }
  }
};


async function getItem(name : string ) {

  const params : DynamoDB.DocumentClient.GetItemInput = {
      Key: {
      username: name,
    },
    TableName: TABLE_NAME,
  };
  
  return dynamo
    .get(params)
    .promise()
    .then((result) => {
      console.log(result);
      return result.Item;
    });
}

async function save(event: any) {

  const paramBody = event.body;
  let obj = JSON.parse(paramBody);
  const item = {
    username: obj.name,
    email: obj.email,
  };

  console.log(item);
  const savedItem = await saveItem(item);

  return {
    statusCode: 200,
    body: JSON.stringify(savedItem),
  };
}

async function saveItem(item: any) {
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: TABLE_NAME,
    Item: item,
  };

  return dynamo
    .put(params)
    .promise()
    .then(() => {
      return item;
    });
}

async function deletes(datas: string) {


  console.log(datas);
  let param = {
    username:datas
  } 
  const deletedItem = await deleteItem(param);

  return {
    statusCode: 200,
    body: JSON.stringify(deletedItem),
  };
}


async function deleteItem(item: any) {
  const params: DynamoDB.DocumentClient.DeleteItemInput = {
    TableName: TABLE_NAME,
    Key: item,
  };

  return dynamo
    .delete(params)
    .promise()
    .then(() => {
      return item;
    });
}
