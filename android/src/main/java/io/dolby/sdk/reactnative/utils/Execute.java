package io.dolby.sdk.reactnative.utils;


public interface Execute<PARAM, TYPE> {
    TYPE call(PARAM param);
}