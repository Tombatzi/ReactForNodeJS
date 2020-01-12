import React, { useState, useEffect } from 'react'

const AddStudentForm = () => {
    
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState(""); 
    const [postalcode, setPostalcode] = useState("");
    const [county, setCounty] = useState("");
    const [typeId, setTypeId] = useState("");
    const [studentTypes, setStudentTypes] = useState(0);
    const [studentData, setStudentData] = useState("");
    const [send, setSend] = useState(false);

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

    useEffect(() => {

        async function addStudentToDb() {
        console.log(studentData);
        let response = await fetch("http://localhost:3000/student", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData),
        });
        if (!response.ok) {
            let data = await response.json();
            console.log("Error", data);
        }
        else {
            let data = await response.json();
            console.log("OK",data);
        }
    }
    if (send) {
        addStudentToDb();
    }
    setSend(false);
}, [studentData]);

    const handlePost = () => {
        setStudentData({etunimi : "", sukunimi : "", lahiosoite : "", postinro : "", postitoimipaikka : "", tyyppi : ""});

        if(firstname!= ""){
            setStudentData({etunimi : firstname})
        }
        if(lastname!= ""){
            setStudentData({etunimi : firstname, sukunimi : lastname, lahiosoite : "", postinro : "", postitoimipaikka : "",tyyppi : ""})
        }
        if(address!= ""){
            setStudentData({etunimi : firstname, sukunimi : lastname, lahiosoite : address, postinro : "", postitoimipaikka : "",tyyppi : ""})
        }
        if(postalcode!= ""){
            setStudentData({etunimi : firstname, sukunimi : lastname, lahiosoite : address, postinro : postalcode, postitoimipaikka : "",tyyppi : ""})
        }
        if(county!= ""){
            setStudentData({etunimi : firstname, sukunimi : lastname, lahiosoite : address, postinro : postalcode, postitoimipaikka : county, tyyppi : ""})
        }
        if(typeId!= 0){
            setStudentData({etunimi : firstname, sukunimi : lastname, lahiosoite : address, postinro : postalcode, postitoimipaikka : county, tyyppi : typeId})
        }

         setSend(true);

    }

    return(
        <div>
            <h3>Lisää Opiskelija</h3>
            <form>
                <fieldset>
                    <legend>Henkilötiedot:</legend>
                    Etunimi: <br/>
                    <input type = "text" value = {firstname} onChange={(e) => setFirstname(e.target.value)}/><br/>
                    Sukunimi: <br/>
                    <input type = "text" value = {lastname} onChange={(e) => setLastname(e.target.value)}/><br/>
                    Osoite: <br/>
                    <input type = "text" value = {address} onChange={(e) => setAddress(e.target.value)}/><br/>
                    Postinumero: <br/>
                    <input type = "text" value = {postalcode} onChange={(e) => setPostalcode(e.target.value)}/><br/>
                    Postitoimipaikka: <br/>
                    <input type = "text" value = {county} onChange={(e) => setCounty(e.target.value)}/><br/>
                    Tyyppi: <br/>
                    <select onChange={(e) => setTypeId(e.target.value)}>
                    <option value = "">Valitse</option>
                    {studentTypes}
                    </select>
                </fieldset>
            </form>
            <button onClick = { () => handlePost()}>Lisää</button>
        </div>
    )
}

export default AddStudentForm;