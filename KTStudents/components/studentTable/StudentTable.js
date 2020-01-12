import React from 'react'

const StudentTable = (props) => {
    
    const studentData = props.students.map((student, i) => <tr key = {i}>
        <td>{student.id}</td>
        <td>{student.etunimi}</td>
        <td>{student.sukunimi}</td>
        <td>{student.osoite_idosoite}</td>
        <td>{student.postinro}</td>
        <td>{student.typeid}</td>
        <td>{student.selite}</td>
        </tr>);
    
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Etunimi</th>
                    <th>Sukunimi</th>
                    <th>OsoiteID</th>
                    <th>PostiNumero</th>
                    <th>TyyppiID</th>
                    <th>Tyyppi</th>
                </tr>
                </thead>
                <tbody>
                {studentData}
                </tbody>
            </table>
        </div>
    )
}

export default StudentTable;