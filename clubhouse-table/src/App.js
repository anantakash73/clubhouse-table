import React, {useState, useEffect, useMemo} from "react";
import Table from "./Table";
import './App.css';
import axios from "axios";

function App() {
    const members = useMemo(
        () => [
            {
                Header: "Members",
                columns: [
                    {
                        Header: "Name",
                        accessor: "name"
                    },
                    {
                        Header: "Username",
                        accessor: "username",
                    },
                    {
                        Header: "Admin",
                        accessor: "admin"
                    },
                    {
                        Header: "Active",
                        accessor: "active"
                    },
                    {
                        Header: "Two Factor enabled",
                        accessor: "2fa"
                    },
                    {
                        Header: "Emails",
                        accessor: "email"
                    },
                    {
                        Header: "Image",
                        accessor: "image",
                        Cell: ({ cell: {value}}) => (
                                <img
                                    src={value + "?token=5ff521dc-81d8-42db-9910-08651e89b4be"}
                                    width={60}
                                />
                        )
                    },
                ]
            },
        ],
        []
    );
    const projects = useMemo(
        () => [
            {
                Header: "Projects",
                columns: [
                    {
                        Header: "Name",
                        accessor: "name"
                    },
                    {
                        Header: "Team",
                        accessor: "team",
                    },
                    {
                        Header: "Stories",
                        accessor: "stories"
                    },
                    {
                        Header: "Followers",
                        accessor: "followers",
                        tipText: "tooltip text"
                    },
                    {
                        Header: "Active",
                        accessor: "active"
                    }
                ]
            },
        ],
        []
    );

    const [memberData, setMemberData] = useState([]);
    const [projectsData, setProjectData] = useState([])

    const getData = async () => {
        const result = await axios("/members", )
        setMemberData(result.data);
        const projectResult = await axios("/projects")
        setProjectData(projectResult.data)
    }
    useEffect(() => {
        getData()

        const interval = setInterval(() => {
            getData()
        }, 60000)

        return()=>clearInterval(interval)
    }, [])
  return (
    <div className="App">
    <Table columns={members} data={memberData} />
    <Table columns={projects} data={projectsData} />
    </div>
  );
}

export default App;
