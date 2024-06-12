export class ErrorResponse extends Error {
    statusCode: number;
    constructor(message: any, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class MissingParameter extends ErrorResponse {
    constructor(message: string = "Missing parameter") {
        super(message, 400);
    }
}

export class InvalidInput extends ErrorResponse {
    constructor(message: string = "Invalid value") {
        super(message, 400);
    }
}

export class ErrorFromServer extends ErrorResponse {
    constructor(message: string = "Server crash") {
        super(message, 500);
    }
}

export type ErrorResponseType = typeof ErrorResponse;