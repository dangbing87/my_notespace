///<reference path="typings/react/react-global.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commentList = [
    { id: 1, author: "Bob", text: "hello world" },
    { id: 2, author: "Job", text: "f**k you" },
];
var CommentList = (function (_super) {
    __extends(CommentList, _super);
    function CommentList() {
        _super.apply(this, arguments);
    }
    CommentList.prototype.render = function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (React.createElement(Comment, {"key": comment.id, "author": comment.author}, comment.text));
        });
        return (React.createElement("div", {"className": "commentList"}, commentNodes));
    };
    return CommentList;
})(React.Component);
var CommentForm = (function (_super) {
    __extends(CommentForm, _super);
    function CommentForm() {
        _super.apply(this, arguments);
        this.state = { author: "", text: "" };
    }
    CommentForm.prototype.handlerAuthorChange = function (e) {
        this.setState({ author: e.target.value });
    };
    CommentForm.prototype.handlerTextChange = function (e) {
        this.setState({ text: e.target.value });
    };
    CommentForm.prototype.handlerAddComment = function (e) {
        e.preventDefault();
        this.refs.commentInput.value = "";
        this.refs.authorInput.value = "";
        this.props.handlerCommentSubmit(this.state);
    };
    CommentForm.prototype.render = function () {
        return (React.createElement("div", {"className": "commentForm"}, React.createElement("form", null, React.createElement("input", {"type": "text", "placeholder": "Your name", "onChange": this.handlerAuthorChange.bind(this), "ref": "authorInput"}), React.createElement("input", {"type": "text", "placeholder": "Say something", "onChange": this.handlerTextChange.bind(this), "ref": "commentInput"}), React.createElement("input", {"type": "button", "value": "Post", "onClick": this.handlerAddComment.bind(this)}))));
    };
    return CommentForm;
})(React.Component);
var CommentBox = (function (_super) {
    __extends(CommentBox, _super);
    function CommentBox() {
        _super.apply(this, arguments);
        this.state = { data: [] };
    }
    CommentBox.prototype.componentDidMount = function () {
        this.setState({ data: this.props.data });
    };
    CommentBox.prototype.handlerCommentSubmit = function (comment) {
        var commentData = this.state.data, lastCommentIndex = commentData.length - 1, newCommentId = commentData[lastCommentIndex].id + 1, newComment;
        newComment = {
            id: newCommentId,
            author: comment.author,
            text: comment.text
        };
        commentData.push(newComment);
        this.setState({ data: commentData });
    };
    CommentBox.prototype.render = function () {
        return (React.createElement("div", {"className": "CommentBox"}, React.createElement("h1", null, "Comment Box"), React.createElement(CommentList, {"data": this.state.data}), React.createElement(CommentForm, {"handlerCommentSubmit": this.handlerCommentSubmit.bind(this)})));
    };
    return CommentBox;
})(React.Component);
var Comment = (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        _super.apply(this, arguments);
    }
    Comment.prototype.render = function () {
        return (React.createElement("div", {"className": "comment", "key": this.props.key}, React.createElement("h2", {"className": "commentAuthor"}, this.props.author), this.props.children));
    };
    return Comment;
})(React.Component);
ReactDOM.render(React.createElement(CommentBox, {"data": commentList}), document.getElementById("temp"));
