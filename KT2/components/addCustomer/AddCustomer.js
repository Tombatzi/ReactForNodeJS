import React, {useState, useEffect} from 'react';

const AddCustomer = () => {

    const currentDate = new Date();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [postOffice, setPostOffice] = useState("");
    const [created, setCreated] = useState(currentDate.getFullYear()+"-"+currentDate.getMonth()+"-"+currentDate.getDate());
    const [customerTypeId, setCustomerTypeId] = useState("");
    const [query, setQuery] = useState("");
    const [send, setSend] = useState(false);

    useEffect(() =>{
        console.log("UseEffect:");
        console.log(query);
        async function addCustomerToDb(){
            let response = await fetch("http://localhost:3000/asiakas",{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(query),
            });
            let data = await response.json();
            console.log(data);
        }
        if(send){
        addCustomerToDb();
        }
        setSend(false);
    },[query]);

    const handleAddCustomer = () =>{
        setQuery({NIMI : name, OSOITE : address, POSTINRO : parseInt(postalCode), POSTITMP : postOffice,
             LUONTIPVM : created, ASTY_AVAIN : customerTypeId});
        setSend(true);
    }

    return(
        <div>
            <form>
                <label>Nimi</label> 
                <input type ="text" value = {name} onChange = {(e) => setName(e.target.value)}/><br/>
                <label>Osoite</label>
                <input type ="text" value = {address} onChange = {(e) => setAddress(e.target.value)}/><br/>
                <label>Postinumero</label>
                <input type ="text" value = {postalCode} onChange = {(e) => setPostalCode(e.target.value)}/><br/>
                <label>Postitoimipaikka</label>
                <input type ="text" value = {postOffice} onChange = {(e) => setPostOffice(e.target.value)}/><br/>
                <label >LuontiPVM</label>
                <input value = {created} readOnly type ="text"/><br/>
                <label>Asty_Avain</label>
                <select value = {customerTypeId} onChange = {(e) => setCustomerTypeId(e.target.value)}>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                </select>
            </form>
            <button onClick ={() => handleAddCustomer()}>Add Customer</button>
        </div>
    )
}

export default AddCustomer;