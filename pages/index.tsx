import {
    userSelector,
    // resetUsername,
    signUpAsync,
} from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

export default function Index({}: Props) {
    const user = useSelector(userSelector);
    const dispatch = useAppDispatch();
    return (
        <>
            {/* <div>Index {user.username}</div>
            <button onClick={() => dispatch(resetUsername({ data: "555" }))}>
                Reset
            </button> 

            <button
                onClick={() =>
                    dispatch(
                        signUpAsync({ username: "admin", password: "1234" })
                    )
                }
            >
                signUpAsync
            </button> */}

            <Link href="/auth/signIn">
                <Button>Sign In</Button>
            </Link>
            <Link href="/auth/signOut">
                <Button>Sign Out</Button>
            </Link>
            <Link href="/user/profile">
                <Button>Profile</Button>
            </Link>
        </>
    );
}
