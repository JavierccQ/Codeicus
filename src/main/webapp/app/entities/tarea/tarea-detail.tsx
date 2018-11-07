import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tarea.reducer';
import { ITarea } from 'app/shared/model/tarea.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITareaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TareaDetail extends React.Component<ITareaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tareaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="codeicusApp.tarea.detail.title">Tarea</Translate> [<b>{tareaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="codeicusApp.tarea.name">Name</Translate>
              </span>
            </dt>
            <dd>{tareaEntity.name}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="codeicusApp.tarea.type">Type</Translate>
              </span>
            </dt>
            <dd>{tareaEntity.type}</dd>
            <dt>
              <span id="updated">
                <Translate contentKey="codeicusApp.tarea.updated">Updated</Translate>
              </span>
            </dt>
            <dd>{tareaEntity.updated}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="codeicusApp.tarea.description">Description</Translate>
              </span>
            </dt>
            <dd>{tareaEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/tarea" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/tarea/${tareaEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ tarea }: IRootState) => ({
  tareaEntity: tarea.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TareaDetail);
