import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

import style from './content.module.css';
import tagColor from '../../constants/colors';
import { timeDifference } from '../../utility/helpers/general';

const Content = ({ data }) => (
  <>
    <div className={style.mrb}>
      <span className={style.customLabel}>Creator Name: </span>
      <span>{data.creator_name}</span>
    </div>
    <div className={style.mrb}>
      <span className={style.customLabel}>Status: </span>
      <span style={{ color: `${data.status === 1 ? 'green' : 'yellow'}` }}>
        {data.status === 1 ? 'Start' : 'Paused'}
      </span>
    </div>
    <div className={style.mrb}>
      <span className={style.customLabel}>Tags: </span>
      {data.tags &&
        data.tags.map(tagData => {
          const num = tagData.charCodeAt(0) + tagData.charCodeAt(tagData.length - 1);
          return (
            <Tag key={tagData} style={{ color: 'black' }} color={tagColor[num % 11]}>
              {tagData}
            </Tag>
          );
        })}
    </div>
    <div className={style.mrb}>
      <span className={style.customLabel}>Created Time: </span>
      <span>{timeDifference(data.created_at)}</span>
    </div>
    <div className={style.mrb}>
      <span className={style.customLabel}>Created At: </span>
      <span>{data.created_at}</span>
    </div>
    <div className={style.mrb}>
      <span className={style.customLabel}>Updated Time: </span>
      <span>{timeDifference(data.updated_at)}</span>
    </div>
    <div className={style.mrb}>
      <span className={style.customLabel}>Updated At: </span>
      <span>{data.updated_at}</span>
    </div>
  </>
);

Content.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Content;
