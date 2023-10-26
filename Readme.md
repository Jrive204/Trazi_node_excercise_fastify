# Trazi_Node_Exercise

## Installing Dependencies

- execute the command:
  ```bash
  npm install
## Project Folder Structure

```bash
fastify
│
├── api
│   ├── api-routes.js
│   ├── routes
│   │   └── population
│   └── server.js
│
├── data
│   ├── dbConfig.js
│   └── migrations
│       └── 001-city_populations.js
│
├── index.js
├── migrate.js
├── node_modules
└── package.json
```
## Key Components:

1. **index.js**: This is the entry point of the application and is triggered when `npm start` is executed. It initializes the server using configurations defined in the `server.js` inside the `api` directory.

2. **api**: This directory hosts the core components of the API.

    - **api-routes.js**: It serves as a central place for routing, giving a bird's-eye view of all available routes. An example is shown below:

    ```javascript
    async function routes(fastify, options) {
      fastify.register(require('./routes/population/population-route'), { prefix: '/api/population' });
        }

    module.exports = routes;
    ```

    - **routes**: This is designed to be modular, allowing for easy addition of new route categories as the project grows. Currently, it houses the `population` directory, which deals with routes related to city populations.

3. **data**: This directory is dedicated to database operations.
    - **dbConfig.js**: It's responsible for establishing and configuring the database connection.
    - **migrations**: This houses scripts defining the structure of the database tables. For instance, `001-city_populations.js` creates the `city_populations` table.


The project layout is crafted for scalability, ensuring that as the project grows, managing routes and other components remains straightforward.
## Database Choice: SQLite3

1. **SQLite3**: For this exercise, SQLite3 was the chosen database due to its simplicity and ease of setup. It's an in-process library that implements a serverless, zero-configuration, transactional SQL database engine.

### Pros and Cons: SQLite3 vs PostgreSQL

**SQLite3**:
- **Pros**:
    - **Lightweight**: No server setup or configurations needed.
    - **Portable**: The entire database is stored in a single file, which can be easily shared or archived.
    - **Serverless**: Runs in the application's process, eliminating potential network overhead.
    - **Simple Setup**: Ideal for prototypes, small apps, or as an embedded database.

- **Cons**:
    - **Scalability**: Not ideal for large-scale applications or high concurrency.
    - **Features**: Lacks some of the advanced features provided by full-fledged databases like PostgreSQL.

**PostgreSQL**:
- **Pros**:
    - **Robust & Full-featured**: Supports advanced data types, indexing, full-text search, and more.
    - **Scalability**: Designed for scalability and high concurrency.
    - **Extensibility**: Supports custom functions, stored procedures, and has a large number of extensions available.

- **Cons**:
    - **Complex Setup**: Requires more setup and configuration compared to SQLite3.
    - **Overhead**: Might be overkill for simple applications or prototypes.

### Throughput & Enterprise-level Applications:

For high throughput and enterprise-level applications where scalability, concurrency, and a wide range of features are crucial, **PostgreSQL** would be the more appropriate choice. Its robustness and extensibility make it a preferred choice for large-scale, mission-critical applications.

## SQLite3 vs PostgreSQL Performance Benchmarking Fastify

To evaluate the performance differences between SQLite3 and PostgreSQL as backend databases for the API, ApacheBench was utilized for benchmarking. The primary focus was to observe how each database system impacted the API's ability to retrieve population data for specific cities. The findings are outlined below:

### Test Configuration:
- **Tool**: ApacheBench, Version 2.3
- **Server**: Localhost (127.0.0.1) on port 5555
- **Node**: 18.16.0
- **Database Versions**: SQLite3: 3.43.2, PostgreSQL: 12.4

### PostgreSQL Benchmarking Results:

### Concurrency Level: 500, Number of Requests: 10,000
(Test Command: `ab -c 500 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

