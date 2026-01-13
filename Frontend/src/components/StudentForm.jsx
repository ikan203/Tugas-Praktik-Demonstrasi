const StudentForm = ({ formData, handleInputChange, handleSubmit, loading, isEditMode, onCancelEdit }) => {
    return (
        <form onSubmit={handleSubmit} className="row g-3 mb-4 p-3 border rounded">

            <div className="col-md-6">
                <input
                    type="text"
                    className="form-control"
                    name="kode"
                    placeholder="Kode Siswa"
                    value={formData.kode}
                    onChange={handleInputChange}
                    required
                    readOnly={isEditMode}
                    style={isEditMode ? { backgroundColor: '#e9ecef' } : {}}
                />
            </div>

            <div className="col-md-6">
                <input type="text" className="form-control" name="nama" placeholder="Nama Siswa" value={formData.nama} onChange={handleInputChange} required />
            </div>

            <div className="col-12">
                <input type="text" className="form-control" name="alamat" placeholder="Alamat Siswa" value={formData.alamat} onChange={handleInputChange} />
            </div>

            <div className="col-md-6">
                <input type="date" className="form-control" name="tgl" value={formData.tgl} onChange={handleInputChange} required />
            </div>

            <div className="col-md-6">
                <input type="text" className="form-control" name="jurusan" placeholder="Jurusan Siswa" value={formData.jurusan} onChange={handleInputChange} />
            </div>

            <div className="col-md-6">
                <label>Jenis Kelamin:</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Laki-laki" 
                            checked={formData.gender === 'Laki-laki'} 
                            onChange={handleInputChange}
                        />
                        Laki-laki
                    </label>
                </div>

                <div className="col-md-6">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Perempuan" 
                            checked={formData.gender === 'Perempuan'} 
                            onChange={handleInputChange}
                        />
                        Perempuan
                    </label>
                </div>
            </div>
            
            <div className="col-12 d-flex">
                <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                    {loading ? 'Menyimpan...' : (isEditMode ? 'Update Data' : 'Simpan Data')}
                </button>

                {isEditMode && (
                    <button type="button" className="btn btn-secondary" onClick={onCancelEdit} disabled={loading}>
                        Batal Edit
                    </button>
                )}
            </div>
        </form>
    );
};

export default StudentForm;