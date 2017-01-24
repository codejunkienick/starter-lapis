// @flow
import { fromJS, Map, Stack, List } from 'immutable';
import * as TYPES from '../actions/app';
import guid from 'utils/guid';

const initialState = fromJS({
  upload: Map(),
  ui: Map({ modals: Stack(), prevModal: '' }),
  errors: Map(),
  notifications: Map(),
});

export default function app(state: Object = initialState, action: Object = {}) {
  const { response = {}, error } = action;
  const uuid = guid();
  switch (action.type) {
    case TYPES.UPLOAD_FILE.REQUEST:
      return state.setIn([ 'upload', ...action.filePath, 'uploading' ], true);
    case TYPES.UPLOAD_FILE.SUCCESS:
      return state
        .deleteIn([ 'upload', ...action.filePath, 'uploading' ])
        .updateIn([ 'upload', ...action.filePath, 'file' ], file => {
          if (file) return file;
          return fromJS(action.file);
        })
        .updateIn([ 'upload', ...action.filePath, 'files' ], files => {
          if (!files) return List().push(fromJS(action.file));
          return files.push(fromJS(action.file));
        });

    case TYPES.SERVER_ERROR:
      alert(action.msg);
      return state.setIn(
        [ 'errors', uuid ],
        Map({ message: action.msg, id: uuid }),
      );

    case TYPES.CLEAR_CONNECTION_ERROR:
      return state.delete('displayConnectionError');

    case TYPES.CONNECTION_ERROR:
      return state
        .set('displayConnectionError', true)
        .set('lastConnectionCheck', Date.now());

    case TYPES.SERVER_NOTIFICATION:
      alert(action.msg);
      return state.setIn(
        [ 'notifications', uuid ],
        Map({ message: action.msg, id: uuid }),
      );

    case TYPES.UPLOAD_FILES.REQUEST:
      return state.setIn([ 'upload', ...action.filePath, 'uploading' ], true);
    case TYPES.UPLOAD_FILES.SUCCESS:
      return state
        .deleteIn([ 'upload', ...action.filePath, 'uploading' ])
        .setIn([ 'upload', ...action.filePath, 'files' ], fromJS(action.files));
    case TYPES.RESET_FILE:
      return state.deleteIn([ 'upload', ...action.filePath ]);
    case TYPES.SET_FILE:
      return state
        .setIn([ 'upload', ...action.filePath, 'file' ], action.file)
        .setIn(
          [ 'upload', ...action.filePath, 'files' ],
          List().push(action.files),
        );
    case TYPES.INCREASE_MODAL_ELEVATION:
      return state.updateIn(
        [ 'ui', 'modals' ],
        modals =>
          !modals.includes(action.modal) ? modals.push(action.modal) : modals,
      );
    case TYPES.DECREASE_MODAL_ELEVATION:
      return state
        .setIn([ 'ui', 'prevModal' ], action.route)
        .updateIn([ 'ui', 'modals' ], modals => modals.pop());
    case TYPES.SET_ROUTE_ON_CLOSE_MODAL:
      return state.setIn([ 'ui', 'backRoute' ], action.route);
    default:
      return state;
  }
}

export const getFile = (
  state: Object,
  file: Array<string>,
  multiple: boolean = false,
) =>
  {
    const files = state.getIn([ 'app', 'upload', ...file, 'files' ]);
    const single = state.getIn([ 'app', 'upload', ...file, 'file' ]);
    return !multiple || single
      ? single
      : files && files.size > 0 ? files.first() : null;
  };

export const getFiles = (
  state: Object,
  file: Array<string>,
  multiple: boolean = false,
) =>
  {
    const files = state.getIn([ 'app', 'upload', ...file, 'files' ]);
    const single = state.getIn([ 'app', 'upload', ...file, 'file' ]);

    return !multiple ? single : files && files.size > 0 ? files : single;
  };
export const isUploading = (state: Object, file: Array<string>) =>
  state.getIn([ 'app', 'upload', ...file, 'uploading' ]);
export const getElevation = (state: Object) =>
  state.getIn([ 'app', 'ui', 'modals' ]).size;
export const haveConnectionError = (state: Object) =>
  state.getIn([ 'app', 'displayConnectionError' ]);
