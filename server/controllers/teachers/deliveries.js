import pool from '../../db/keys';
import cloudinary from '../../lib/cloudinary';

const deliveries = {};

deliveries.getDeliveries = async (req, res) => {
    const h_id = req.params.h_id;
    try {
        const deliveries = await (await pool.query(`
            SELECT * FROM delivery
            WHERE dh_id = $1
        `, [h_id])).rows;
        res.status(200).json(deliveries);
        return;
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при получении выполненных заданий. Перезагрузите страницу',
            err
        });
        return;
    }
};

module.exports = deliveries;