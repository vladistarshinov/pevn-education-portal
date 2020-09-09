import pool from '../../db/keys';
import cloudinary from '../../lib/cloudinary';

const tasks = {};

tasks.createTask = async (req, res) => {
    const c_id = req.params.c_id;
    const {h_name, h_description} = req.body;
    const h_file = await cloudinary(req.files.h_file.tempFilePath);
    try {
        await pool.query(`
            INSERT INTO tasks (cc_id, h_name, h_description, h_file)
            VALUES ($1, $2, $3, $4)
        `, [c_id, h_name, h_description, h_file]);
        const task = await (await pool.query(`
            SELECT * FROM tasks
            ORDER BY h_id DESC LIMIT 1
        `)).rows[0];
        res.status(200).json({
            msg: 'Задание успешно создано',
            task: {h_name, h_description, h_file}
        });
        return;
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при создании задания. Попробуйте еще раз',
            err
        });
        return;
    }
};

tasks.getTasks = async (req, res) => {
    const c_id = req.params.c_id;
    try {
       const tasks = await(await pool.query(`
            SELECT * FROM tasks
            WHERE cc_id = $1
       `, [c_id])).rows;
       res.status(200).json(tasks);
       return;
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при загрузке заданий. Перезагрузите страницу',
            err
        });
        return;
    }
};

module.exports = tasks;