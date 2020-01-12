import React, {useState,useEffect} from 'react';
import GetStudents from '../getStudents/GetStudents';

const SearchForm = () => {

    const [studentTypes, setStudentTypes] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [type, setType] = useState("");
    const [searchData, setSearchData] = useState("");

    useEffect(() =>{
        async function fetchTypes(){
            let response = await fetch("http://localhost:3000/studenttype");
            let d = await response.json();
            console.log(d);
        setStudentTypes(d.response.map((type, i)  => type.status == 0 ? <option value = {type.typeid} key = {i}>{type.status} - {type.selite}</option> :
        <option disabled value = {type.typeid}  key = {i}>{type.status} - {type.selite}</option> ));
        }
        fetchTypes();
    },[]);

    const handleSearch = () => {

        let str = "";

        if(firstname != ""){
            str += "etunimi=" + firstname +"&";
        }
        if(lastname != ""){
            str += "sukunimi=" + lastname +"&";
        }
        if(type != ""){
            str += "typeid=" + type;
        }
        setSearchData(str);
    }

    return(
        <div>
            <h3>Hae opiskelijoita</h3>
            <form>
                <fieldset>
                    <legend>Henkilötiedot:</legend>
                    Etunimi: <br/>
                    <input type = "text" value = {firstname} onChange={(e) => setFirstname(e.target.value)}/><br/>
                    Sukunimi: <br/>
                    <input type = "text" value = {lastname} onChange={(e) => setLastname(e.target.value)}/><br/>
                    Tyyppi: <br/>
                    <select onChange={(e) => setType(e.target.value)}>
                    <option value = "">Valitse</option>
                    {studentTypes}
                    </select>
                </fieldset>
            </form>
            <button onClick = { () => handleSearch()}>Hae</button>
            <GetStudents searchData = {searchData}/>
        </div>
    )
}

export default SearchForm;