import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Input, Button, Form, Select } from 'antd';
import PropTypes from 'prop-types';

import actions from '../../../redux/campaign/actions';

const { changeFields, updateData } = actions;

const EditCampaignModal = ({ closeEditModal }) => {
  const state = useSelector(redux => redux.Campaign);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { loader, showEditModal, fields } = state;

  const onSubmit = () =>
    form
      .validateFields()
      .then(() => dispatch(updateData({ ...fields })))
      .catch(e => e);

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

  useEffect(() => {
    form.setFieldsValue({
      campaign_name: fields.campaign_name,
      creator_name: fields.creator_name,
      tags: fields.tags,
    });
  }, [showEditModal]);

  return (
    <div>
      <Modal
        title="Edit Campaign"
        visible={showEditModal}
        onCancel={closeEditModal}
        confirmLoading={loader}
        footer={[
          <Button onClick={closeEditModal}>Cancel</Button>,
          <Button loading={loader} onClick={onSubmit}>
            Update
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
              name="campaign_name"
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
              name="creator_name"
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
    </div>
  );
};

EditCampaignModal.propTypes = {
  closeEditModal: PropTypes.func.isRequired,
};

export default EditCampaignModal;
