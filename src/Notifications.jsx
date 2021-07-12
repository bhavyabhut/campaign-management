import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notification } from 'antd';
import actions from './redux/app/actions';

const Notification = () => {
  const { type, showNotification, message } = useSelector(state => state.App);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showNotification) {
      notification[type]({
        message: type,
        description: message,
      });
      dispatch(actions.showNotificationSuccess());
    }
  }, [showNotification]);
  return <></>;
};

export default Notification;
