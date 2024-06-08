import React from "react";
import {
  ActivityLogContainer,
  SectionTitle,
  LogList,
  LogItem,
} from "../styles";
import { mockActivityLog } from "../mockData";

const ActivityLog = () => {
  return (
    <ActivityLogContainer>
      <SectionTitle>Activity Log</SectionTitle>
      <LogList>
        {mockActivityLog.map((log, index) => (
          <LogItem key={index}>
            {`${new Date(log.timestamp).toLocaleString()}: ${log.message}`}
          </LogItem>
        ))}
      </LogList>
    </ActivityLogContainer>
  );
};

export default ActivityLog;
