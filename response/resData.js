const resData = (
    status,
    success,
    message,
    data,
    token,
    debug
  ) => {
    return { status: status, success: success, message: message, data: data, token: token, debug: debug }
  }
  
  

  
  module.exports = {
    resData: resData

  }