### 1. Miami:
- **Time taken for tests**: 3.549 seconds
- **Requests per second**: 2817.69
- **Average Time per request**: 177.450 ms
- **Longest request**: 185 ms

### 2. Tampa:
- **Time taken for tests**: 3.540 seconds
- **Requests per second**: 2824.86
- **Average Time per request**: 177.000 ms
- **Longest request**: 182 ms

### 3. Orlando:
- **Time taken for tests**: 3.443 seconds
- **Requests per second**: 2904.44
- **Average Time per request**: 172.150 ms
- **Longest request**: 177 ms

### Concurrency Level: 100, Number of Requests: 10,000
(Test Command: `ab -c 100 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

### 1. Miami:
- **Time taken for tests**: 3.295 seconds
- **Requests per second**: 3034.90
- **Average Time per request**: 32.950 ms
- **Longest request**: 36 ms

### 2. Tampa:
- **Time taken for tests**: 3.361 seconds
- **Requests per second**: 2975.30
- **Average Time per request**: 33.610 ms
- **Longest request**: 39 ms

### 3. Orlando:
- **Time taken for tests**: 3.265 seconds
- **Requests per second**: 3062.79
- **Average Time per request**: 32.650 ms
- **Longest request**: 39 ms

### SQLite3 Benchmarking Results:

#### Concurrency Level: 500, Number of Requests: 10,000
(Test Command: `ab -c 500 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

#### 1. Miami:
- **Time taken for tests**: 4.184 seconds
- **Requests per second**: 2389.97
- **Average Time per request**: 209.208 ms
- **Longest request**: 237 ms
#### 3. Tampa:
- **Time taken for tests**: 4.427 seconds
- **Requests per second**: 2259.02
- **Average Time per request**: 221.335 ms
- **Longest request**: 317 ms
#### 2. Orlando:
- **Time taken for tests**: 4.166 seconds
- **Requests per second**: 2400.67
- **Average Time per request**: 208.275 ms
- **Longest request**: 221 ms

#### Concurrency Level: 100, Number of Requests: 10,000
(Test Command: `ab -c 100 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

#### 1. Miami:
- **Time taken for tests**: 3.579 seconds
- **Requests per second**: 2794.17
- **Average Time per request**: 35.789 ms
- **Longest request**: 43 ms

#### 2. Tampa:
- **Time taken for tests**: 3.662 seconds
- **Requests per second**: 2730.49
- **Average Time per request**: 36.623 ms
- **Longest request**: 50 ms

#### 3. Orlando:
- **Time taken for tests**: 3.738 seconds
- **Requests per second**: 2674.91
- **Average Time per request**: 37.384 ms
- **Longest request**: 56 ms

### Conclusion

Upon examining the benchmarking results for both PostgreSQL and SQLite3, several observations can be drawn:

1. **Requests Per Second**: PostgreSQL consistently outperforms SQLite3 in terms of requests per second (RPS). For example, with a concurrency level of 500 for the city Miami, PostgreSQL achieved an RPS of 2817.69, whereas SQLite3 reached 2389.97.

2. **Average Time Per Request**: The average time taken for each request is higher for SQLite3 compared to PostgreSQL. At a concurrency level of 500 for Miami, PostgreSQL had an average request time of 177.450 ms, while SQLite3 took 209.208 ms.

3. **Scalability with Concurrency**: As the concurrency level dropped from 500 to 100, the performance gap between PostgreSQL and SQLite3 narrowed. While PostgreSQL still had the edge in RPS, the difference in the average time per request became less pronounced.

4. **Longest Request Time**: In terms of the maximum time taken for a single request, SQLite3 exhibited higher latencies compared to PostgreSQL, especially noticeable at higher concurrency levels.

In summary, while both databases show commendable performance, PostgreSQL demonstrates superior throughput and responsiveness in this benchmarking scenario. For applications requiring high concurrent access and swift response times, PostgreSQL appears to be the more suitable choice. However, it's essential to consider the specific use-case and infrastructure when making a final decision.



##  Performance Benchmarking for PostgreSQL Fastify vs Express vs Vanilla Node.js

In my efforts to assess the performance of my API, I utilized ApacheBench for benchmarking. The focus was on using my API endpoint to fetch population data for specific cities in Florida. Here are my findings:

### Test Configuration:
- **Tool**: ApacheBench, Version 2.3
- **Server**: Localhost (127.0.0.1) on port 5555
- **Node**: 18.16.0
- **fastify**: 4.24.3
- **express**: 4.18.2

### Fastify API Benchmarking Results:

### Concurrency Level: 500, Number of Requests: 10,000
(Test Command: `ab -c 500 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

### 1. Miami:
- **Time taken for tests**: 3.549 seconds
- **Requests per second**: 2817.69
- **Average Time per request**: 177.450 ms
- **Longest request**: 185 ms

### 2. Tampa:
- **Time taken for tests**: 3.540 seconds
- **Requests per second**: 2824.86
- **Average Time per request**: 177.000 ms
- **Longest request**: 182 ms

### 3. Orlando:
- **Time taken for tests**: 3.443 seconds
- **Requests per second**: 2904.44
- **Average Time per request**: 172.150 ms
- **Longest request**: 177 ms

### Concurrency Level: 100, Number of Requests: 10,000
(Test Command: `ab -c 100 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

### 1. Miami:
- **Time taken for tests**: 3.295 seconds
- **Requests per second**: 3034.90
- **Average Time per request**: 32.950 ms
- **Longest request**: 36 ms

### 2. Tampa:
- **Time taken for tests**: 3.361 seconds
- **Requests per second**: 2975.30
- **Average Time per request**: 33.610 ms
- **Longest request**: 39 ms

### 3. Orlando:
- **Time taken for tests**: 3.265 seconds
- **Requests per second**: 3062.79
- **Average Time per request**: 32.650 ms
- **Longest request**: 39 ms

## Key Observations for Fastify:
- At a concurrency level of 500, the cities showed average request times of approximately 172-177 ms. The average times for a concurrency level of 100 were roughly 32-34 ms.
- Throughput (requests per second) was consistently high, with Orlando having the peak performance at 2904.44 requests per second at a concurrency of 500.
- All tests reported zero failed requests, emphasizing robustness under varying loads.

## Vanilla Node.js API Benchmarking Results:

### Concurrency Level: 500, Number of Requests: 10,000
(Test Command: `ab -c 500 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

### 1. Miami:
- **Time taken for tests**: 3.947 seconds
- **Requests per second**: 2533.85
- **Average Time per request**: 197.328 ms
- **Longest request**: 298 ms

### 2. Tampa:
- **Time taken for tests**: 3.957 seconds
- **Requests per second**: 2526.94
- **Average Time per request**: 197.868 ms
- **Longest request**: 288 ms

### 3. Orlando:
- **Time taken for tests**: 3.925 seconds
- **Requests per second**: 2547.58
- **Average Time per request**: 196.265 ms
- **Longest request**: 244 ms

### Concurrency Level: 100, Number of Requests: 10,000
(Test Command: `ab -c 100 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

### 1. Miami:
- **Time taken for tests**: 3.454 seconds
- **Requests per second**: 2895.48
- **Average Time per request**: 34.537 ms
- **Longest request**: 41 ms

### 2. Tampa:
- **Time taken for tests**: 3.380 seconds
- **Requests per second**: 2958.56
- **Average Time per request**: 33.800 ms
- **Longest request**: 39 ms

### 3. Orlando:
- **Time taken for tests**: 3.441 seconds
- **Requests per second**: 2905.90
- **Average Time per request**: 34.413 ms
- **Longest request**: 51 ms

## Key Observations for Vanilla Node.js:
- All cities tested consistently returned results with an average time of around 196-198 ms for the higher concurrency level of 500. The average time for a concurrency level of 100 was around 34-35 ms.
- The throughput (requests per second) for Vanilla Node.js at a concurrency level of 500 was slightly lower than that at a concurrency level of 100.
- All tests had zero failed requests, emphasizing the system's robustness under varying loads.

## Express Benchmarking Results:

### Concurrency Level: 500, Number of Requests: 10,000
(Test Command: `ab -c 500 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

### 1. Miami:
- **Time taken for tests**: 3.792 seconds
- **Requests per second**: 2637.35
- **Average Time per request**: 189.584 ms
- **Longest request**: 217 ms

### 2. Tampa:
- **Time taken for tests**: 3.821 seconds
- **Requests per second**: 2617.42
- **Average Time per request**: 191.028 ms
- **Longest request**: 214 ms

### 3. Orlando:
- **Time taken for tests**: 3.722 seconds
- **Requests per second**: 2686.61
- **Average Time per request**: 186.108 ms
- **Longest request**: 201 ms

### Concurrency Level: 100, Number of Requests: 10,000
(Test Command: `ab -c 100 -n 10000 http://127.0.0.1:5555/api/population/state/florida/city/{cityName}`)

### 1. Miami:
- **Time taken for tests**: 4.163 seconds
- **Requests per second**: 2402.23
- **Average Time per request**: 41.628 ms
- **Longest request**: 61 ms

### 2. Tampa:
- **Time taken for tests**: 4.143 seconds
- **Requests per second**: 2413.44
- **Average Time per request**: 41.435 ms
- **Longest request**: 64 ms

### 3. Orlando:
- **Time taken for tests**: 4.097 seconds
- **Requests per second**: 2440.76
- **Average Time per request**: 40.971 ms
- **Longest request**: 64 ms

## Key Observations for Express:
- At a concurrency level of 500, all cities tested showed an average response time between 186-191 ms. For a concurrency level of 100, this dropped to around 40-42 ms.
- Throughput remained consistently high, with Orlando showcasing the peak performance in both concurrency tests.
- No failed requests were reported across all tests, highlighting the robustness of the Express server under load.

## API Performance Benchmarking Conclusion

Given the performance metrics of the three platforms - Fastify, Vanilla Node.js, and Express:

### Vanilla Node.js:
- **Performance Metrics:**
    - Concurrency Level: 500
        - Average response times: **196-198 ms**.
    - Concurrency Level: 100
        - Average response times: **34-35 ms**.

### Fastify:
- **Performance Metrics:**
    - Concurrency Level: 500
        - Average response times: **172-177 ms**.
    - Concurrency Level: 100
        - Average response times: **32-34 ms**.

### Express:
- **Performance Metrics:**
    - Concurrency Level: 500
        - Average response times: **186-191 ms**.
    - Concurrency Level: 100
        - Average response times: **40-42 ms**.

All three platforms exhibited zero failed requests, showcasing their reliability under stress.

Fastify demonstrated the shortest response times across both tested concurrency levels when assessing the frameworks based on speed. However, it's essential to note that while speed is a critical metric, other factors like maintainability, scalability, and community support can be equally significant when choosing a platform for production.

In conclusion, while all three APIs demonstrated commendable performance, Fastify stands out regarding test response speed. Nonetheless, the best choice of framework often depends on a balance of performance and other project-specific criteria.


### Real-world Scenarios

- While Vanilla Node.js might be fast for very basic operations, as the complexity of the application grows (e.g., routing, error handling, middleware operations, etc.), maintaining and optimizing Vanilla Node.js can become more challenging. Frameworks provide structures and patterns that help manage this complexity, and their built-in optimizations can make them more competitive in more complex scenarios.

- While Vanilla Node.js might be faster in some scenarios, using a framework can significantly speed up development time, improve code organization, and enhance maintainability. The performance trade-off might be worth it in many real-world scenarios.

- The benchmark provided was for specific endpoints fetching population data. The performance might vary when dealing with different endpoints, operations, or adding more API features.
