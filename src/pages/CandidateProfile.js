import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Table, Header, Button, Icon } from "semantic-ui-react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import CandidateService from "../services/candidateService";
import UpdateImage from "./popups/UpdateImage";
import UptadeGithub from "./popups/UptadeGithub";
import UpdateLinkedin from "./popups/UpdateLinkedin";
import UpdateLanguage from "./popups/UpdateLanguage";
import UpdateSchools from "./popups/updateSchools";
import UpdateTechnology from "./popups/UpdateSkill";

export default function CandidateProfile() {
//authItem[0].user
  const {authItem} = useSelector((state) => state.auth)

  let { id } = useParams();

  let [cv, setCv] = useState({});

  let candidateService = new CandidateService();
  useEffect(() => { 
    let candidateService = new CandidateService();   
    candidateService.getCvId(authItem[0].user.id).then((result) => setCv(result.data.data)).then(console.log(cv));
    console.log(authItem[0].user.id);
  }, [id]);

  

  const handleGithubDelete = (cvId) => {
    candidateService.deleteGithub(cvId).then((result) => {
      toast.success(result.data.message)
      updateCvValues();
    }).catch((result) => {
      toast.error(result.response.data.message)
    })
  }

  const handleLinkedinDelete = (cvId) => {
    candidateService.deleteLinkedin(cvId).then((result) => {
      toast.success(result.data.message)
      updateCvValues();
    }).catch((result) => {
      alert(result.response.data.message)
      toast.error(result.response.data.message)
    })
  }

  const updateCvValues = () => {
    candidateService.getCvId(authItem[0].user.id).then((result) => {
      setCv(result.data.data)
    })
  }

  return (
    <div>
      <Card.Group>
        <Card fluid color={"black"}>
          <Card.Content>
            {cv.images?.map((image) => (
              <Image
                floated="left"
                size="small"
                src={image?.imageUrl}
                circular
                key={image?.id}
              />
            ))}
            {<Popup trigger={<button className="ui button">Resim Yükle</button>} modal>
                            <UpdateImage cvId={authItem[0].user.id} updateCvValues={updateCvValues} />
                          </Popup>}

            <Card.Header style={{marginTop:"0.3em"}}>
              {cv.first_name + " " + cv.last_name}
            </Card.Header>
            <Card.Meta>
              <strong>{cv.biography}</strong>
            </Card.Meta>
            <Card.Description>
              <Table celled color={"black"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Kullanıcı</Table.HeaderCell>
                    <Table.HeaderCell>Bilgiler</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Ad</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.first_name}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Soyad</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.last_name}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Doğum Tarihi</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.birth_date}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Email</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.candidate?.email}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={cv.githubAccount}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button secondary disabled={!cv.githubAccount}>
                              <Icon name="github" /> Github
                            </Button>
                          </a>
                          { <Popup trigger={<button className="ui button"> Güncelle </button>} modal>
                            <UptadeGithub id={authItem[0].user.id} updateCvValues={updateCvValues} />
                          </Popup>}
                          <Button color="red" circular icon="x" onClick={() => handleGithubDelete(authItem[0].user.id)} disabled={!cv.githubAccount}>
                            </Button>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.githubAccount}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={cv.linkedInAccount}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button color="linkedin" disabled={!cv.linkedin}>
                              <Icon name="linkedin" /> LinkedIn
                            </Button>
                          </a>
                          {<Popup trigger={<button className="ui button"> Güncelle </button>} modal>
                            <UpdateLinkedin cvId={cv.id} updateCvValues={updateCvValues} />
                          </Popup>}
                          {<Button color="red" icon="x" circular disabled={!cv.linkedInAccount} onClick={() => handleLinkedinDelete(cv.id)}>
                            </Button>}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.linkedInAccount}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Description>
          </Card.Content>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>
      
      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
          Okuduğu Okullar
          {<Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Güncelle </button>} modal>
                            <UpdateSchools cvId={authItem[0].user.id} updateCvValues={updateCvValues}/>
                          </Popup>}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Devam</Table.HeaderCell>
              
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.schools?.map((school) => (
              <Table.Row key={school.id}>
                <Table.Cell>{school.schoolName}</Table.Cell>
                <Table.Cell>{school.iscontinued ? "Devam Ediyor":"Bitmiş"}</Table.Cell>

              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      

      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
            Yabancı Diller
            {  <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Güncelle </button>} modal>
                            <UpdateLanguage cvId={authItem[0].user.id} updateCvValues={updateCvValues}/>
                          </Popup>}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Dil Adı</Table.HeaderCell>
              <Table.HeaderCell>Seviye min:1 max:5</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.languages?.map((language) => (
              <Table.Row key={language.id}>
                <Table.Cell>{language.languageName}</Table.Cell>
                <Table.Cell>{language.languageLevel}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
          Yazılım Teknolojileri
          { <Popup trigger={<button className="ui button" style={{marginLeft:"1em"}}> Güncelle </button>} modal>
                            <UpdateTechnology cvId={authItem[0].user.id} updateCvValues={updateCvValues} />
                          </Popup>}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Teknoloji Adı</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.candidateSkills?.map((technology) => (
              <Table.Row key={technology.id}>
                <Table.Cell>{technology.skillName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}