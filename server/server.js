const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const database = require('./database')
const auth = require('./middleware/auth')

const app = express();
const port = process.env.PORT || 3435;
const frontUrl = path.join(__dirname, '../client/dist/client');

const userRoute = require('./routes/user.route');
const folderRoute = require('./routes/folder.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin: '*'}));

app.use(express.static(frontUrl));
app.use('/', express.static(frontUrl));

app.use('/api/user/', userRoute);
app.use('/api/folder/', auth, folderRoute);

app.listen(port, () => {
    console.log(`[*] Server running on port ${port}`);
});

database.init()