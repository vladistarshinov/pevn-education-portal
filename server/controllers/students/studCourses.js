import pool from '../../db/keys';

const studCourses = {};

studCourses.getCourses = async (req, res) => {
    const id = req.body.id;
    try {
        const courses = await (await pool.query(`
            SELECT * FROM teacherscoursesinfo
            LEFT JOIN (
                SELECT * FROM studentscourses
                WHERE sc_id = $1
             ) AS S ON c_id = cc_id
            WHERE cc_id IS NULL
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

studCourses.getMyCourses = async (req, res) => {
    const id = req.body.id;
    try {
        const courses = await (await pool.query(`
            SELECT * 
            FROM teacherscoursesinfo
            JOIN (
                SELECT * 
                FROM studentscourses
                WHERE sc_id = $1
            ) AS S ON cc_id = c_id
        `, [id])).rows;
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при загрузке курсов. Перезагрузите страницу',
            err
        });
        return;
    }
}; 

studCourses.joinCourse = async (req, res) => {
    const sc_id = req.body.id;
    const c_id = req.params.c_id;
    try {
        const courses = await (await pool.query(`
            SELECT * 
            FROM teacherscoursesinfo
            JOIN (
                SELECT * 
                FROM studentscourses
                WHERE sc_id = $1
            ) AS S ON cc_id = c_id
        `, [sc_id])).rows;
        /* if (courses.some(element => element.sc_id == sc_id) && 
            courses.some(element => element.cc_id == c_id)) {
            res.status(500).json({
                msg: 'Вы уже добавили данный курс'
            });
            return;
        } else { */
            await pool.query(`
            INSERT INTO studentscourses 
            VALUES ($1, $2)
        `, [sc_id, c_id]);
            res.status(200).json({
                msg: 'Вы добавили курс',
                course: {c_id}
            });
            return;
        /* } */
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при вступлении в курс. Перезагрузите страницу',
            err
        });
        return;
    }
};

module.exports = studCourses;