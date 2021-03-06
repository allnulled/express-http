const HTTP_MESSAGE_CODES = {
	100: "Continue",
	101: "Switching protocols",
	200: "OK",
	201: "Created",
	202: "Accepted",
	203: "Non-authoritative information",
	204: "No content",
	205: "Reset content",
	206: "Partial content",
	300: "Multiple choices",
	301: "Moved permanently",
	302: "Moved temporarily",
	303: "See other",
	304: "Not modified",
	305: "Use proxy",
	306: "Unused",
	307: "Temporary redirect",
	400: "Bad request",
	401: "Unauthorized",
	402: "Payment required",
	403: "Forbidden",
	404: "Not found",
	405: "Method not allowed",
	406: "Not acceptable",
	407: "Proxy authentication required",
	408: "Request timeout",
	409: "Conflict",
	410: "Gone",
	411: "Length required",
	412: "Precondition failed",
	413: "Request entity too large",
	414: "Request-URI yoo long",
	415: "Unsupported media type",
	416: "Requested range not satisfiable",
	417: "Expectation failed",
	426: "Upgrade required",
	428: "Precondition required",
	429: "Too many requests",
	431: "Request header fields too large",
	500: "Internal server error",
	501: "Not implemented",
	502: "Bad gateway",
	503: "Service unavailable",
	504: "Gateway timeout",
	505: "HTTP version not supported",
	511: "Network authentication required"
};

module.exports = (express, codeExtensions = {}, methodSuccess = "httpSuccess", methodError = "httpError") => {
	const HTTP_MESSAGE_MAP = Object.assign({}, HTTP_MESSAGE_CODES, codeExtensions);
	express.response[methodError] = function(data = {}, statusCode = 400) {
		return this.status(statusCode).json({
			error: true,
			code: statusCode,
			status: HTTP_MESSAGE_MAP[statusCode],
			...data
		});
	};
	express.response[methodSuccess] = function(data = {}, statusCode = 200) {
		return this.status(statusCode).json({
			success: true,
			code: statusCode,
			status: HTTP_MESSAGE_MAP[statusCode],
			...data
		});
	};
	return express;
};