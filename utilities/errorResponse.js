
const errorResponse = (err) => {
    return (
        {
            status: false,
            message: err?.msg,
        }
    )
}

module.exports = {errorResponse}