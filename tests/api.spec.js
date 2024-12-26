const { test, expect, request } = require('@playwright/test');

// dans la barre d'URL

test('GET findByStatus on petstore API', async ({ }) => {
  const apiContext = await request.newContext();

  const response = await apiContext.get('/v2/pet/findByStatus', {
    params: {
      status: 'pending'
    },
  });

  expect(response.status()).toBe(200);

  const responseData = await response.json();
  console.log(responseData);
});

test('GET findByStatus on petstore API with fixture', async ({request}) => {

    const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus', {
      params: {
        status: 'pending'
      },
    });
  
    expect(response.status()).toBe(200);
  
    const responseData = await response.json();
    console.log(responseData);
  });

  test('add a pet', async ({request}) => {

    const response = await request.post('https://petstore.swagger.io/v2/pet', {
      data: {
        "id": 0,
        "category": {
          "id": 0,
          "name": "string"
        },
        "name": "loup gris et rouge",
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      },
    });
  
    expect(response.status()).toBe(200);
  
    const responseData = await response.json();
    console.log(responseData);
  });

  test('update new pets status', async ({request}) => {

    const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus', {
      params: {
        status: 'available'
      },
    });
  
    const responseData = await response.json();
    let [myPet] = responseData.filter((pet) => {
      return pet.id === 9223372036854734000 && pet.name === "loup gris"
    })
    let o
  
  });

  test('update request', async () => {

    const apiContext = await request.newContext();

    const response = await apiContext.put('v2/pet', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        id: 9223372036854734000,
        category: { id: 0, name: 'string' },
        name: 'loup gris et rouge',
        photoUrls: [ 'string' ],
        tags: [ { id: 0, name: 'string' } ],
        status: 'available'
      },
    });
  
    const responseData = await response.json();
    console.log(responseData);
  });

  test('delete request', async () => {

    const apiContext = await request.newContext();

    let id = 9223372036854734000;
    const response = await apiContext.delete(`v2/pet/${id.toString()}`,{
      headers: {
        'accept': 'application/json'
      }
    });
  
    const responseData = await response.json();
    console.log(responseData);
  });
