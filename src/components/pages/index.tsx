import { Col, Empty, Layout, Row, Space } from "antd";
import React from "react";
import { useAppSelector } from "../../hooks";
import { useGetRepoInfoQuery } from "../../redux/api";
import { Board } from "../board";
import { RepoForm } from "../form";
import { Info } from "../info";
import { Loader } from "../loader";

export const MainPage: React.FC = () => {
  const url = useAppSelector((state) => state.repo.url);
  const cachedURL = sessionStorage.getItem("URL") || "";

  const {
    data: repoInfo,
    isLoading,
    isFetching,
    isError,
  } = useGetRepoInfoQuery(url || cachedURL, {
    skip: !url && !cachedURL,
  });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <Layout
      style={{
        margin: "auto",
        background: "white",
        maxWidth: 1250,
        maxHeight: 1250,
        height: "100vh",
      }}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ display: "flex", margin: "50px 25px" }}
      >
        <Row>
          <Col span={24}>
            <RepoForm />
          </Col>
        </Row>
        {!isError && repoInfo ? (
          <>
            <Row>
              <Col span={23}>
                <Info
                  ownerName={repoInfo.owner.login}
                  ownerUrl={repoInfo.owner.html_url}
                  name={repoInfo.name}
                  url={repoInfo.html_url}
                  stars={repoInfo.stargazers_count}
                />
              </Col>
            </Row>
            <Board url={url || cachedURL} />
          </>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <p style={{ color: isError ? "red" : "inherit" }}>
                <>
                  {isError
                    ? "Github account or repository not found"
                    : "No data"}
                </>
              </p>
            }
          />
        )}
      </Space>
    </Layout>
  );
};
