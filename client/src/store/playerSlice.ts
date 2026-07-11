import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Beat } from "../types";

type PlayerState = {
  currentTrack: Beat | null;
  isPlaying: boolean;

  // live timing/progress from the <audio> in NavPlayer
  currentTimeSec: number; // seconds played
  durationSec: number;    // total track length (seconds)
  progress: number;       // 0..100 percentage

  // request NavPlayer to seek to this time (seconds)
  seekToSec: number | null;
};

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTimeSec: 0,
  durationSec: 0,
  progress: 0,
  seekToSec: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playTrack(state, action: PayloadAction<Beat>) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.currentTimeSec = 0;
      state.progress = 0;
      // durationSec will be updated when metadata loads in NavPlayer
    },
    pauseTrack(state) {
      state.isPlaying = false;
    },
    resumeTrack(state) {
      if (state.currentTrack) {
        state.isPlaying = true;
      }
    },
    stopTrack(state) {
      state.isPlaying = false;
      state.currentTrack = null;
      state.currentTimeSec = 0;
      state.durationSec = 0;
      state.progress = 0;
      state.seekToSec = null;
    },

    // NavPlayer dispatches this as audio plays
    setTime(
      state,
      action: PayloadAction<{ current: number; duration: number }>
    ) {
      const { current, duration } = action.payload;
      state.currentTimeSec = Number.isFinite(current) ? current : 0;
      state.durationSec = Number.isFinite(duration) ? duration : 0;
      state.progress =
        state.durationSec > 0
          ? (state.currentTimeSec / state.durationSec) * 100
          : 0;
    },

    // Anywhere (TrackInfo, Playlist, etc.) can request a seek
    setSeek(state, action: PayloadAction<number>) {
      const next = action.payload;
      state.seekToSec = Number.isFinite(next) ? Math.max(0, next) : 0;
    },
    clearSeek(state) {
      state.seekToSec = null;
    },
  },
});

export const {
  playTrack,
  pauseTrack,
  resumeTrack,
  stopTrack,
  setTime,
  setSeek,
  clearSeek,
} = playerSlice.actions;

export default playerSlice.reducer;
