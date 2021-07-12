import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Input, Button, Form, Select } from 'antd';
import PropTypes from 'prop-types';
import actions from '../../../redux/campaign/actions';

const { changeFields, addData } = actions;

const AddCampaignModal = ({ closeAddModal }) => {
  const state = useSelector(redux => redux.Campaign);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { loader, showAddModal, fields } = state;

  const handleChange = (field, e) => {
    const newFields = { ...state.fields };
    if (field === 'tags') {
      newFields[field] = e;
      dispatch(changeFields(newFields));
      return;
    }
    if (e.target.value.trim() === '') {
      newFields[field] = '';
    } else {
      newFields[field] = e.target.value;
    }
    dispatch(changeFields(newFields));
  };

  const onSubmit = () =>
    form
      .validateFields()
      .then(data => dispatch(addData(data)))
      .catch(e => console.log('Validation Error', e));

  return (
    <Modal
      title="Add Campaign"
      visible={showAddModal}
      confirmLoading={loader}
      onCancel={closeAddModal}
      footer={[
        <Button onClick={closeAddModal}>Cancel</Button>,
        <Button loading={loader} onClick={onSubmit}>
          Add
        </Button>,
      ]}
    >
      <Form form={form} name="control-hooks">
        <Form.Item
          name="campaign_name"
          label="Campaign Name"
          rules={[{ required: true, message: 'Campaign name is required.' }]}
        >
          <Input
            placeholder="Campaign Name"
            onChange={e => handleChange('campaign_name', e)}
            value={fields.campaign_name}
          />
        </Form.Item>
        <Form.Item
          name="creator_name"
          label="Creator Name"
          rules={[{ required: true, message: 'Creator name is required.' }]}
        >
          <Input
            placeholder="Creator Name"
            onChange={e => handleChange('creator_name', e)}
            value={fields.creator_name}
          />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Select
            mode="tags"
            dropdownStyle={{ display: 'none' }}
            placeholder="Best,Awesome"
            onChange={e => handleChange('tags', e)}
            value={fields.tags}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
AddCampaignModal.propTypes = {
  closeAddModal: PropTypes.func.isRequired,
};
export default AddCampaignModal;
