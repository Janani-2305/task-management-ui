import axios from "axios";
import { useState, useEffect } from "react";


 function LineChart() {

    const [data, setData] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            const axiosConfig={
                headers:{
                    Accept:"application/json",
                    Authorization: `Bearer` ${token}
                }
            };
            axios.get('http://task-management-api-env.eba-esuuzu4p.ap-south-1.elasticbeanstalk.com/api/v1//chart/get-chart-data', axiosConfig).then((res)=>{
                console.log(res.data.data)
            })
        }
       
    }, [])

    return(
        <div className="wrapper">
            LineChart
        </div>
    );
 }

 export default LineChart;