
var transactions = {
    AttributeDefinitions: [
      {
          AttributeName: 'date',
          AttributeType: 'S'
      }, 
      {
        AttributeName: 'ticker',
        AttributeType: 'S'
      },
    //   {
    //     AttributeName: 'order',
    //     AttributeType: 'S'
    //   },
    //   {
    //       AttributeName: 'num_share',
    //       AttributeType: 'N'
    //   },
    //   {
    //       AttributeName: 'per_share_price',
    //       AttributeType: 'N'
    //   }
    ],
    KeySchema: [
      {
        AttributeName: 'date',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'ticker',
        KeyType: 'RANGE'
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