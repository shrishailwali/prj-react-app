import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UploadForm from "../components/UploadForm";
import "./Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");


    useEffect(() => {

        if (!userId) {
            navigate("/");
        }

    }, [userId, navigate]);



    const handleLogout = () => {

        localStorage.removeItem("userId");

        navigate("/");

    };



    return (

        <div className="dashboard-page">

                <div className="dashboard-container">
                <div className="dashboard-header">
                    <div className="header-left">
                        <div className="logo-section">
                            <div className="logo-icon"></div>
                            <h2></h2>
                        </div>
                        <div className="welcome-section">
                            <h1>Welcome, <span className="username">{userId}</span></h1>
                            <p>Upload your documents</p>
                        </div>
                    </div>
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                <div className="main-content">
                    <UploadForm />
                </div>
            </div>

        </div>

    );

}


export default Dashboard;