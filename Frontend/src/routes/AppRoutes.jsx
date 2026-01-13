import { Route, Routes } from "react-router-dom";
import SiswaPage from "../pages/Siswa"; 

export default function AppRoutes(){
    return (
            <Routes>
                <Route path="/" element={<SiswaPage />}/> 
                <Route path="/siswa" element={<SiswaPage />}/>
            </Routes>
    )
}