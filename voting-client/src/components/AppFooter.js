import React from 'react';
import { Link } from 'react-router-dom';








const AppFooter =()=>(

<div className='app-footer'>
<div id='footer-company' className='app-footer-text'><Link id='pollzter-footer-link' to='/'>Pollzter.com</Link></div> <div id='footer-viz' className='app-footer-text'><a href='http://independentviz.com/' id='app-footer-indViz'>Independentviz.com LLC</a></div>
</div>


)


export default AppFooter;
