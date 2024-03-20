import React from "react";

function Message({ message }) {
    const username = localStorage.getItem("username");
    const isCurrentUser = message.username === username;

    return (
        <div className={isCurrentUser ? "message_out" : "message_in"}>
            <div className={`${isCurrentUser ? "message_out" : "message_in"}__content`}>
                {!isCurrentUser && (
                    <div className="message_in__content__username">
                        <div className="pp"><i className="fa-solid fa-user"></i></div> {message.username}
                    </div>
                )}
                <div>
                    {message.content}
                </div>
                <div className={`${isCurrentUser ? "message_out" : "message_in"}__content__infos`}>
                    <div className="heure">{new Date(message.date_envoie).toLocaleDateString()} {new Date(message.date_envoie).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            </div>
        </div>
    );
}

export default Message;
