import React from "react";
export const Button = (props) => {
    return (
        <>
        <button className={`btn btn-success ${props.className}`}>{props.children}</button>
        </>
    )
}