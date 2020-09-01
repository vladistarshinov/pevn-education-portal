import pool from '../db/keys';

const auth = {};

auth.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (role == 'student') {
        try {
            await pool.query(
                "INSERT INTO students (s_name, s_email, s_password) VALUES ($1, $2, $3)", 
                [name, email, password]
            );
            res.status(200).json({
                msg: 'Вы успешно зарегистрированы в системе',
                student: { name, email, password }
            });
            return;
        } catch (err) {
            if (err.constraint == 'students_s_email_key') {
                res.status(500).json({ 
                    msg: 'Студент с таким email уже зарегистрирован в системе',
                    err
                });
                return;
            } else {
                res.status(500).json({ 
                    msg: 'Ошибка, попробуйте зарегистрироваться через несколько секунд',
                    err
                });
                return;
            }
        }
    } else {
        try {
            await pool.query(
                "INSERT INTO teachers (t_name, t_email, t_password) VALUES ($1, $2, $3)", 
                [name, email, password]
            );
            res.status(200).json({
                msg: 'Вы успешно зарегистрированы в системе',
                teacher: { name, email, password }
            });
            return;
        } catch (err) {
            if (err.constraint == 'teachers_t_email_key') {
                res.status(500).json({ 
                    msg: 'Преподаватель с таким email уже зарегистрирован в системе',
                    err
                });
                return;
            } else {
                res.status(500).json({ 
                    msg: 'Ошибка, попробуйте зарегистрироваться через несколько секунд',
                    err
                });
                return;
            }
        }
    }
    res.send('Congratulation! You have got an account!');
};

auth.login = async (req, res) => {
    const { email, password, role } = req.body;
    if (role == 'student') {
        try {
            const student = await (await pool.query(`
                SELECT * FROM students 
                WHERE s_email = $1 AND s_password = $2 
            `, [email, password])).rows;
            if (student.length > 0) {
                res.status(200).json({
                    id: student[0].s_id,
                    name: student[0].s_name,
                    password: student[0].s_password,
                    role: 'student'
                });
                return;
            } else {
                res.status(200).json({
                    msg: 'Студент не найден в системе. Пожалуйста, зарегистрируйтесь',
                    notFound: true
                });
            }
        } catch (err) {
            res.status(500).json({
                msg: 'Ошибка. Попробуйте авторизироваться через некоторое время',
                err
            });
            return;
        }
    } else {
        try {
            const teacher = await (await pool.query(`
                SELECT * FROM teachers 
                WHERE t_email = $1 AND t_password = $2 
            `, [email, password])).rows;
            if (teacher.length > 0) {
                res.status(200).json({
                    id: teacher[0].t_id,
                    name: teacher[0].t_name,
                    password: teacher[0].t_password,
                    role: 'teacher'
                });
                return;
            } else {
                res.status(200).json({
                    msg: 'Преподаватель не найден в системе. Пожалуйста, зарегистрируйтесь',
                    notFound: true
                });
            }
        } catch (err) {
            res.status(500).json({
                msg: 'Ошибка. Попробуйте авторизироваться через некоторое время',
                err
            });
            return;
        }
    }
};

module.exports = auth;