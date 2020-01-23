'use strict';

module.exports.getUser = async event => {
  let searchTerm = event.queryStringParameters.searchTerm,
      user = users.find((u) => {
        return u.firstName.toLowerCase() === searchTerm.toLowerCase();
      })

  if (!user) {
    user = {
      currentplan: 'No User',
      planName: '"N/A"',
      license: '"N/A"',
      site: '"N/A"',
      card: '"N/A"',
      email: '"N/A"',
      firstName: '"N/A"',
      lastName: '',
      average: "N/A",
      price: "N/A",
      lowestPlan: "N/A",
      history: [],
      payments: []
    }
  }

  return {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        searchTerm,
        user
      },
    ),
  };
};


// Test Data
let payments = [
  {
    id: 1,
    info: 'Something',
    date: 'Mar 3',
    price: 19.99
  },
  {
    id: 2,
    info: 'Something',
    date: 'Sep 27',
    price: 27.99
  },
  {
    id: 3,
    info: 'else',
    date: 'Apr 13',
    price: 19.99
  },
  {
    id: 4,
    info: 'Something',
    date: 'Mar 3',
    price: 19.99
  },
  {
    id: 5,
    info: 'Something',
    date: 'Sep 27',
    price: 27.99
  },
  {
    id: 6,
    info: 'else',
    date: 'Apr 13',
    price: 19.99
  }
];

let users = [
  {
    currentplan: 'Sample Plan 1',
    planName: '17.00',
    license: 'BATMAN-420',
    site: '7',
    card: '2423',
    email: 'email@gmail.com',
    firstName: 'Malik',
    lastName: 'Harrison',
    average: 25,
    price: 14.99,
    lowestPlan: "CURRENTLY AT LOWEST PRICE",
    style: 'redbg',
    history: [],
    payments
  },
  {
    currentplan: 'Sample Plan 2',
    planName: '29.99',
    license: 'HDGLE-RE',
    site: '2',
    card: '2423',
    email: 'email@gmail.com',
    firstName: 'Sam',
    lastName: 'Dean',
    average: 12,
    price: 29.99,
    lowestPlan: 14.99,
    style: 'greenbg',
    history: [],
    payments
  },
  {
    currentplan: 'Sample Plan 3',
    planName: '14.00',
    license: 'NY-HDBEY',
    site: '7',
    card: '2423',
    email: 'email@gmail.com',
    firstName: 'Jess',
    lastName: 'Devole',
    average: 7,
    price: 10,
    lowestPlan: 12.99,
    style: 'greenbg',
    history: [],
    payments
  }
]
