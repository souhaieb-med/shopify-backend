export const createError = (status, message)=>{
    const err = new Error()
    err.status = status 
    err.message = message
    return err
}

//if we don't specify the error the error received will be the default one and we can specify it by createError(statusCode , "message")