import { useState, useEffect } from "react";
import axios from 'axios'; 
import StudentForm from "../components/StudentForm";
import StudentTabel from "../components/StudentTabel";
import "bootstrap/dist/css/bootstrap.min.css"; 

const API_URL = 'http://localhost:5000/api/data-siswa'; 

export default function SiswaPage() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ kode: '', nama: '', alamat: '', tgl: '', jurusan: '' });
    const [editData, setEditData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setStudents(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []); 

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        try {
            await axios.post(API_URL, formData);
            setFormData({ kode: '', nama: '', alamat: '', tgl: '', jurusan: '', gender: '' });
            await fetchStudents(); 
            setSuccessMessage('Data Siswa berhasil ditambahkan!');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (siswa) => {
        setEditData(siswa); 
        setFormData({
            kode: siswa.kode_siswa,
            nama: siswa.nama_siswa,
            alamat: siswa.alamat_siswa,
            tgl: siswa.tgl_lahir_siswa,
            jurusan: siswa.jurusan_siswa,
            gender: siswa.jenis_kelamin
        });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        
        const idToUpdate = formData.kode; 

        try {
            await axios.put(`${API_URL}/${idToUpdate}`, formData);
            
            setFormData({ kode: '', nama: '', alamat: '', tgl: '', jurusan: '', gender: '' });
            setEditData(null); 
            
            await fetchStudents(); 
            setSuccessMessage('Data Siswa berhasil diperbarui!');

        } catch (err) {
            setError(err.message ? 'Nama siswa tidak boleh kurang dari 2 karakter!' : err.message );
        } finally {
            setLoading(false);
        }
    };
    
    const deleteStudent = async (kode) => {
        if (!window.confirm(`Yakin ingin menghapus siswa dengan kode ${kode}?`)) return;
        setLoading(true);
        
        try {
            await axios.delete(`${API_URL}/${kode}`); 
            await fetchStudents(); 
            setSuccessMessage(`Siswa dengan kode ${kode} berhasil dihapus!`);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const cancelEdit = () => {
        setFormData({ kode: '', nama: '', alamat: '', tgl: '', jurusan: '', gender: '' });
        setEditData(null);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Manajemen Data Siswa</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <StudentForm 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleSubmit={editData ? handleUpdateSubmit : handleAddSubmit}
                loading={loading}
                isEditMode={!!editData}
                onCancelEdit={cancelEdit}
            />

            <StudentTabel 
                students={students} 
                onDelete={deleteStudent} 
                onEdit={startEdit}
                loading={loading}
            />
        </div>
    )
}