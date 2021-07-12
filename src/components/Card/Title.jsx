import React from 'react';
import PropTypes from 'prop-types';
import style from './content.module.css';

const Title = ({ campaign_name }) => (
  <div className={style.mrb}>
    <span className={style.customLabel}>Creator Name: </span>
    <span>{campaign_name}</span>
  </div>
);

Title.propTypes = {
  campaign_name: PropTypes.string.isRequired,
};

export default Title;
