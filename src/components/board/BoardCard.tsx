import { Card, Space, Typography } from "antd";
import Link from "antd/es/typography/Link";
import React from "react";
import { getDateDifference } from "../../helpers";

interface Props {
  title: string;
  url: string;
  number: number;
  createdAt: Date;
  assignee: string;
  comments: number;
}

export const BoardCard: React.FC<Props> = ({
  title,
  url,
  number,
  createdAt,
  assignee,
  comments,
}) => {
  const difference = getDateDifference(new Date(), createdAt);

  return (
    <Link href={url} target="_blank">
      <Card
        title={<span style={{ whiteSpace: "break-spaces" }}>{title}</span>}
        size="small"
        hoverable
        style={{
          width: "calc(100% - 50px)",
          margin: "10px 25px",
          padding: "5px 10px 0",
          borderRadius: 25,
          boxShadow: "0 0 3px #1677ff",
          background: "aliceblue",
        }}
      >
        <Space direction="vertical">
          <Typography.Text type="secondary">
            #{number} opened {difference}
          </Typography.Text>
          <Typography.Text type="secondary">
            {assignee ? `${assignee} | ` : ""} Comments: {comments}
          </Typography.Text>
        </Space>
      </Card>
    </Link>
  );
};
