import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from '@aws-cdk/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    new NodejsFunction(this, 'cdkLambda',{
      // code: lambda.Code.fromAsset('./src'),
      functionName: "cdkLambdaTest",
      runtime: lambda.Runtime.NODEJS_14_X,
      entry: path.join(__dirname, `/../functions/function.ts`),
      handler: "handler",
      timeout:cdk.Duration.seconds(300)
    })

  }
}
