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

app.use('/teacher', require('./routes/teachers/courses.routes'));
app.use('/teacher', require('./routes/teachers/tasks.routes'));
app.use('/teacher', require('./routes/teachers/deliveries.routes'));

app.use('/student', require('./routes/students/studCourses.routes'));

// Middlewares for Vue
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Settings
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})