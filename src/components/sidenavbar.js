import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { get, ref, onValue } from 'firebase/database';
import { database, auth } from '../firebase';
import { FaHome, FaUser, FaLaptopCode, FaLanguage, FaChartLine,FaBars, FaRobot, FaBox } from 'react-icons/fa';
import { Link,useNavigate,Outlet } from 'react-router-dom';

const SideNavScreen = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to manage sidebar visibility
  const nav= useNavigate()

  const fetch = () => {
    const ref1 = ref(database, "users/" + auth.currentUser.uid);
    onValue(ref1, (snap) => {
      const data = snap.val();
      setFirstName(data.FirstName);
      setLastName(data.LastName);
      setEmail(data.Email);
    });
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
   
      <div className={`absolute top-0 left-0 w-200 h-full z-10 mt-20  block background-transparent`}>
        <Sidebar className="  h-full flex flex-col mcd  " defaultCollapsed={true} collapsed={sidebarOpen} rootStyles={{ [`.${sidebarClasses.container}`]: { backgroundColor: 'transparent',scrollbarWidth:'none',  } }}>
          {/* <div>
            <div>
              <img
                src={props.image}
                className="items-center borderc"
                alt="Profile Picture"
              />
            </div>
            <div className='txt'>Welcome, </div>
            <div className='txt2'>{`${firstName} ${lastName}`}</div>
          </div> */}
         


          <Menu className='   mcd' menuItemStyles={{ button: { marginTop: "2px", overflowX:'hidden',scrollbarWidth:'none', '&:hover': { backgroundColor: 'transparent', fontSize: '1.1rem', } } }}>
          <MenuItem   
          className="text-left ml-2"  
          onClick={toggleSidebar}
          icon={<FaBars style={{width:25,height:25}} className="hover:opacity-50"/>}> 
          Menu
          </MenuItem>
            <MenuItem   className="text-left ml-2" component={<Link to="/home/main"/>} icon={<FaHome style={{width:25,height:25}} className="hover:opacity-50"/> }  >Home</MenuItem>
           
            <MenuItem  className="text-left ml-2" component={<Link to="/home/cv"/>} icon={<FaLaptopCode style={{width:25,height:25}} className='hover:opacity-50'/>}  >Computer Vision</MenuItem>
            <MenuItem  className="text-left ml-2" icon={<FaRobot style={{width:25,height:25}} className='hover:opacity-50'/>}  >Generative AI</MenuItem>
            <MenuItem  className="text-left ml-2" icon={<FaLanguage style={{width:25,height:25}} className="hover:opacity-50"/>}   >NLP</MenuItem>
            <MenuItem className="text-left ml-2" icon={<FaChartLine style={{width:25,height:25}} className="hover:opacity-50"/>}   >Prediction Models</MenuItem>
            <MenuItem  className="text-left ml-2" icon={<FaBox style={{width:25,height:25}} className='hover:opacity-50'/>}  >Contribute Model</MenuItem>
            <MenuItem className="text-left ml-2  flex" style={{  marginTop:230}} component={<Link to="/home/profile"/>}  icon={<img style={{width:70,height:70  , borderRadius:200}} src={props.image} className="borderc hover:opacity-50"/>}   ><div className='flex flex-col'>  <div>{firstName + " " + lastName}</div> <div>{email}</div>  </div></MenuItem>
            
          </Menu>
          
 
          
      
        </Sidebar>
        
      </div>
       
  );
};

export default SideNavScreen;
