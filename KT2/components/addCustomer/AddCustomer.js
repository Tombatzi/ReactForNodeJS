import React, { useState, useEffect } from 'react';

const AddCustomer = () => {

    const date = new Date();
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [postOffice, setPostOffice] = useState("");
    const [customerTypeId, setCustomerTypeId] = useState("");
    const [customerTypes, setCustomerTypes] = useState();
    const [query, setQuery] = useState("");
    const [send, setSend] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        async function fetchTypes() {
            let response = await fetch("http://localhost:3000/asiakastyyppi");
            let data = await response.json();
            setCustomerTypes(data.response.map((type, i) => <option key={i} value={type.AVAIN}>{type.LYHENNE} - {type.SELITE}</option>));
        }
        fetchTypes();
    }, []);

    useEffect(() => {
        async function addCustomerToDb() {

            let response = await fetch("http://localhost:3000/asiakas", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(query),
            });
            if (!response.ok) {
                let data = await response.json();
                console.log("Error", response.status);
                setErrorMsg(data.msg);
            }
            else {
                let data = await response.json();
                console.log(data);
                setErrorMsg("");
            }
        }
        if (send) {
            addCustomerToDb();
        }
        setSend(false);
    }, [query]);

    const handleAddCustomer = () => {
        if (error == false) {
            setQuery({
                NIMI: name, OSOITE: address, POSTINRO: parseInt(postalCode), POSTITMP: postOffice,
                LUONTIPVM: currentDate, ASTY_AVAIN: customerTypeId
            });
        }
        else {
            setQuery({
                NIMI: name, OSOITE: address, POSTINRO: parseInt(postalCode), POSTITMP: postOffice,
                LUONTIPVM: currentDate, ASTY_AVAIN: customerTypeId, error: "testError"
            });

        }
        setSend(true);
    }

    return (
        <div>
            <form>
                <label>Nimi</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <label>Osoite</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /><br />
                <label>Postinumero</label>
                <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} /><br />
                <label>Postitoimipaikka</label>
                <input type="text" value={postOffice} onChange={(e) => setPostOffice(e.target.value)} /><br />
                <label >LuontiPVM</label>
                <input value={currentDate} readOnly type="text" /><br />
                <label>Asiakastyyppi</label>
                <select value={customerTypeId} onChange={(e) => setCustomerTypeId(e.target.value)}>
                    <option value="" defaultValue disabled>Select customer ID</option>
                    {customerTypes}
                </select><br />
                <label>Create an error</label>
                <input type="checkbox" value={error} onChange={() => error == false ? setError(true) : setError(false)} />
            </form>
            <button onClick={() => handleAddCustomer()}>Add Customer</button>
            <h3>{errorMsg}</h3>
        </div>
    )
}

export default AddCustomer;