import app from "./app";
import "dotenv/config"

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`)
})