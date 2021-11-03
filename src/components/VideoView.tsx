import React, { PureComponent } from 'react';
import {
  View,
  ViewStyle,
  UIManager,
  requireNativeComponent,
  findNodeHandle,
} from 'react-native';

import type { MediaStream, Participant } from '../services/conference/models';
import { MediaStreamType } from '../services/conference/models';

const DIOVideoView = requireNativeComponent('DIOVideoView');

type Props = typeof VideoView.defaultProps & {
  isMirror?: boolean;
  scaleType?: 'fit' | 'fill';
  style?: ViewStyle;
};

type State = {
  mediaStream?: MediaStream;
};

export default class VideoView extends PureComponent<Props, State> {
  static defaultProps = {
    isMirror: false,
    scaleType: 'fit',
  };

  public state = {
    mediaStream: undefined,
  };

  private _videoView: React.Component | null;
  private _videoViewHandler: null | number;
  private static _dispatchId: number = 1;
  private static _dispatchMap: Map<number, { resolve: any; reject: any }> =
    new Map();

  constructor(props: Props) {
    super(props);
    this._videoViewHandler = null;
    this._videoView = null;
  }

  private _dispatchCommand = async (command: number, params: any[] = []) => {
    const dispatchId: number = VideoView._dispatchId++;

    UIManager.dispatchViewManagerCommand(this._videoViewHandler, command, [
      dispatchId,
      ...params,
    ]);

    return await new Promise((resolve, reject) => {
      VideoView._dispatchMap.set(dispatchId, { resolve, reject });
    });
  };

  private _onCommandEvent = ({ nativeEvent }: any) => {
    if (!nativeEvent) return;

    this._onEvent(nativeEvent);
  };

  private _onEvent = (event: any) => {
    if (!event) return;

    const { requestId, error } = event;
    const promise = VideoView._dispatchMap.get(requestId);
    VideoView._dispatchMap.delete(requestId);

    if (!promise) return;

    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(event);
    }
  };

  private _setRefs = (ref?: any) => {
    if (ref) {
      this._videoView = ref;
      this._videoViewHandler = findNodeHandle(this._videoView);
    } else {
      this._videoView = null;
      this._videoViewHandler = null;
    }
  };

  public attach = async (
    participant: Participant,
    mediaStream: MediaStream
  ): Promise<boolean> => {
    const res = !!(await this._dispatchCommand(
      // @ts-ignore
      UIManager.DIOVideoView.Commands.attach,
      [participant.id, mediaStream.id]
    ));
    this.setState({
      mediaStream,
    });
    return res;
  };

  public detach = async (): Promise<boolean> => {
    const res = !!(await this._dispatchCommand(
      // @ts-ignore
      UIManager.DIOVideoView.Commands.detach
    ));
    this.setState({
      mediaStream: undefined,
    });
    return res;
  };

  public isAttached = async (): Promise<boolean> => {
    return !!(await this._dispatchCommand(
      // @ts-ignore
      UIManager.DIOVideoView.Commands.isAttached
    ));
  };

  public isScreenShare = async (): Promise<boolean> => {
    return Promise.resolve(
      !!(
        this.state.mediaStream &&
        // @ts-ignore
        this.state.mediaStream.type === MediaStreamType.ScreenShare
      )
    );
  };

  render() {
    return (
      <View style={this.props.style}>
        <DIOVideoView
          // @ts-ignore
          isMirror={this.props.isMirror}
          scaleType={this.props.scaleType}
          onCommandEvent={this._onCommandEvent}
          ref={this._setRefs}
        />
      </View>
    );
  }
}
