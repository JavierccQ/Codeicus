import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITarea, defaultValue } from 'app/shared/model/tarea.model';

export const ACTION_TYPES = {
  FETCH_TAREA_LIST: 'tarea/FETCH_TAREA_LIST',
  FETCH_TAREA: 'tarea/FETCH_TAREA',
  CREATE_TAREA: 'tarea/CREATE_TAREA',
  UPDATE_TAREA: 'tarea/UPDATE_TAREA',
  DELETE_TAREA: 'tarea/DELETE_TAREA',
  RESET: 'tarea/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITarea>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TareaState = Readonly<typeof initialState>;

// Reducer

export default (state: TareaState = initialState, action): TareaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TAREA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TAREA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TAREA):
    case REQUEST(ACTION_TYPES.UPDATE_TAREA):
    case REQUEST(ACTION_TYPES.DELETE_TAREA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TAREA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TAREA):
    case FAILURE(ACTION_TYPES.CREATE_TAREA):
    case FAILURE(ACTION_TYPES.UPDATE_TAREA):
    case FAILURE(ACTION_TYPES.DELETE_TAREA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TAREA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TAREA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TAREA):
    case SUCCESS(ACTION_TYPES.UPDATE_TAREA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TAREA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/tareas';

// Actions

export const getEntities: ICrudGetAllAction<ITarea> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TAREA_LIST,
  payload: axios.get<ITarea>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITarea> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TAREA,
    payload: axios.get<ITarea>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITarea> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TAREA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITarea> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TAREA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITarea> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TAREA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
