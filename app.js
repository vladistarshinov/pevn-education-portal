// babel
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fileUpload from 'express-fileupload';
import history from 'connect-history-api-fallback';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({useTempFiles: true}));
app.use(history());

// Routes
app.get('/', (req, res) => {
    res.send('Hello');
})

// Settings
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})