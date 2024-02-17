
module.exports = (err, req, res, next) => {
    // Default error response
    const errorResponse = {
      error: {
        message: err.message || 'Internal Server Error',
        status: err.status || 500,
      },
    };
  
    // Log the error (customize this based on your logging setup)
    console.error(err);
  
    // Send the error response to the client
    res.status(errorResponse.error.status).json(errorResponse);
  };

