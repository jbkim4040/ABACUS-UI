import React from "react";
import "./index.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const LogIn = () => {
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      name="normal_login"
      className="login-form"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "아이디를 입력해주세요!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="아이디"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="비밀번호"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          비밀번호 찾기
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          로그인
        </Button>
        Or <a href="">회원가입</a>
      </Form.Item>
    </Form>
  );
};

export default LogIn;
