import { app } from "./app";

const port = 3333
const host = '0.0.0.0'

app.listen({
  host,
  port,
}).then(() => {
  console.log(`🚀️ HTTP server running at: http://localhost:${port}`)
})
