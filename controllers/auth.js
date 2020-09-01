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

module.exports = auth;