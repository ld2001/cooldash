
var transactions = {
  AttributeDefinitions: [
    {
      AttributeName: 'trans_id',
      AttributeType: 'S'
    }
      // {
      //   AttributeName: 'ticker',
      //   AttributeType: 'S'
      // },     
      // {
      //     AttributeName: 'date',
      //     AttributeType: 'S'
      // }, 
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
      AttributeName: 'trans_id',
      KeyType: 'HASH'
    }
      // {
      //   AttributeName: 'ticker',
      //   KeyType: 'HASH'
      // }, 
      // {
      //   AttributeName: 'date',
      //   KeyType: 'RANGE'
      // },
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