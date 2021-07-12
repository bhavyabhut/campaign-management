import React from 'react';
import { Link } from 'react-router-dom';
import style from './NoPage.module.css';
import { ReactComponent as Logo } from '../../../assets/images/undraw_page_not_found_su7k.svg';

export default function NoPage() {
  return (
    <div className={style.noPage}>
      <Logo className={style.noPageLogo} />
      <span>
        Go back to <Link to="/admin">dashboard</Link>{' '}
      </span>
    </div>
  );
}
