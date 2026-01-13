export default function StudentTabel({ students, onDelete, onEdit, loading }) {
    const cleanDate = (dateString) => {
        if (!dateString) return 'N/A';
        return String(dateString).split('T')[0];
    };

    return (
        <div className="table-responsive">
            {loading && <p className="text-center text-info">Memuat data...</p>}

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Kode Siswa</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Tanggal Lahir</th>
                        <th>Jurusan</th>
                        <th>Jenis Kelamin</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length === 0 && !loading ? (
                        <tr>
                            <td colSpan="7" className="text-center text-muted">
                                Belum ada data siswa
                            </td>
                        </tr>
                    ) : (
                        students.map((DataSiswa) => (
                            <tr key={DataSiswa.kode_siswa}>
                                <td>{DataSiswa.kode_siswa}</td>
                                <td>{DataSiswa.nama_siswa}</td>
                                <td>{DataSiswa.alamat_siswa}</td>
                                <td>{cleanDate(DataSiswa.tgl_lahir_siswa)}</td>
                                <td>{DataSiswa.jurusan_siswa}</td>
                                <td>{DataSiswa.jenis_kelamin}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => onDelete(DataSiswa.kode_siswa)}
                                        disabled={loading}
                                    >
                                        Hapus
                                    </button>

                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => onEdit(DataSiswa)} 
                                        disabled={loading}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}