import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tarea.reducer';
import { ITarea } from 'app/shared/model/tarea.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITareaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Tarea extends React.Component<ITareaProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { tareaList, match } = this.props;
    return (
      <div>
        <h2 id="tarea-heading">
          <Translate contentKey="codeicusApp.tarea.home.title">Tareas</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="codeicusApp.tarea.home.createLabel">Create new Tarea</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="codeicusApp.tarea.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="codeicusApp.tarea.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="codeicusApp.tarea.updated">Updated</Translate>
                </th>
                <th>
                  <Translate contentKey="codeicusApp.tarea.description">Description</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tareaList.map((tarea, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tarea.id}`} color="link" size="sm">
                      {tarea.id}
                    </Button>
                  </td>
                  <td>{tarea.name}</td>
                  <td>{tarea.type}</td>
                  <td>{tarea.updated}</td>
                  <td>{tarea.description}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tarea.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tarea.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tarea.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tarea }: IRootState) => ({
  tareaList: tarea.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tarea);
