import React, { useEffect, useState, useRef } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Button } from 'react-bootstrap';

let S_words_Q = createSlice({
    name : 'words',
    initialState : [ '제시어1', '제시어2', '제시어3', '제시어4', '제시어5', '제시어6', '제시어7', '제시어8', '제시어9', '제시어10'],
    reducers : {
        answer(state, action){
            console.log("input 동작하는가?" + action)
        }
    }
})

export let {answer} = S_words_Q.actions

export default configureStore({
    reducer: {
        S_words_Q: S_words_Q.reducer,
    }
})