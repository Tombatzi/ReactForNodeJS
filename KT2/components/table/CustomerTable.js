import React from 'react'

const CustomerTable = (props) =>{

    const customerRow = props.customers.map((customer,i) =><tr key ={i}><td>{customer.AVAIN}</td><td>{customer.NIMI}</td>
            <td>{customer.OSOITE}</td><td>{customer.POSTINRO}</td><td>{customer.POSTITMP}</td><td>{customer.LUONTIPVM}</td>
            <td>{customer.ASTY_AVAIN}</td><td>{customer.SELITE}</td></tr>);
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
            </tr>
        </thead>
        <tbody>
            {customerRow}
        </tbody>
    </table>
        
    )
}

export default CustomerTable;