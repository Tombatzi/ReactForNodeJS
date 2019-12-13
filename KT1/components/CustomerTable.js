import React from 'react'

const CustomerTable = (props) =>{
    console.log(props.customers);
    const customerRow = props.customers.map((customer,i) =><tr key = {i}><td>{customer.AVAIN}</td> <td>{customer.NIMI}</td>
            <td>{customer.OSOITE}</td><td>{customer.POSTINRO}</td><td>{customer.POSTITMP}</td><td>{customer.LUONTIPVM}</td>
            <td>{customer.ASTY_AVAIN}</td></tr>)
    return(
        <tbody>
            {customerRow}
        </tbody>
    )
}

export default CustomerTable;