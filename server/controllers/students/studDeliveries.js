import pool from '../../db/keys';
import cloudinary from '../../lib/cloudinary';

const studDeliveries = {};

studDeliveries.addDelivery = async (req, res) => {
    const {id, h_id} = req.body;
    const d_filename = req.files.d_file.name;
    const d_file = await cloudinary(req.files.d_file.tempFilePath);
    try {
       await pool.query(`
            INSERT INTO delivery (dh_id, ds_id, d_file, d_filename)
            VALUES ($1, $2, $3, $4)
       `, [h_id, id, d_file, d_filename]);
       res.status(200).json({
           msg: 'Задание успешно отправлено преподавателю',
           d_file,
           d_filename
       });
       return;
    } catch (err) {
        res.status(500).json({
            msg: 'Ошибка при отправке задания. Попробуйте еще раз',
            err
        });
        return;
    }
};

module.exports = studDeliveries;