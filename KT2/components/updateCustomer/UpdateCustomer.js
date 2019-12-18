import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom'


const UpdateCustomer = () => {
    const h = useHistory();
    const l = useLocation()
    const customer = (l.state.customer);
    const currentDate = customer.LUONTIPVM;
    const [name, setName] = useState(customer.NIMI);
    const [address, setAddress] = useState(customer.OSOITE);
    const [postalCode, setPostalCode] = useState(customer.POSTINRO);
    const [postOffice, setPostOffice] = useState(customer.POSTITMP);
    const [customerTypeId, setCustomerTypeId] = useState(customer.ASTY_AVAIN);
    const [customerTypes, setCustomerTypes] = useState(l.state.types.map((type, i) => <option key={i} value={type.AVAIN}>{type.LYHENNE} - {type.SELITE}</option>));
    const [msg, setMsg] = useState("");
    const [dataToUpdate, setDataToUpdate] = useState([]);
    const [sendUpdate, setSendUpdate] = useState();

    useEffect(() => {

        async function updateCustomerData(id) {
            let response = await fetch("http://localhost:3000/asiakas/" + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToUpdate),
            });
            console.log(dataToUpdate);
            let data = await response.json();
            console.log(data);
            setMsg(data.msg);
        }
        if (sendUpdate) {
            updateCustomerData(customer.AVAIN);
        }
        setSendUpdate(false);
    }, [dataToUpdate]);

    const handleUpdate = () => {

        setDataToUpdate({ NIMI: name, OSOITE: address, POSTINRO: parseInt(postalCode), POSTITMP: postOffice, ASTY_AVAIN: customerTypeId });
        setSendUpdate(true);
    }

    const handleCancel = () => { 
        h.push("/getCustomer")

    }
    return (
        <div>
            <h3>Update Customer Info</h3>
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
            </form>
            <button onClick={() => handleUpdate()}>Update</button>
            <button onClick={() => handleCancel()}>Cancel</button>
            <h3>{msg}</h3>
        </div>

    )
}

export default UpdateCustomer;