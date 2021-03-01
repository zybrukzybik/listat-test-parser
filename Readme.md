#TEST TASK

Simple REST API service using Node.js.

Service accept a set of mathematical expressions and evaluate the results.

Service contain following endpoints:
```text
POST /data
GET /result
```
###POST /data endpoint:
Request: 
```text
a set of mathematical expressions in JSON format.
```
Example of HTTP request body:

```json
{"expressions":[
"(10 + 16) / 2" ,
"5*3*2",
"2+2 * 2",
"200 / (50*2)",
"(14-7) * (21/3)"
]}
```

Response:
```text
HTTP status 200 (if everything is ok)
HTTP status 400 (if input data is invalid)
```

###GET /result endpoint
Request: 
```text
(no data)
```

Response: 
```text
HTTP status 200 and a set of mathematical expressions results in JSON format. 
```

Example of HTTP response body:
```json
{"results":[13,30,6,2,49]}
```

If no results are available, then return empty result set:
```    
    {"results":[]}    
```

##Skills:
- Service parse each mathematical expression from ```POST /data``` request and evaluate the result.
- Each expression can contain any integer numbers between ```0 and 1000```
- Each expression can contain any of the following symbols:  
  ```js 
  ' ', '+', '-', '*', '/', '(', ')'
  ```
  
- Result of each mathematical expression saved to the file ```“results.txt”``` on a server side.
Example of results.txt file data:
    ```js
    13
    30
    6
    2
    49
    ```

- Service store only one file with last evaluated results. All previous results in a file be overwritten.
- Writing and reading from “results.txt” file is asynchronous.
- When GET /result is requested, service read the last evaluated set of results from “results.txt” file and send it back to user according to above protocol.
- Application work with any number of mathematical expressions that are given within POST /data request.

##FAQ:

- clone repository to local storage
- open terminal, change dir to project's folder and run:
```
npm ci
```
- to run tests:
```
npm test
```
- to start server:
```
npm start
```

By default, server start at: http://127.0.0.1:3000.
You can change it in <.env> file (rename <.env.example>)