
class UnauthorizedAccess extends Error{
    constructor(message){
        super(message);
        this.name = 'UnauthorizedError';
        this.status = 401;
    }
}

class NoDataError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NoDataError';
      this.status = 404;
    }
}

class UnExpectedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnExpectedError';
        this.status = 400;
      }
}

module.exports = {UnauthorizedAccess,NoDataError,UnExpectedError}