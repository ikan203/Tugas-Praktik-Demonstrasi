import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";

export default function App(){
  return (
    <Router>
    <AppRoutes />
    </Router>
  );
}
