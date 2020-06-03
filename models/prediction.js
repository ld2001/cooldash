var predictions = {
    AttributeDefinitions: [
      {
        AttributeName: 'pred_id',
        AttributeType: 'S'
      }
      ],
    KeySchema: [
      {
        AttributeName: 'pred_id',
        KeyType: 'HASH'
      }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
      TableName: 'transactions',
      StreamSpecification: {
        StreamEnabled: false
      }
    };
  
  module.exports = predictions; 