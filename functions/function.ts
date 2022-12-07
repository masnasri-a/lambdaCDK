import { Handler } from "aws-lambda";

export const handler: Handler = async (event, context) => {
    const name = event.queryStringParameters.name;

    if (name !== undefined) {
      const message = `Hello kak ${name}`;
      return {
        statusCode: 200,
        body: JSON.stringify(message),
      };
    } else {
      const message = "Nobody was greeted with that name";
      return {
        statusCode: 200,
        body: JSON.stringify(message),
      };
    }
};
