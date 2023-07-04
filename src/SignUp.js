import React, { useState } from "react";
import "./index.css";
import { CascaderProps } from "antd";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>["options"] = [
  {
    value: "part1",
    label: "부서1",
    children: [
      {
        value: "part1_1",
        label: "부서1_1",
        children: [
          {
            value: "part1_1_1",
            label: "부서1_1_1",
          },
        ],
      },
    ],
  },
  {
    value: "part2",
    label: "부서2",
    children: [
      {
        value: "part2_1",
        label: "부서2_1",
        children: [
          {
            value: "part2_1_1",
            label: "부서2_1_1",
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="010">010</Option>
        <Option value="011">011</Option>
      </Select>
    </Form.Item>
  );

  const bankNameSelector = (
    <Form.Item name="bankName" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="KB">국민</Option>
        <Option value="011">011</Option>
        <Option value="010">010</Option>
        <Option value="011">011</Option>
        <Option value="010">010</Option>
        <Option value="011">011</Option>
        <Option value="010">010</Option>
        <Option value="011">011</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["부서1", "부서1_1", "부서1_1_1"],
        prefix: "010",
        bankNameSelector: "KB"
      }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="이메일"
        rules={[
          {
            type: "email",
            message: "이메일 형식에 맞지 않습니다!",
          },
          {
            required: true,
            message: "이메일을 입력해주쉐요!",
          },
        ]}
      >
        <Space.Compact block>
          <Input style={{ width: "70%" }} />
          <Button style={{ width: "30%" }} >이메일 인증</Button>
        </Space.Compact>
      </Form.Item>

      <Form.Item  
        name="userId"
        label="아이디"
        rules={[
          {
            required: true,
            message: "아이디를 입력해주세요!",
            whitespace: true,
          },
        ]}
      >
        <Space.Compact block>
          <Input style={{ width: "70%" }} />
          <Button style={{ width: "30%" }} >중복확인</Button>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        name="password"
        label="비밀번호"
        rules={[
          {
            required: true,
            message: "비밀번호를 입력해주세요!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="비밀번호 확인"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "비밀번호를 확인해주세요!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("비밀번호가 일치하지 않습니다!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="name"
        label="이름"
        rules={[
          {
            required: true,
            message: "이름을 입력해주세요!",
            whitespace: true,
          },
        ]}
      >
        <Space.Compact block>
          <Input style={{ width: "70%" }} />
          <Select placeholder="직책 선택" style={{ width: "30%" }}>
            <Option value="A">사원</Option>
            <Option value="SA">선임</Option>
            <Option value="M">책임</Option>
            <Option value="SM">수석</Option>
            <Option value="AED">이사</Option>
          </Select>
        </Space.Compact>
      </Form.Item>


      <Form.Item
        name="phone"
        label="전화번호"
        rules={[{ required: true, message: "전화번호룰 입력해주세요!" }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="account"
        label="계좌번호"
        rules={[{ required: true, message: "계좌번호룰 입력해주세요!" }]}
      >
        <Input addonBefore={bankNameSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="residence"
        label="부서"
        rules={[
          {
            type: "array",
            required: true,
            message: "부서를 선택해주세요!",
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item>

      {/* <Form.Item
        name="donation"
        label="Donation"
        tooltip="What do you want others to call you?"
        rules={[{ required: true, message: "Please input donation amount!" }]}
      >
        <InputNumber addonAfter={suffixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="website"
        label="Website"
        rules={[{ required: true, message: "Please input website!" }]}
      >
        <AutoComplete
          options={websiteOptions}
          onChange={onWebsiteChange}
          placeholder="website"
        >
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="intro"
        label="Intro"
        rules={[{ required: true, message: "Please input Intro" }]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
        label="Captcha"
        extra="We must make sure that your are a human."
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: "Please input the captcha you got!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item> */}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
