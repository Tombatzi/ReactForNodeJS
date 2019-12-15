import React,{useState,useEffect,useContext} from 'react';
import CustomerTable from './table/CustomerTable'
import Form from './form/Form'

export const SearchContext = React.createContext();

const SearchCustomers = () => {

    const [customers, setCustomers] = useState([]);
    const [customerTypes, setCustomerTypes] = useState([]);
    const [query, setQuery] = useState("");
   
    
  
    useEffect(() =>{
        console.log("UseEffect:");
        console.log(query);
        async function fetchCustomers(){
            let response = await fetch("http://localhost:3000/asiakas?"+query);
            let d = await response.json();
            console.log(d);
            setCustomers(d.response);
        }
        fetchCustomers();
    },[query]);
    
    useEffect(() =>{
    async function fetchTypes(){
        let response = await fetch("http://localhost:3000/asiakastyyppi");
        let d = await response.json();
        console.log(d);
        setCustomerTypes(d.response);
    }
    fetchTypes();
},[]);

    return (
        <SearchContext.Provider value = {{updateQuery : (q) => {setQuery(q)},types : customerTypes}}>
        <div>
            <p>Haetaan asiakkaat</p>
            <Form/>
            <CustomerTable customers = {customers}/>
        </div>
        </SearchContext.Provider>
    )
}

export default SearchCustomers;