import pool from '../../db/keys';

const studCourses = {};

studCourses.getCourses = async (req, res) => {
    try {
        // SELECT * FROM courses JOIN teachers ON ct_id = t_id 
        // выведет все данные о курсе и об учителе курса с паролем, что нам не нужно
        const courses = await (await pool.query(`
            SELECT * FROM courses 
            JOIN
            (SELECT t_id, t_name, t_email FROM teachers) AS t ON ct_id = t_id
        `)).rows;
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

module.exports = studCourses;