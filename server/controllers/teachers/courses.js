import pool from '../../db/keys';

const courses = {};

courses.getCourses = async (req, res) => {
    const {id} = req.body;
    try {
        const courses = await (await pool.query(`
            SELECT * FROM courses 
            WHERE ct_id = $1
        `, [id])).rows;
        res.status(200).json(courses);
        return;
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при загрузке курсов. Перезагрузите страницу',
            err
        });
        return;
    }
};

courses.createCourse = async (req, res) => {
    const {id, c_name, c_description} = req.body;
    try {
        await pool.query(
            'INSERT INTO courses (ct_id, c_name, c_description) VALUES ($1, $2, $3)',
            [id, c_name, c_description]
        );
        const course = await (await pool.query(`
            SELECT * FROM courses
            ORDER BY c_id DESC LIMIT 1
        `)).rows[0];
        res.status(200).json({
            msg: 'Курс успешно добавлен',
            course
        });
        return;
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при создании курса. Попробуйте через несколько секунд',
            err
        });
        return;
    }
};

courses.readCourse = async (req, res) => {
    const id = req.params.c_id;
    try {
        const course = await (await pool.query(`
            SELECT * FROM courses 
            WHERE c_id = $1
        `, [id])).rows[0];
        res.status(200).json({
            course
        });
        return;
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при загрузке курса. Перезагрузите страницу',
            err
        });
        return;
    }
};

courses.updateCourse = async (req, res) => {
    const id = req.params.c_id;
    const {c_name, c_description} = req.body;
    try {
        await pool.query(`
            UPDATE courses SET c_name = $1, c_description = $2
            WHERE c_id = $3
        `, [c_name, c_description, id]);
        res.status(200).json({
            msg: 'Курс успешно редактирован',
            course: {c_name, c_description}
        });
        return;
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при редактировании курса. Попробуйте еще раз',
            err
        });
        return;
    }
};

courses.deleteCourse = async (req, res) => {
    const id = req.params.c_id;
    try {
        await pool.query(`
            DELETE FROM courses
            WHERE c_id = $1
        `, [id]);
        res.status(200).json({
            msg: 'Курс успешно удален'
        });
        return;
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при удалении курса. Попробуйте еще раз',
            err
        });
        return;
    }
};

module.exports = courses;