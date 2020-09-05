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
app.use(fileUpload({useTempFiles: true}));

// Routes
app.use('/', require('./routes/auth.routes'));
app.use('/teacher', require('./routes/courses.routes'));
app.use('/teacher', require('./routes/tasks.routes'));
/* app.use('/teacher', require('./routes/deliveries.routes')); */

// Middlewares for Vue
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Settings
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})