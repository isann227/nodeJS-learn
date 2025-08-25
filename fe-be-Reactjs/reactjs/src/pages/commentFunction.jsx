import React, { useState } from "react";
import { faker } from "@faker-js/faker";

export default function Comment() {
  const initialComments = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    author: faker.person.fullName(),
    date: faker.date.recent().toISOString(),
    text: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    replies: [],
  }));

  const [comments, setComments] = useState(initialComments);
  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const handleReplyClick = (commentId) => {
    setReplyTo(commentId);
    setReplyText(""); // reset form saat buka reply
  };

  const handleCancelReply = () => {
    setReplyTo(null);
    setReplyText("");
  };

  const handleAddReply = (e, commentId) => {
    e.preventDefault(); // stop reload 
    if (!replyText.trim()) return;

    const newReply = {
      id: faker.string.uuid(),
      author: faker.person.fullName(),
      date: new Date().toISOString(),
      text: replyText,
      avatar: faker.image.avatar(),
      replies: [],
    };

    // update nested comment
    const addReplyRecursive = (list) =>
      list.map((c) =>
        c.id === commentId
          ? { ...c, replies: [...c.replies, newReply] }
          : { ...c, replies: addReplyRecursive(c.replies) }
      );

    setComments(addReplyRecursive(comments));
    setReplyText("");
    setReplyTo(null);
  };

  // helper buat format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (isToday) return `Today at ${time}`;
  if (isYesterday) return `Yesterday at ${time}`;
  return date.toLocaleDateString() + " " + time;
};

  const renderComments = (list) =>
    list.map((c) => (
      <div className="comment" key={c.id}>
        <a className="avatar">
          <img src={c.avatar} alt={c.author} />
        </a>
        <div className="content">
          <a className="author">{c.author}</a>
          <div className="metadata">
            <span className="date">{formatDate(c.date)}</span>
          </div>
          <div className="text">{c.text}</div>
          <div className="actions">
            <a className="reply" onClick={() => handleReplyClick(c.id)}>
              Reply
            </a>
          </div>

          {replyTo === c.id && (
            <form
              className="ui reply form"
              onSubmit={(e) => handleAddReply(e, c.id)}
            >
              <div className="field">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Balas ke ${c.author}...`}
                />
              </div>
              <button className="ui blue labeled submit icon button" type="submit">
                <i className="icon edit"></i> Add Reply
              </button>
              <button
                className="ui button"
                type="button"
                onClick={handleCancelReply}
              >
                Cancel
              </button>
            </form>
          )}

          {c.replies.length > 0 && (
            <div className="comments">{renderComments(c.replies)}</div>
          )}
        </div>
      </div>
    ));

  return (
    <div className="ui comments" style={{ margin: "20px" }}>
      <h3 className="ui dividing header">Comments</h3>
      {renderComments(comments)}
    </div>
  );
}
