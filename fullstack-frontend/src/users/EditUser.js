import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {

    let navigate=useNavigate();

    const {id}=useParams()

    const [user,setUser]=useState({
        name:"",
        username:"",
        email:""
    });

    const{name,username,email}=user;

    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})

    };

    useEffect(()=>{
        loadUser();
    },[]);

    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`,user)
        navigate("/");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    };

  return (
    <div className='container'>
        <div className='row'>
            <div className="col-md-7 offset-md-3 broder rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">회원수정</h2>
                <form onSubmit={(e)=>onSubmit(e)}>
                <div className='mb-3'>
                    <label hemlFor="Name" className='form-label'>
                        이름
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="이름 쓰셍요"
                    name="name"
                    value={name}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label hemlFor="Username" className='form-label'>
                        닉네임
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="닉네임 쓰세용"
                    name="username"
                    value={username}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label hemlFor="Email" className='form-label'>
                        이메일
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="이메일 쓰세용"
                    name="email"
                    value={email}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <button type="submit" className='btn btn-outline-primary'>
                    제출</button>
                    
                <Link className='btn btn-outline-danger mx-2' to='/'>
                    취소</Link>
                </form>
            </div>
        </div>

    </div>
  )
}
