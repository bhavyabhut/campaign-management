import React from 'react';
import { Button, Select, Modal, Card, Row, Col, Switch, Tooltip, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import actions from '../../../redux/campaign/actions';
import AddCampaignModal from './Add';
import EditCampaignModal from './Edit';
import tagColor from '../../../constants/colors';
import { timeDifference } from '../../../utility/helpers/general';

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
    <React.Fragment>
      <div>
        <Button onClick={() => toggleAddModal(true)} type="primary">
          Add Campaign
        </Button>
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
        <span>Filter by campaign status</span>
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
                title={`Campaign Name: ${data.campaign_name}`}
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
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="custom-label">Creator Name: </span>
                  <span>{data.creator_name}</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="custom-label">Status: </span>
                  <span>{data.status === 1 ? 'Start' : 'Paused'}</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="custom-label">Tags: </span>
                  {data.tags &&
                    data.tags.map(tagData => {
                      const num = tagData.charCodeAt(0) + tagData.charCodeAt(tagData.length - 1);
                      return (
                        <Tag style={{ color: 'black' }} color={tagColor[num % 11]}>
                          {tagData}
                        </Tag>
                      );
                    })}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="custom-label">Created Time: </span>
                  <span>{timeDifference(data.created_at)}</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="custom-label">Created At: </span>
                  <span>{data.created_at}</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="custom-label">Updated Time: </span>
                  <span>{timeDifference(data.updated_at)}</span>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span className="custom-label">Updated At: </span>
                  <span>{data.updated_at}</span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        'No Data'
      )}
    </React.Fragment>
  );
};

export default Campaign;
