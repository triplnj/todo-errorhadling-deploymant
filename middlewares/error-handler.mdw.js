
export const noRouteHandler = (req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
}


export const noContent = ( req, res, next) => {
    const error = new Error('No response body')
    error.status = 400
    next(error)
}


export const mainErrorHandler = (err, req, res, next) => {
    if(err)
    res.status(err.status || 500).json({error: err.message})
}