import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Dropdown, Menu, Icon,Image  } from "semantic-ui-react";
import { userLogout } from "../store/actions/authActions";
import ImageService from "../services/imageService";
export default function SingedIn() {
  const { authItem } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let [images, setImages] = useState([]);
  let [image, setImage] = useState([]);
  
  useEffect(() => {
    let imageService = new ImageService();
    imageService.getById(authItem[0].user.id).then((result) => {
      setImages(result.data.data);
    }).then(console.log(images));
  },[])

  const history = useHistory();
  let imageService= new ImageService(); 

  const handleLogout = (user) => {
    dispatch(userLogout(user));
    history.push("/");

  };
  return (
    <div>
      <Menu.Item>
        <Image
          avatar
          spaced="right"
          src={authItem[0].user.imageLink}
        />
        <Dropdown pointing="top right" text={authItem[0].user.name}>
          <Dropdown.Menu>
            {authItem[0].user.userType === 1 && (
              <Dropdown.Item as={Link} to={`/cvs/${authItem[0].user.id}`}>
                <Icon name="cloud upload" />
                Cv ni Güncelle
              </Dropdown.Item>
              
            )}

            {authItem[0].user.userType === 1 && (
              <Dropdown.Item as={Link} to={`/cprofile`}>
                <Icon name="cloud upload" />
                Profil
              </Dropdown.Item>
              
            )}

            {authItem[0].user.userType === 2 && (
              <Dropdown.Item as={Link} to={`/employerupdate`}>
                <Icon name="cloud upload" />
                Şirket Bilgilerini Güncelle
              </Dropdown.Item>
            )}
            {authItem[0].user.userType === 3 && (
              <Dropdown.Item as={Link} to={"/jobAdvertisementConfirm"}>
                <Icon name="cloud upload" />
                İş İlanı Onaylanması
              </Dropdown.Item>
            )}
            {authItem[0].user.userType === 3 && (
              <Dropdown.Item as={Link} to={"/employerupdateconfirm"}>
                <Icon name="cloud upload" />
                Şirket Profil Güncellenmesi Onayı
              </Dropdown.Item>
            )}
            
            <Dropdown.Item onClick={() => handleLogout(authItem[0].user)}>
              <Icon name="sign-out" /> Çıkış yap
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}

//{authItem[0].user.name}>
