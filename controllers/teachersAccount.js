import pool from '../db/keys';

const teachersAccount = {};

teachersAccount.createCourse = async (req, res) => {
    //res.send(req.body);
    const {id, c_name, c_description} = req.body;
    try {
        await pool.query(
            'INSERT INTO courses (ct_id, c_name, c_description) VALUES ($1, $2, $3)',
            [id, c_name, c_description]
        );
        res.status(200).json({
            msg: 'Курс успешно добавлен',
            course: {id, c_name, c_description}
        });
        return;
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при создании курса. Попробуйте через несколько секунд',
            err
        });
    }
};

teachersAccount.readCourse = async (req, res) => {
    const id = req.params.c_id;
    // res.send(id);
    try {
        const course = await (await pool.query(`
            SELECT * FROM courses 
            WHERE c_id = $1
        `, [id])).rows[0];
        res.status(200).json({
            course
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка загрузки курсов. Перезагрузите страницу',
            err
        });
    }
};

module.exports = teachersAccount;