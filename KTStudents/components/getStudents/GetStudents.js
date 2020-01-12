import React,{useState,useEffect} from 'react';
import StudentTable from '../studentTable/StudentTable';


const GetStudents = (props) => {

   
    const [students, setStudents] = useState([]);
    let query = props.searchData;

    useEffect(() =>{
        async function fetchStudents(){
            let response = await fetch("http://localhost:3000/student?"+query);
            let d = await response.json();
            console.log(d);
            setStudents(d.response);
        }
        fetchStudents();
    },[query]);

    return(
        <div>
            <StudentTable students = {students}/>
        </div>
    )
}
export default GetStudents;