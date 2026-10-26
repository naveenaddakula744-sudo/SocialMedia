import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",

    initialState: {
        userData: null,
        suggestedUsers: null,
        profileData: null
    },

    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setsuggestedUser: (state, action)=>{
            state.suggestedUsers = action.payload;
        },
        setprofileData: (state, action) =>{
            state.profileData = action.payload;
        }
    }
});

export const { setUserData, setsuggestedUser, setprofileData} = userSlice.actions;
export default userSlice.reducer;