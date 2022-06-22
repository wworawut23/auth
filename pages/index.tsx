import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message, Upload, UploadProps } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import { useQuery } from "react-query";

function Home() {
  const router = useRouter();
  const [image, setImage] = useState("");

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [prefix, setPrefix] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = "Bearer " + localStorage.getItem("access_token");
    setToken(token);

    const getProfile = async () => {
      const res = await fetch("http://localhost:3333/profile", {
        headers: {
          Authorization: token,
        },
      });
      if (res.status == 401 || res.status == 404) {
        // router.push("/login");
        return null;
      }
      const data = await res.json();

      setUsername(data.username);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setPrefix(data.prefix);
      setAge(data.age);
      setGender(data.gender);
      setImage(data.url_image);

      return true;
    };

    getProfile();
  }, []);

  const { isLoading, isError, data, error } = useQuery("getImage", async () => {
    const res = await fetch("http://localhost:3333/image", {
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();

    return data;
  });

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setLoading(false);
      alert("upload success");
    }
  };

  // console.log(data.image_file)

  if (isError) return router.push("/login");

  return (
    <div>
      <div className="sticky top-0 z-50 flex flex-row justify-between border-[#F8A978] bg-[#F8A978] p-2">
        <img className="w-10" src="/cp-foods-logo1.jpg" alt="" />
        <Button
          htmlType="submit"
          className=" rounded border bg-orange-500 px-4 font-semibold text-white drop-shadow-md hover:bg-orange-400"
          type="primary"
          onClick={() => {
            localStorage.removeItem("access_token");
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </div>
      <div className="z-10 flex h-screen flex-col bg-[#fcd7c1] px-8 sm:px-16 md:px-32 lg:px-44 xl:px-72 2xl:px-96 ">
        <div className=" relative mt-24 place-content-center rounded-xl border bg-white  p-4 drop-shadow-lg md:mt-8">
          <Form
            className="mt-16 flex flex-col gap-y-2 md:grid md:grid-flow-col md:grid-rows-3 md:gap-x-8"
            name="profile"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item className="flex flex-row justify-center">
              {isLoading ? (
                <div className="absolute -top-16 h-32 w-32 border bg-white md:relative">
                  Loading
                </div>
              ) : (
                <img
                  // src="https://static.remove.bg/remove-bg-web/eb1bb48845c5007c3ec8d72ce7972fc8b76733b1/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
                  src={image}
                  // src={`data:image/${data.image_type};base64,${data.image_file}`}
                  alt=""
                  className="absolute -top-16 left-1/3 h-32 w-32 rounded-lg border bg-white drop-shadow-lg md:relative md:left-0"
                />
              )}
            </Form.Item>
            <Form.Item
              label="Username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                className="w-full rounded border px-2 "
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input
                className="w-full rounded border px-2 "
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input
                className="w-full rounded border px-2 "
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Prefix"
              rules={[{ required: true, message: "Please input your prefix!" }]}
            >
              <Input
                className="w-full rounded border px-2 "
                value={prefix}
                onChange={(e) => {
                  setPrefix(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Age "
              rules={[{ required: true, message: "Please input your age!" }]}
            >
              <Input
                className="w-full rounded border px-2 "
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Gender"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                className="w-full rounded border px-2 "
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
            </Form.Item>
          </Form>

          <div className=" mt-4 md:absolute md:bottom-2 ">
            <Upload
              showUploadList={false}
              action="http://localhost:3333/upload"
              headers={{ authorization: token }}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              <Button
                className="flex flex-row justify-center rounded border bg-orange-500 px-4 font-semibold text-white drop-shadow-md hover:bg-orange-400"
                icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
              >
                <span>Click to Upload</span>
              </Button>
            </Upload>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    alert("You can only upload JPG/PNG file!");
  }

  return isJpgOrPng;
};

