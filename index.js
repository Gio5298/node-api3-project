// code away!
const server = require('./server')

const port = process.env.PORT || 7000

server.listen(port, () => {
    console.log(`\n ** Server running on http://localhost:7000 ** \n`)
});
