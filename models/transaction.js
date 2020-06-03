
var transactions = {
  AttributeDefinitions: [
    {
      AttributeName: 'trans_id',
      AttributeType: 'S'
    }
    ],
  KeySchema: [
    {
      AttributeName: 'trans_id',
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

module.exports = transactions; 