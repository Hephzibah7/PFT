// Create a custom error class
class CustomError extends Error {
    status: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.status = statusCode;
      this.name = 'CustomError';
    }
  }
  
  export default CustomError;
  