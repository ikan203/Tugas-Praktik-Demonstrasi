const util = require('util');
const connection = require('../config/db');

const query = util.promisify(connection.query).bind(connection);

module.exports = {
    getAllSiswa: async (req, res) => {
        try {
            const results = await query('SELECT * FROM DataSiswa');
            const formattedResults = results.map(row => ({
                ...row,
                tgl_lahir_siswa: row.tgl_lahir_siswa ? row.tgl_lahir_siswa.toISOString().split('T')[0] : null
            }));
            res.json(formattedResults);
        } catch (error) {
            console.error('DB error in getAllSiswa:', error);
            res.status(500).json({ error: 'Database query error' });
        }
    },

    getSiswaById: async (req, res) => {
        const { id } = req.params;
        try {
            const results = await query('SELECT * FROM DataSiswa WHERE kode_siswa = ?', [id]);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Siswa not found' });
            }
            res.json(results[0]);
        } catch (error) {
            console.error('DB error in getSiswaById:', error);
            res.status(500).json({ error: 'Database query error' });
        }
    },

    addSiswa: async (req, res) => {
        const { kode, nama, alamat, tgl, jurusan, gender } = req.body;
        const sql = 'INSERT INTO DataSiswa (kode_siswa, nama_siswa, alamat_siswa, tgl_lahir_siswa, jurusan_siswa, jenis_kelamin) VALUES (?, ?, ?, ?, ?, ?)';
        
        try {
            const results = await query(sql, [kode, nama, alamat, tgl, jurusan, gender]);
            const insertedId = results.insertId || null;

            res.status(201).json({
                message: 'Data Siswa added successfully',
                kode_siswa: kode
            });
        } catch (error) {
            console.error('DB error in addSiswa:', error);
            res.status(500).json({ error: 'Database insert error' });
        }
    },

    updateSiswa: async (req, res) => {
        const { id } = req.params;
        const body = req.body;

        const updates = [];
        const params = [];
        const allowedFields = {
            nama: 'nama_siswa',
            alamat: 'alamat_siswa',
            tgl: 'tgl_lahir_siswa',
            jurusan: 'jurusan_siswa',
            gender: 'jenis_kelamin'
        };
        
        for (const [key, dbField] of Object.entries(allowedFields)) {
            if (body[key] !== undefined) { 
                updates.push(`${dbField} = ?`);
                params.push(body[key]);
            }
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'At least one field is required to update' });
        }
        
        const sql = `UPDATE DataSiswa SET ${updates.join(', ')} WHERE kode_siswa = ?`;
        params.push(id);

        try {
            const results = await query(sql, params);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Siswa not found' });
            }
            res.json({ message: 'Siswa updated successfully' });
        } catch (error) {
            console.error('DB error in updateSiswa:', error);
            res.status(500).json({ error: 'Database update error' });
        }
    },

    deleteSiswa: async (req, res) => {
        const { id } = req.params;
        try {
            console.log(`[DELETE DEBUG] Mencoba menghapus kode: ${id}`); 
            
            const results = await query('DELETE FROM DataSiswa WHERE kode_siswa = ?', [id]);
            
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Siswa not found' });
            }
            res.json({ message: 'Siswa deleted successfully' });
        } catch (error) {
            console.error('DB error in deleteSiswa:', error);
            res.status(500).json({ error: 'Database delete error' });
        }
    }
};