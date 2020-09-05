import pool from '../../db/keys';

const studTasks = {};

studTasks.getTasks = async (req, res) => {
    const c_id = req.params.c_id
    try {
        const course = await (await pool.query(`
            SELECT * FROM teacherscourses
            WHERE c_id = $1
        `, [c_id])).rows[0];
        const tasks = await (await pool.query(`
            SELECT * FROM tasks
            WHERE cc_id = $1
        `, [c_id])).rows;
        res.status(200).json({
            course,
            tasks
        });
        return;
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при загрузке задач. Перезагрузите страницу',
            err
        });
        return;
    }
};

module.exports = studTasks;