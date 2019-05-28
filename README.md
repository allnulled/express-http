# express-http

Adds methods to Express responses for dispatching HTTP status.

## Installation

`$ npm i -s express-http

## Why?

To standarize basic HTTP response dispatching across files and applications.

The following HTTP statuses are already supported:

   - 100: Continue
   - 101: Switching protocols
   - 200: OK
   - 201: Created
   - 202: Accepted
   - 203: Non-authoritative information
   - 204: No content
   - 205: Reset content
   - 206: Partial content
   - 300: Multiple choices
   - 301: Moved permanently
   - 302: Moved temporarily
   - 303: See other
   - 304: Not modified
   - 305: Use proxy
   - 306: Unused
   - 307: Temporary redirect
   - 400: Bad request
   - 401: Unauthorized
   - 402: Payment required
   - 403: Forbidden
   - 404: Not found
   - 405: Method not allowed
   - 406: Not acceptable
   - 407: Proxy authentication required
   - 408: Request timeout
   - 409: Conflict
   - 410: Gone
   - 411: Length required
   - 412: Precondition failed
   - 413: Request entity too large
   - 414: Request-URI yoo long
   - 415: Unsupported media type
   - 416: Requested range not satisfiable
   - 417: Expectation failed
   - 426: Upgrade required
   - 428: Precondition required
   - 429: Too many requests
   - 431: Request header fields too large
   - 500: Internal server error
   - 501: Not implemented
   - 502: Bad gateway
   - 503: Service unavailable
   - 504: Gateway timeout
   - 505: HTTP version not supported
   - 511: Network authentication required


## Usage

```js
const expressHttp = require("express-http");

/////////////////////////////////////////////
// In 1 step:
const express = expressHttp(require("express"));
// Alternatively, in 2 steps:
const express = require("express");
expressHttp(express);
/////////////////////////////////////////////

const app = express();

app.get("/success", (rq, rs) => rs.httpSuccess({ message: "This is a success" }, 200));
/* 

--- Returns: ---

{ 
	success: true, 
	code: 200,
	status: "OK",
	message: "This is a success"
}

*/
app.get("/error/404", (rq, rs) => rs.httpError({ message: "This is an error" }, 404));
/* 

--- Returns: ---

{ 
	error: true, 
	code: 404,
	status: "Not found",
	message: "This is an error"
}

*/
app.get("/error/custom", (rq, rs) => rs.httpError({ message: "This is an error" }, 901));
/* 

--- Returns: ---

{ 
	error: true, 
	code: 901,
	status: "Custom error",
	message: "This is an error"
}

*/
const server = app.listen(8080, () => console.log("Server listening."));
```

By default, if you use `httpSuccess({...})` without code, it will respond a `200: OK`.

By default, if you use `httpError({...})` without code, it will respond a `400: Bad request`.

## Tests

`$ npm run test`

## Versioning

This project adheres to the [Semmantic Versioning 2.0.0](https://semver.org/).

## Issues

You can send your issues [here](https://github.com/allnulled/express-http/issues/new).

## Contributions

As I do not have a job, I do not practice this part of "collective" coding, but I guess you can create your own branches.

## License

This project is under [WTFPL](https://es.wikipedia.org/wiki/WTFPL).

