import React,{useState,useEffect} from 'react';
import CustomerTable from './table/CustomerTable'
import Form from './form/Form'
//Haetaan asiakkaiden tiedot state-muuttujiin, käytetään contextia datan välitykseen Form ja SearchCustomers-komponenttien välillä
export const SearchContext = React.createContext();

const SearchCustomers = () => {

    const [customers, setCustomers] = useState([]);
    const [customerTypes, setCustomerTypes] = useState([]);
    const [query, setQuery] = useState("");
    const [deleteCustomerId, setDeleteCustomerId] = useState("");
   
    
  
    useEffect(() =>{
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
        async function deleteCustomer(id){
            
                let response = await fetch("http://localhost:3000/asiakas/"+id, {
                    method: 'DELETE',
                });
                console.log(response);
        };

    return (
        <SearchContext.Provider value = {{updateQuery : (q) => {setQuery(q)}, updateDeleteId : (id) => {setDeleteCustomerId(id)},
                                        deleteCustomerData  : (id) => {deleteCustomer(id)} ,types : customerTypes}}>
        <div>
            <p>Haetaan asiakkaat</p>
            <Form/>
            <CustomerTable customers = {customers}/>
        </div>
        </SearchContext.Provider>
    )
}

export default SearchCustomers;