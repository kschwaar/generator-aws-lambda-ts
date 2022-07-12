import {
  APIGatewayEvent,
  APIGatewayEventRequestContext,
  APIGatewayProxyResult,
} from "aws-lambda";

exports.handler = async function (
  event: APIGatewayEvent,
  context: APIGatewayEventRequestContext
): Promise<APIGatewayProxyResult> {
  console.log(event);
  console.log(context);

  return {
    body: JSON.stringify({
      message: "Hello World",
    }),
    statusCode: 200,
  };
};
