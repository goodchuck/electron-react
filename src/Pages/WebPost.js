import React from "react";
import { useParams } from "react-router-dom";

const WebPost = () => {
    const { id } = useParams();
    console.log("id->",id);
    return <div>#{id}This is 포스트</div>;
};

export default WebPost;