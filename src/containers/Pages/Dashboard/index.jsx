import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Divider, Row } from 'antd';
import { useHistory } from 'react-router-dom';

import style from './dashboard.module.css';

const Dashboard = () => {
  const data = useSelector(state => state.Dashboard);
  const history = useHistory();
  const redirectToCampaign = () => history.push('/campaigns');

  return (
    <div className="site-card-wrapper">
      <Divider orientation="left">Campaign History</Divider>
      <Row gutter={16}>
        <Col onClick={redirectToCampaign} lg={6} md={12} sm={12} xs={24} className={style.mr}>
          <Card
            hoverable
            title="Total Campaigns"
            bordered={false}
            style={{ background: '#42A5F6' }}
          >
            Count : {data.totalCampaigns}
          </Card>
        </Col>
        <Col lg={6} md={12} sm={12} xs={24} className={style.mr}>
          <Card title="Start Campaigns" bordered={false} style={{ background: '#7ED320' }}>
            Count : {data.totalStartCampaigns}
          </Card>
        </Col>
        <Col lg={6} md={12} sm={12} xs={24} className={style.mr}>
          <Card title="Pause Campaigns" bordered={false} style={{ background: '#FCD055' }}>
            Count : {data.totalPauseCampaigns}
          </Card>
        </Col>
        <Col lg={6} md={12} sm={12} xs={24} className={style.mr}>
          <Card title="Delete Campaigns" bordered={false} style={{ background: '#EA3C4B' }}>
            Count : {data.totalDeleteCampaigns}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
