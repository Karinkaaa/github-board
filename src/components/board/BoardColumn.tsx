import { Layout, Typography } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { ColumnType, ITask } from "../../types";
import { BoardCard } from "./BoardCard";

interface Props {
  title: ColumnType;
  tasks: ITask[];
  onLoadMore: () => void;
}

export const BoardColumn: React.FC<Props> = ({ title, tasks, onLoadMore }) => {
  return (
    <>
      <Typography.Title
        level={5}
        style={{
          marginTop: 5,
          borderRadius: 5,
          textAlign: "center",
          background: "#c0deff",
        }}
      >
        {title}
      </Typography.Title>
      <Layout
        id={`scrollable-${title}`}
        style={{
          height: "calc(100vh - 250px)",
          overflowY: "auto",
          padding: "10px 0",
          borderRadius: 5,
          background: "#d8f0ff",
        }}
      >
        <InfiniteScroll
          scrollableTarget={`scrollable-${title}`}
          dataLength={tasks.length}
          next={onLoadMore}
          hasMore={true}
          loader={null}
        >
          {tasks?.map((item) => (
            <BoardCard
              key={item.id}
              title={item.title}
              url={item.html_url}
              number={item.number}
              createdAt={item.created_at}
              assignee={item.assignee?.login}
              comments={item.comments}
            />
          ))}
        </InfiniteScroll>
      </Layout>
    </>
  );
};
