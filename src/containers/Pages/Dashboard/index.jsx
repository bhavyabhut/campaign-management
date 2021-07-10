import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Divider, Row } from 'antd';

const Dashboard = () => {
  const data = useSelector(state => state.Dashboard);
  return (
    <div className="site-card-wrapper">
      <Divider orientation="left">Campaign History</Divider>
      <Row gutter={16}>
        <Col lg={6} md={12} sm={12} xs={24} style={{ marginBottom: '16px' }}>
          <Card title="Total Campaigns" bordered={false}>
            {data.totalCampaigns}
          </Card>
        </Col>
        <Col lg={6} md={12} sm={12} xs={24} style={{ marginBottom: '16px' }}>
          <Card title="Start Campaigns" bordered={false}>
            {data.totalStartCampaigns}
          </Card>
        </Col>
        <Col lg={6} md={12} sm={12} xs={24} style={{ marginBottom: '16px' }}>
          <Card title="Pause Campaigns" bordered={false}>
            {data.totalPauseCampaigns}
          </Card>
        </Col>
        <Col lg={6} md={12} sm={12} xs={24} style={{ marginBottom: '16px' }}>
          <Card title="Delete Campaigns" bordered={false}>
            {data.totalDeleteCampaigns}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
