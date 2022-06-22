import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {};

export default function lg({}: Props) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="m-4 border">
        <div className="text-md flex flex-col border border-orange-300 bg-orange-300 px-16 pt-12 pb-12 text-center font-semibold text-white">
          <div>
            <Button>
              <img
                className="w-20"
                src="https://clubvi.files.wordpress.com/2011/11/cp-foods-logo1.jpg"
                alt=""
              />
            </Button>
          </div>
          <div className="mt-2 text-2xl font-semibold">สวัสดีค่ะ</div>
          <div>
            <span className="mt-2 block">หากยังไม่สมัครสมาชิก</span>
            <span>กดสมัครสมาชิกก่อนเข้าใช้งาน</span>
          </div>
          <div className="mt-4">
            สมัครสมาชิกแล้วใช้ Email และ รหัสผ่าน ที่ตั้งไว้ ขั้นตอนสมัครสมาชิก
          </div>
        </div>
        <div className="flex flex-col border border-white px-8 pt-6 pb-16 font-semibold">
          <div className="mb-6 text-center">
            <h1>เข้าสู่ระบบ</h1>
          </div>

          <Input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className=" rounded border p-2"
            placeholder="username ที่สมัครสมาชิก"
          />
          <Input.Password
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className=" rounded border p-2"
            placeholder="รหัสผ่าน"
          />

          <Button
            className="my-6 w-full rounded border bg-orange-500 py-1 text-white drop-shadow-md hover:bg-orange-400"
            type="primary"
            onClick={async () => {
              try {
                const res = await fetch("http://localhost:3333/auth/login", {
                  method: "POST",
                  body: JSON.stringify({
                    username: username,
                    password: password,
                  }),
                  headers: { "Content-Type": "application/json" },
                });

                if (res.status !== 201) {
                  alert("username หรือ password ไม่ถูกต้อง");
                  return null;
                }
                const data = await res.json();
                await localStorage.setItem("access_token", data.access_token);
                router.push("/");
              } catch (error) {
                alert(error)
              }
            }}
          >
            เข้าสู่ระบบ
          </Button>
          <Link href="/register">
            <a className=" text-center text-xs font-semibold text-orange-800">
              <div>ยังไม่ได้สมัครสมาชิก? สมัครสมาชิกได้ที่นี่</div>{" "}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
