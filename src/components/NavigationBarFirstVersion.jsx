// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBars } from 'react-icons/fa';
// import { AiOutlineClose } from 'react-icons/ai';
// import { SideBarData } from './SideBarData';
// //import '../styles/Navbar.css';

// const NavigationBarFirstVersion = (props) => {
//     const [sidebar, setSidebar] = useState(false);

//     const showSidebar = () => {
//         setSidebar(!sidebar);
//         console.log(sidebar)
//     };
//     return (
//         <>
//             <div className="navbar">
//                 <Link to="#" className="menu-bars">
//                     <FaBars onClick={showSidebar} />
//                 </Link>
//             </div>
//             <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//                 <ul className="nav-menu-items" onClick={showSidebar}>
//                     <li className="navbar-toggle">
//                         <Link to="#" className="menu-bars">
//                             <AiOutlineClose />
//                         </Link>
//                     </li>
//                     {SideBarData.map((menuOption, index) => {
//                         return (
//                             <li key={index} className={menuOption.className}>
//                                 <Link to={menuOption.path}>
//                                     {menuOption.icon}
//                                     <span>{menuOption.title}</span>
//                                 </Link>
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </nav>
//         </>
//     );
// };

// export default NavigationBarFirstVersion;
