const app = require("./src/app.js")
const PORT = Number(process?.env?.APP_PORT?.trim() || 3000); 

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log(`Server listening on http://localhost:${PORT}`);
});