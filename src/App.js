import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import {format} from "date-fns";


export default function App() {

    const [showPosts, setshowPosts] = useState()
    const apiUrl = "http://localhost:8080/applications"
    let displayData

    function pullJson() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(responseData => {
                displayData = responseData.map(function (application) {
                    return (
                        <tr key={application.id}>
                            <td>{application.id}</td>
                            <td>{application.candidate.firstName} {application.candidate.lastName}</td>
                            <td>{application.interview == null ? "" : application.interview.interviewType}</td>
                            <td>{application.interview == null ? <i>no interview scheduled</i> : format(new Date(application.interview.interviewTime), 'MMMM do, yyyy H:mm')}</td>
                            <td>{application.interview == null ? "" : application.interview.firstName + " " + application.interview.lastName}</td>
                        </tr>
                    )

                })
                console.log(responseData)
                setshowPosts(displayData);
                //console.log(responseData);
            })
    }

    useEffect(() => {
        pullJson()
    }, [])

    return (
        <div className="App">
            <body>
            <table>
                <thead>
                <tr>
                    <th>Application ID</th>
                    <th>Candidate Name</th>
                    <th>Interview Type</th>
                    <th>Interview Date</th>
                    <th>Interviewer Name</th>
                </tr>
                </thead>
                <tbody>
                {showPosts}
                </tbody>
            </table>
            </body>
        </div>
    );
}

