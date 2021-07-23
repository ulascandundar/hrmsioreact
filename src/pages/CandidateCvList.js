import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Image, Table, Button, Icon } from "semantic-ui-react";
import CandidateService from "../services/candidateService";

export default function CandidateCvList() {

  const [cvs, setCvs] = useState([]);
  
  useEffect(() => {
    let candidateService = new CandidateService();
    candidateService.getCv().then((result) => setCvs(result.data.data));
  }, []);

  return (
    <div>
       <Header as="h2">
        <Icon name="file alternate" />
        <Header.Content>Candidate Resumes</Header.Content>
      </Header>
      <Table celled color={"violet"}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>İsim</Table.HeaderCell>
            <Table.HeaderCell>Yetenekler</Table.HeaderCell>
            <Table.HeaderCell>Languages</Table.HeaderCell>
            <Table.HeaderCell>Github</Table.HeaderCell>
            <Table.HeaderCell>Linkedin</Table.HeaderCell>
            <Table.HeaderCell>Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cvs.map((cv) => (
            <Table.Row key={cv.id}>
              <Table.Cell>
                <Header as="h4" image>
                
                  <Header.Content>
                    {cv.first_name + " " + cv.last_name}
                    <Header.Subheader>
                      {cv.birth_date}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
              {cv.candidateSkills.map((candidateSkills) => (
                  <p>{candidateSkills.skillName}</p>
                ))}
              </Table.Cell>

              <Table.Cell>
                {cv.languages.map((lang) => (
                  <p key={lang?.id}>{lang?.languageName + " Level: " + lang?.languageLevel}</p>
                ))}
              </Table.Cell>

              <Table.Cell>
                <a href={cv.githubAccount} target={"_blank"} rel="noreferrer">
                  <Button secondary>
                    <Icon name="github" /> Github
                  </Button>
                </a>
              </Table.Cell>

              <Table.Cell>
                <a href={cv.linkedInAccount} target={"_blank"} rel="noreferrer">
                  <Button color="linkedin">
                    <Icon name="linkedin" /> Linked.in
                  </Button>
                </a>
              </Table.Cell>

              <Table.Cell>
                <Button color="violet" animated as={Link} to={`/candidateCvs/${cv.id}`}>
                  <Button.Content visible>Show</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}