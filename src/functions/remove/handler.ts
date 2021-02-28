import 'source-map-support/register'
const { Chime }: any = require("aws-sdk")

const chime: any = new Chime({
  region: 'us-east-1',
  endpoint: 'service.chime.aws.amazon.com',
  access_key_id: process.env.ACCESS_KEY_ID,
  secret_access_key: process.env.SECRET_ACCESS_KEY
})

const json: any = (statusCode: any, contentType: any, body: any) => {
  return {
      statusCode,
      headers: {
        "content-type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true"
      },
      body: JSON.stringify(body)
  }
}

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'

const remove: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: any) => {
  const records: any = event.Records

  records.forEach((record: any) => {
    if (record.eventName === 'REMOVE') {
      chime.deleteMeeting({MeetingId: record.dynamodb.OldImage.meetingId.S,}, function(err: any, data: any) {
        if (err) console.log(err, err.stack)
        else console.log(data)
      })
    }
  })
  
  return json(200, "application/json", {
    records
  })
}

export const main = middyfy(remove);
