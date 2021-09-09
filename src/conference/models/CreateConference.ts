export enum RTCPMode {
  WORST = 'worst',
  AVERAGE = 'average',
  BEST = 'best',
}

export enum Mode {
  STANDARD = 'standard',
  PUSH = 'push',
}

export enum Codec {
  VP8 = 'VP8',
  H264 = 'H264',
}

export type CreateParameters = {
  ttl?: number;
  rtcpMode?: RTCPMode;
  mode?: Mode;
  videoCodec?: Codec;
  liveRecording?: boolean;
  dolbyVoice?: boolean;
  simulcast?: boolean;
};

export type CreateOptions = {
  alias?: string;
  params?: CreateParameters;
};
