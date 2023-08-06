import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { useAppDispatch } from "../../hooks";
import { repoActions } from "../../redux/slice";

export const RepoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinish = () => {
    const value = form.getFieldValue("URL");
    dispatch(repoActions.setRepoUrl(value));
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="inline"
      autoComplete="off"
      onFinish={onFinish}
      style={{ flexWrap: "nowrap" }}
    >
      <Form.Item
        name="URL"
        rules={[
          { required: true },
          {
            pattern: /^https:\/\/github\.com(?:\/[^\s/]+){2}$/,
            message: "Incorrect URL",
          },
        ]}
        style={{ width: "calc(100% - 134px" }}
      >
        <Input
          size="large"
          placeholder="Enter repo URL"
          allowClear={{ clearIcon: <CloseOutlined /> }}
        />
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit" block>
          Load issues
        </Button>
      </Form.Item>
    </Form>
  );
};
