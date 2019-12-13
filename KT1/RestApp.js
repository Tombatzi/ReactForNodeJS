import React,{useState,useEffect} from 'react';
import CustomerTable from './components/CustomerTable'

const RestApp = () => {

    const [customers, setCustomers] = useState([]);

    useEffect(() =>{
        console.log("UseEffect:");
        async function fetchTypes(){
            let response = await fetch("http://localhost:3000/asiakas");
            let d = await response.json();
            console.log(d);
            setCustomers(d.response);
        }
        fetchTypes();
    },[]);

    return (
        <div>
            <p>Haetaan asiakkaat</p>
            <table>
                <thead>
                    <tr>
                        <th>Avain</th>
                        <th>Nimi</th>
                        <th>Osoite</th>
                        <th>Postinro</th>
                        <th>Postitmp</th>
                        <th>Luontipvm</th>
                        <th>Asty_avain</th>
                    </tr>
                </thead>
                <CustomerTable customers = {customers}/>
            </table>
        </div>
    )
}

export default RestApp;