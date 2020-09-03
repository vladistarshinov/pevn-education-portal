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
                name, 
                email, 
                password, 
                role
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
                name, 
                email, 
                password, 
                role
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
    res.send('Поздравляем с успешной регистрацией!');
};

auth.login = async (req, res) => {
    const { email, password } = req.body;
        try {
            const student = await (await pool.query(`
                SELECT * FROM students 
                WHERE s_email = $1 AND s_password = $2
            `, [email, password])).rows;
            const teacher = await (await pool.query(`
                SELECT * FROM teachers 
                WHERE t_email = $1 AND t_password = $2
            `, [email, password])).rows;
            const hasGotEmail = await (await pool.query(`
                SELECT * FROM students 
                WHERE s_email = $1
                UNION
                SELECT * FROM teachers 
                WHERE t_email = $1
            `, [email])).rows;
            if (student.length > 0) {
                res.status(200).json({
                    id: student[0].s_id,
                    name: student[0].s_name,
                    email: student[0].s_email,
                    password: student[0].s_password,
                    role: 'student'
                });
                return;
            } else if (teacher.length > 0) {
                res.status(200).json({
                    id: teacher[0].t_id,
                    name: teacher[0].t_name,
                    email: teacher[0].t_email,
                    password: teacher[0].t_password,
                    role: 'teacher'
                });
                return;
            } else if (hasGotEmail.length == 0) {
                res.status(200).json({
                    msg: 'Пользователь не найден в системе. Пожалуйста, зарегистрируйтесь',
                    notFound: true
                });
                return;
            } else {
                res.status(500).json({
                    msg: 'Неверный пароль'
                });
                return;
            } 
        } catch (err) {
            res.status(500).json({
                msg: 'Ошибка. Попробуйте авторизироваться через некоторое время',
                err
            });
            return;
        }
};

module.exports = auth;