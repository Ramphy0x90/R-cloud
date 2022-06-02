const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
const port = process.env.PORT || 3435;
const frontUrl = path.join(__dirname, '../client/dist/client');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(express.static(frontUrl));
app.use('/', express.static(frontUrl));

app.listen(port, () => {
    console.log(`[*] Server running on port ${port}`);
})