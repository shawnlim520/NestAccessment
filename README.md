
## Description

Nest Assessment (API Service)

## Installation

To set up the project locally, please run below command to install all the dependancies.
```bash
$ npm install
```
## Set up database

Make sure docker is install in your pc, and port 5434 and 5435 are not being used. </br>
Port 5434 is used for development</br>
Port 5455 is used for jest testing</br>

Run below command to set up database, in this accessment, I'm using Postgres database.
```bash
# Development
$ npm run db:dev:restart

# Jest Test
$ npm run db:test:restart
```
To view database using Prisma, run following command
```bash
# Development
$ npx prisma studio

# Jest Test
$ npx dotenv -e .env.test -- prisma studio
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
After the app is running, kindy use Postman or any other API testing software to begin. </br>
 
API Endpoints </br>

1. Create New Employee </br>
Endpoint: http://localhost:3000/employees </br>
Method: POST </br>
Body: </br>
username (string) </br>
fullname (string) </br>
salary (float), maximum 2 decimal places </br>

Sample create employee request body in JSON format: </br>

```bash
{
  "id": "1",
  "username": "hpotter",
  "fullname": "Harry Potter"
  "salary": 1234.56
}
```
Sample response: </br>
```bash
{
    "id": 1,
    "createdAt": "2022-10-16T08:34:57.154Z",
    "updatedAt": "2022-10-16T08:34:57.154Z",
    "username": "hpotter",
    "fullname": "Harry Potter",
    "salary": 1234.56
}
```

2. Get All Employees </br>
Endpoint: http://localhost:3000/employees </br>
Method: GET </br>

Sample response </br>
```bash
[
    {
        "id": 1,
        "createdAt": "2022-10-16T08:34:57.154Z",
        "updatedAt": "2022-10-16T08:34:57.154Z",
        "username": "hpotter",
        "fullname": "Harry Potter",
        "salary": 1234.56
    }
]
```
3. Get Employee By Id </br>
Endpoint: http://localhost:3000/employees/{id} </br>
Method: GET </br>

Sample response </br>
```bash
{
    "id": 1,
    "createdAt": "2022-10-16T08:34:57.154Z",
    "updatedAt": "2022-10-16T08:34:57.154Z",
    "username": "hpotter",
    "fullname": "Harry Potter",
    "salary": 1234.56
}
```

4. Edit Employee By Id </br>
Endpoint: http://localhost:3000/employees/{id} </br>
Method: PATCH </br>
Body: </br>
username (string) </br>
fullname (string) </br>
salary (float), maximum 2 decimal places </br>

Sample edit employee request body in JSON format: </br>

```bash
{
  "fullname": "Harry Potter 2"
  "salary": 4321.45
}
```
Sample response </br>
```bash
{
    "id": 1,
    "createdAt": "2022-10-16T08:34:57.154Z",
    "updatedAt": "2022-10-16T08:42:17.419Z",
    "username": "hpotter",
    "fullname": "Harry Potter 2",
    "salary": 4321.45
}
```

5. Delete Employee By Id </br>
Endpoint: http://localhost:3000/employees/{id} </br>
Method: DELETE </br>

Sample response </br>
```bash
{
    "id": 1,
    "createdAt": "2022-10-16T08:34:57.154Z",
    "updatedAt": "2022-10-16T08:42:17.419Z",
    "username": "hpotter",
    "fullname": "Harry Potter 2",
    "salary": 4321.45
}
```

## Run Jest Test
 Make sure to terminate the running app before run Jest test </br>
 
```bash
# e2e tests
$ npm run test:e2e
```
Sample test output: </br>
```bash
  App e2e                                                                                                                                                     
    Employee                                                                                                                                                  
      Get Employees                                                                                                                                           
        √ should get employees (59 ms)                                                                                                                        
      Add Employees                                                                                                                                           
        √ Add new employee (49 ms)                                                                                                                            
        √ if username taken (41 ms)                                                                                                                           
        √ if empty username (21 ms)                                                                                                                           
        √ if empty fullname (47 ms)                                                                                                                           
        √ if empty salary (21 ms)                                                                                                                             
        √ if salary not number (17 ms)                                                                                                                        
      Edit Employees                                                                                                                                          
        √ update employee fullname (28 ms)                                                                                                                    
        √ update invalid employee (16 ms)                                                                                                                     
        √ update salary not number (18 ms)                                                                                                                    
      Delete Employees                                                                                                                                        
        √ delete employee by id (23 ms)                                                                                                                       
        √ delete employee by invalid id (16 ms)                                                                                                               
                                                                                                                                                              
Test Suites: 1 passed, 1 total                                                                                                                                
Tests:       12 passed, 12 total                                                                                                                              
Snapshots:   0 total
Time:        3.012 s
Ran all test suites.
```
## Support

Email: limlipxuan1995@gmail.com </br>
Contact: 0168578939

## Author

Lim Lip Xuan (Shawn)
