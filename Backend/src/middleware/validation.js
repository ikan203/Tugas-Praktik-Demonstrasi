const validationAdd = (req, res, next) => {
    const { nama } = req.body;
    const error= [];

     if (!nama || typeof nama !== 'string' || nama.trim().length < 2) {
        error.push('Nama wajib (minimal 2 karakter).');
    }
    if(error.length) return res.status(400).json({error: error});
        next();
};

module.exports = {
    validationAdd
};