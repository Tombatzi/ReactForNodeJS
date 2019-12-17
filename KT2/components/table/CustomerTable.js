import React,{useContext} from 'react'
import { SearchContext } from '../RestApp';

const CustomerTable = (props) =>{
    //Mapataan propsina tulleet tiedot taulukkoon
    const tableContext = useContext(SearchContext);
    
    const customerRow = props.customers.map((customer,i) =><tr key ={i}><td>{customer.AVAIN}</td><td>{customer.NIMI}</td>
            <td>{customer.OSOITE}</td><td>{customer.POSTINRO}</td><td>{customer.POSTITMP}</td><td>{customer.LUONTIPVM}</td>
            <td>{customer.ASTY_AVAIN}</td><td>{customer.SELITE}</td><td><button onClick ={() => deleteCustomer(customer.AVAIN) }>Poista</button></td></tr>);
    
    const deleteCustomer = (id) =>{
        const deleteCust = tableContext.deleteCustomerData;

        deleteCust(id);
    }
    return(
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
                <th>Selite</th>
                <th>Poista Asiakas</th>
            </tr>
        </thead>
        <tbody>
            {customerRow}
        </tbody>
    </table>
        
    )
}

export default CustomerTable;