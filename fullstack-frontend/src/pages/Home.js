import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const[users,setUsers]=useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10; // Fixed page size

    // const {id}=useParams() // This useParams is not used in Home.js, can be kept or removed. Keeping for now.

    useEffect(() => {
        loadUsers(currentPage, pageSize);
      }, []); // Effect runs once on mount to load initial data

    const loadUsers = async (page = 0, size = pageSize) => {
        try {
            const result = await axios.get(`http://localhost:8080/users?page=${page}&size=${size}`);
            if (result.data.content) {
                setUsers(result.data.content);
                setTotalPages(result.data.totalPages);
                setCurrentPage(result.data.number);
            } else { // Handle cases where content might be missing, though Spring Page usually has it
                setUsers([]);
                setTotalPages(0);
                setCurrentPage(0);
            }
        } catch (error) {
            console.error("Error loading users:", error);
            setUsers([]);
            setTotalPages(0);
            setCurrentPage(0);
        }
    };

    const deleteUser=async (id)=>{
        try {
            await axios.delete(`http://localhost:8080/user/${id}`);
            // After deletion, reload users.
            // If the current page had only one item and it was deleted,
            // and it was not the first page, we might want to go to the previous page.
            let pageToLoad = currentPage;
            if (users.length === 1 && currentPage > 0) {
                pageToLoad = currentPage - 1;
            }
            loadUsers(pageToLoad, pageSize);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

  return (
    <div className='container'>
        <div className='py-4'>
            <table className="table border shadow">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">username</th>
                
                <th scope="col">Email</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user,index)=>( // user.id should be used for key if available and unique
                <tr key={user.id || index}>
                    <th scope="row">
                        {/* This index is relative to the page, not overall index */}
                        {currentPage * pageSize + index + 1}
                    </th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                        <Link 
                            className='btn btn-primary mx-2'
                            to={`/viewuser/${user.id}`}
                        >
                            View</Link>
                        <Link 
                            className="btn btn-outline-primary mx-2"
                            to={`/edituser/${user.id}`}
                        >
                            Edit
                        </Link>
                        <button className="btn btn-danger mx-2"
                        onClick={()=>deleteUser(user.id)}
                        >Delete</button>
                    </td>
                </tr>
                ))
                }

            </tbody>
            </table>
            {totalPages > 0 && (
            <div className="d-flex justify-content-center align-items-center my-3">
                <button
                    className="btn btn-outline-primary mx-1"
                    onClick={() => loadUsers(currentPage - 1, pageSize)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span className="mx-2">
                    Page {currentPage + 1} of {totalPages}
                </span>
                <button
                    className="btn btn-outline-primary mx-1"
                    onClick={() => loadUsers(currentPage + 1, pageSize)}
                    disabled={currentPage >= totalPages - 1}
                >
                    Next
                </button>
            </div>
            )}
            {totalPages === 0 && users.length === 0 && (
                <p className="text-center">No users found.</p>
            )}
        </div>
    </div>
  )
}
