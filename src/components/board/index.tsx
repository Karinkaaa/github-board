import { Col, Row } from "antd";
import { useTasks } from "../../hooks";
import { COLUMNS, ColumnType } from "../../types";
import { BoardColumn } from "./BoardColumn";

interface Props {
  url: string;
}

export const Board: React.FC<Props> = ({ url }) => {
  const { tasks, loadMore } = useTasks(url);

  return (
    <Row gutter={50} style={{ textAlign: "start" }}>
      {Object.keys(COLUMNS).map((columnKey, index) => (
        <Col key={columnKey} span={8}>
          <BoardColumn
            title={COLUMNS[columnKey as ColumnType]}
            tasks={tasks[index]}
            onLoadMore={() => loadMore(index)}
          />
        </Col>
      ))}
    </Row>
  );
};
