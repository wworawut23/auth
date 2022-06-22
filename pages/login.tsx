import { Button, Form, Input, Space } from "antd";
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

  const onFinish = async (values: any) => {
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
      localStorage.setItem("access_token", data.access_token);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    alert("กรุณากรอก username กับ password")
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="">
      <div className="m-4 border flex flex-col md:flex-row sm:mx-24 md:mx-8 md:mt-16 lg:mx-36 xl:mx-64 ">
        <div className=" md:basis-1/3 md:px-8 text-md flex flex-col border border-[#F8A978] bg-[#F8A978] px-16 pt-12 pb-12 text-center font-semibold text-white">
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
        
        <div className="basis-2/3 flex flex-col border border-white px-8 pt-6 pb-16 font-semibold ">
          <div className=" mb-6 text-center text-2xl text-[#BC653F] ">
            เข้าสู่ระบบ
          </div>
          <Form
            className="flex flex-col gap-y-6"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "กรุณากรอก username" }]}
            >
              <Input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="w-full rounded border p-2"
                placeholder="username ที่สมัครสมาชิก"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "กรุณากรอก password" }]}
            >
              <div className="w-full rounded border p-2">
                <input type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full "
                placeholder="รหัสผ่าน"
              />
              </div>
              
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="my-6 w-full rounded border bg-orange-500 py-1 text-white drop-shadow-md hover:bg-orange-400"
                type="primary"
              >
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
          </Form>
          <Link href="/register">
            <a className=" text-center text-xs font-semibold text-[#BC653F]">
              <div>ยังไม่ได้สมัครสมาชิก? สมัครสมาชิกได้ที่นี่</div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
