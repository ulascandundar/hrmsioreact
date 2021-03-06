import React, { useState } from "react";
import { Icon, Menu, Dropdown, Input } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const history = useHistory();

  const {authItem} = useSelector(state => state.auth)
  function handleSignOut() {
    setIsAuthenticated(false);
    history.push("/");
  }

  function handleSignIn() {
    setIsAuthenticated(true);
  }

  const options = [
    { key: 1, text: "İş Verenler", icon: "user", as: NavLink, to: "/employers" },
    { key: 2, text: "İş İlanları", icon: "bullhorn", as: NavLink, to: "/jobAdvertisements" },
    { key: 3, text: "İş Pozisyonları", icon: "list alternate outline", as: NavLink, to: "/jobPositions"},
  ];

  const options2 = [
    { key: 1, text: "Adaylar", icon: "user", as: NavLink, to: "/candidates"},
    { key: 2, text: "Aday CV leri", icon: "file alternate", as: NavLink, to: "/candidateCvs"},
  ]

  const options3 = [
    { key: 1, text: "İş İlanı Onaylanması", icon: "clipboard check", as: NavLink, to: "/jobAdvertisementConfirm"},
    { key: 2, text: "Çalışanlar", icon: "user circle", as: NavLink, to: "/employees"},
    { key: 3, text: "Personel Profili Güncellenmesi", icon: "edit", as: NavLink, to: "/employeeUpdate"},
  ]

  return (
    <div>
      <Menu inverted fixed="top" size="large" color="violet">
     
          <Menu.Item name="user md" >
            <Icon name="user md" size="large" />
            Human Resource Management System
          </Menu.Item>

          <Menu.Item style={{margin:"0.5em"}} as={NavLink} to="/" name="home">
            <Icon name="home" /> Home
          </Menu.Item>

          <Dropdown trigger={<span><Icon name='building'/> Şirketler</span>}  
          style={{ margin: "0.5em" }} item direction="left" options={options} />

          <Dropdown trigger={<span><Icon name='user'/> Adaylar</span>}  
          style={{ margin: "0.5em", marginLeft: "-0.6em"}} item direction="left" options={options2} />

          <Menu.Item>
            <Input className='icon' icon='search' placeholder='Search...' />
          </Menu.Item>

          <Menu.Item position='right'>
            <Input
              style={{ marginLeft: "-0.5em"}}
              action={{ type: 'submit', content: 'Go' }}
              placeholder='Navigate to...'
            />
          </Menu.Item>

          <Menu.Item
            position="right"
            as={NavLink}
            to="/jobAdvertisementPost"
            name="user plus"
            style={{ margin: "0.5em" }}
          >
            <Icon name="user plus" />  İş İlanı Ekle
          </Menu.Item>
          
          <Menu.Menu style={{ margin: "0.5em" }}>
          {authItem[0].loggedIn?<SignedIn/>:<SignedOut/>}
          </Menu.Menu>

          
    
      </Menu>
    </div>
  );
}
//<Dropdown trigger={<span><Icon name='key'/> Admin</span>}  style={{ margin: "0.5em" }} item direction="left" options={options3} />