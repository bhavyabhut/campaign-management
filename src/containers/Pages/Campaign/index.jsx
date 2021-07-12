import React from 'react';
import { Button, Select, Modal, Card, Row, Col, Switch, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import actions from '../../../redux/campaign/actions';
import AddCampaignModal from './Add';
import EditCampaignModal from './Edit';
import Content from '../../../components/Card/Content';
import NoData from '../../../components/NoData';
import Title from '../../../components/Card/Title';

const { updateModal, addModal, deleteModal, deleteData, changeStatus } = actions;
const { Option } = Select;

const Campaign = () => {
  const state = useSelector(redux => redux.Campaign);
  const { showAddModal, showEditModal, showDeleteModal, deleteEleId, allData, selectedStatus } =
    state;
  let selectedCampaignData = [];

  const dispatch = useDispatch();

  const toggleEditModal = (bool, data = null) => dispatch(updateModal(bool, data));

  const toggleAddModal = bool => dispatch(addModal(bool));

  const toggleDeleteModal = (bool, id) => dispatch(deleteModal(bool, id));

  const deleteEle = () => dispatch(deleteData(deleteEleId));

  const changeStatusCall = (id, value) => dispatch(changeStatus({ id, value }));

  if (selectedStatus === 0) selectedCampaignData = allData;
  else selectedCampaignData = allData.filter(data => data.status === selectedStatus);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Button onClick={() => toggleAddModal(true)} type="primary">
          Add Campaign
        </Button>
        <Tooltip title="Filter by campaign status">
          <Select
            onChange={e => dispatch(actions.changeFilter(e))}
            defaultValue={0}
            style={{ marginLeft: '2rem', width: '200px' }}
          >
            <Option style={{ fontWeight: '600' }} value={0}>
              All
            </Option>
            <Option style={{ fontWeight: '600', color: '#00CED1' }} value={1}>
              Start
            </Option>
            <Option style={{ fontWeight: '600', color: '#509e2f' }} value={2}>
              Pause
            </Option>
          </Select>
        </Tooltip>
      </div>
      {showAddModal && <AddCampaignModal closeAddModal={() => toggleAddModal(false)} />}
      {showEditModal && <EditCampaignModal closeEditModal={() => toggleEditModal(false)} />}
      {showDeleteModal && (
        <Modal
          title="Delete Campaign"
          visible={showDeleteModal}
          onCancel={() => toggleDeleteModal(false, null)}
          footer={[
            <Button onClick={() => toggleDeleteModal(false, null)}>No</Button>,
            <Button onClick={deleteEle}>Yes</Button>,
          ]}
        >
          Are you sure you want to delete this campaign ?
        </Modal>
      )}
      {selectedCampaignData && selectedCampaignData.length > 0 ? (
        <Row gutter={12}>
          {selectedCampaignData.map(data => (
            <Col lg={8} md={12} sm={12} xs={24} style={{ margin: '16px 0' }}>
              <Card
                hoverable
                title={<Title campaign_name={data.campaign_name} />}
                actions={[
                  <Tooltip title="Toggle Start/Pause">
                    <Switch
                      onChange={() => {
                        let value = 1;
                        if (data.status === 1) value = 2;
                        changeStatusCall(data.id, value);
                      }}
                      checked={data.status === 1}
                    />
                  </Tooltip>,
                  <EditOutlined onClick={() => toggleEditModal(true, data)} key="edit" />,
                  <DeleteOutlined onClick={() => toggleDeleteModal(true, data.id)} key="delete" />,
                ]}
              >
                <Content data={data} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default Campaign;
