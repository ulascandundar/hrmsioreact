import React, { useState, useEffect } from "react";
import { Table, Header, Icon } from "semantic-ui-react";
import CandidateService from "../services/candidateService";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    let candidateService = new CandidateService();
    candidateService
      .getCandidates()
      .then((result) => setCandidates(result.data.data));
  }, []);

  return (
    <div>
      <Header as="h2">
        <Icon name="list alternate outline" />
        <Header.Content>Candidates</Header.Content>
      </Header>
      <Table color="violet">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>E-mail</Table.HeaderCell>
            {/* <Table.HeaderCell>CV</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {candidates.map((candidate) => (
            <Table.Row key={candidate.id}>
              <Table.Cell>{candidate.first_name}</Table.Cell>
              <Table.Cell>{candidate.last_name}</Table.Cell>
              <Table.Cell>{candidate.linkedInAccount}</Table.Cell>
              {/* <Table.Cell>
                <Button animated as={NavLink} to={`/candidateCvs/${candidate.id}`} color="violet" >
                <Button.Content visible>Show</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Table.Cell> */}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}