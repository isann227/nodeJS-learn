import React, { Component } from "react";
import { faker } from "@faker-js/faker";

export default class CommentClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: Array.from({ length: 10 }, () => ({
        id: faker.string.uuid(),
        author: faker.person.fullName(),
        date: faker.date.recent().toISOString(), // simpan ISO
        text: faker.lorem.sentence(),
        avatar: faker.image.avatar(),
        replies: [],
      })),
      replyText: "",
      replyTo: null,
    };
  }

  // helper buat format date
  formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return "";

    const now = new Date();
    const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const diffDays = Math.floor((startOfDay(now) - startOfDay(date)) / 86400000);

    const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (diffDays === 0) return `Today at ${time}`;
    if (diffDays === 1) return `Yesterday at ${time}`;
    return `${date.toLocaleDateString()} ${time}`;
  };

  handleReplyClick = (commentId) => {
    this.setState({ replyTo: commentId, replyText: "" });
  };

  handleCancelReply = () => {
    this.setState({ replyTo: null, replyText: "" });
  };

  handleAddReply = (e, commentId) => {
    e.preventDefault();
    const { replyText } = this.state;
    if (!replyText.trim()) return;

    const newReply = {
      id: faker.string.uuid(),
      author: faker.person.fullName(),
      date: new Date().toISOString(),
      text: replyText,
      avatar: faker.image.avatar(),
      replies: [],
    };

    const addReplyRecursive = (list) =>
      list.map((c) =>
        c.id === commentId
          ? { ...c, replies: [...c.replies, newReply] }
          : { ...c, replies: addReplyRecursive(c.replies) }
      );

    this.setState((prev) => ({
      comments: addReplyRecursive(prev.comments),
      replyText: "",
      replyTo: null,
    }));
  };

  renderComments = (list) =>
    list.map((c) => (
      <div className="comment" key={c.id}>
        <a className="avatar">
          <img src={c.avatar} alt={c.author} />
        </a>
        <div className="content">
          <a className="author">{c.author}</a>
          <div className="metadata">
            <span className="date">{this.formatDate(c.date)}</span>
          </div>
          <div className="text">{c.text}</div>
          <div className="actions">
            <a className="reply" onClick={() => this.handleReplyClick(c.id)}>
              Reply
            </a>
          </div>

          {this.state.replyTo === c.id && (
            <form
              className="ui reply form"
              onSubmit={(e) => this.handleAddReply(e, c.id)}
            >
              <div className="field">
                <textarea
                  value={this.state.replyText}
                  onChange={(e) => this.setState({ replyText: e.target.value })}
                  placeholder={`Balas ke ${c.author}...`}
                />
              </div>
              <button className="ui blue labeled submit icon button" type="submit">
                <i className="icon edit"></i> Add Reply
              </button>
              <button
                className="ui button"
                type="button"
                onClick={this.handleCancelReply}
              >
                Cancel
              </button>
            </form>
          )}

          {c.replies.length > 0 && (
            <div className="comments">{this.renderComments(c.replies)}</div>
          )}
        </div>
      </div>
    ));

  render() {
    return (
      <div className="ui comments" style={{ margin: "20px" }}>
        <h3 className="ui dividing header">Comments</h3>
        {this.renderComments(this.state.comments)}
      </div>
    );
  }
}
