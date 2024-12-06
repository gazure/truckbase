export class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotAuthorizedError";
  }
}


export class InvalidInputError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidInputError";
  }
}

export function handleError(error, req, res, next) {
  let code;
  if (error instanceof InvalidInputError) {
    console.error(`Stock Error: ${error.message}`);
    code = 400;
  } else {
    console.error(`Unexpected error: ${error.message}`);
    code = 500;
  }

  res.send(code, { error: error.message });
}
