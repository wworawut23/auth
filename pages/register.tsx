import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "antd";

type Props = {};

export default function register({}: Props) {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [prefix, setPrefix] = useState<string>("นาย");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("ชาย");
  

  useEffect(()=>{
      console.log(localStorage.getItem("access_token"))
  },[])

  return (
    <div>
      <div className="sticky top-0 z-50 flex flex-row justify-between border-[#F8A978] bg-[#F8A978] p-2">
        <img
          className="w-10"
          src="https://clubvi.files.wordpress.com/2011/11/cp-foods-logo1.jpg"
          alt=""
        />
        <Button
          className=" rounded border bg-orange-500  px-4 font-semibold text-white drop-shadow-md hover:bg-orange-400"
          type="primary"
          onClick={() => {
            localStorage.removeItem("access_token");
            router.push("/login");
          }}
        >
          Login
        </Button>
      </div>
      <div className="flex flex-col bg-[#fcd7c1] h-screen justify-center text-sm md:text-lg ">
      <div className=" bg-white border rounded-xl h-5/6 mx-6 p-4 md:mx-48 2xl:mx-96 ">
        <div className="flex header justify-center">
          <h1 className="text-lg font-semibold">Register</h1>
        </div>
        <div className="flex flex-col mt-4 gap-y-2">
          <span>Username : </span>
          <input
            className="border"
            type="text"
            value={username}
            onChange={(e) => {
              var ew = e.target.value;
              ew = ew.replace(/[^A-Za-z0-9]/gi, "");
              setUsername(ew.trim());
            }}
          />
        </div>
        <div className="flex flex-col mt-3 gap-y-2">
          <span>Password : </span>
          <input
            className="border"
            type="password"
            value={password}
            onChange={(e) => {
              var ew = e.target.value;
              ew = ew.replace(/[^A-Za-z0-9]/gi, "");
              setPassword(ew.trim());
            }}
          />
        </div>
        <div className="flex flex-col mt-3 gap-y-2">
          <span>FirstName : </span>
          <input
            className="border"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value.trim());
            }}
          />
        </div>
        <div className="flex flex-col mt-3 gap-y-2">
          <span>LastName : </span>
          <input className="border" type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value.trim())}}/>
        </div>
        <div className="flex flex-col mt-3 gap-y-2">
          <span>Age : </span>
          <input
            className="border"
            type="number"
            min={1}
            max={120}
            value={age}
            onChange={(e) => {
              setAge(e.target.value.trim());
            }}
          />
        </div>
        <div className="flex flex-col mt-3 gap-y-2">
          <span>คำนำหน้า : </span>
          <select
            className="border"
            defaultValue="ชาย"
            onChange={(e) => {
              setPrefix(e.target.value.trim());
            }}
          >
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
          </select>
        </div>

        <div className="flex flex-col mt-3 gap-y-2">
          <span>Gender : </span>
          <select
            className="border "
            defaultValue="ชาย"
            onChange={(e) => {
              setGender(e.target.value.trim());
            }}
          >
            <option value="ชาย">ชาย</option>
            <option value="หญิง">หญิง</option>
            <option value="อื่น ๆ">อื่น ๆ</option>
          </select>
        </div>

        <div className="flex flex-row mt-5 gap-x-4 justify-center">
          <button
            className="border px-2 rounded"
            onClick={async () => {
              try {
                const res = await fetch("http://localhost:3333/register", {
                  method: "POST",
                  body: JSON.stringify({
                    username: username,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    age: age,
                    gender: gender,
                    prefix: prefix,
                  }),
                  headers: { "Content-Type": "application/json" },
                });

                if (res.status !== 500) {
                  alert("ไปยังหน้า login");
                  router.push("login");
                }
              } catch (error) {}
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    </div>
    
  );
}
