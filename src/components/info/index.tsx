import { StarFilled } from "@ant-design/icons";
import { Space, Typography } from "antd";
import React from "react";
import { getStarsCount } from "../../helpers";

interface Props {
  ownerName: string;
  ownerUrl: string;
  name: string;
  url: string;
  stars: number;
}

export const Info: React.FC<Props> = ({
  ownerName,
  ownerUrl,
  name,
  url,
  stars,
}) => {
  const starsCount = getStarsCount(stars);

  return (
    <Space size="large">
      <Typography.Text>
        <Typography.Link href={ownerUrl} target="_blank">
          {ownerName}
        </Typography.Link>
        <Typography.Text type="secondary">{" > "}</Typography.Text>
        <Typography.Link href={url} target="_blank">
          {name}
        </Typography.Link>
      </Typography.Text>
      <Typography.Text strong>
        <StarFilled style={{ color: "orange" }} />
        &nbsp;{starsCount} stars
      </Typography.Text>
    </Space>
  );
};
