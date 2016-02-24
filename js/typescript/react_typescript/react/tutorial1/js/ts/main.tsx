///<reference path="typings/react/react-global.d.ts"/>

interface CommentInfoProps {
    key: number;
    author: string;
    children: string;
}

interface CommentListProps {
    data: Array<CommentModel>;
}

interface CommentFormProps {
    handlerCommentSubmit: any,
}

interface CommentModel {
    id: number;
    author: string;
    text: string;
}

interface CommentFormModel {
    author: string;
    text: string;
}

var commentList: Array<CommentModel> = [
    {id: 1, author: "Bob", text: "hello world"},
    {id: 2, author: "Job", text: "f**k you"},
] ;

class CommentList extends React.Component<CommentListProps, any> {
    render() {
        var commentNodes: Array<any> = this.props.data.map((comment) => {
            return (
                <Comment key={comment.id} author={comment.author}>{comment.text}</Comment>
            );
        });

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}

class CommentForm extends React.Component<CommentFormProps, any> {
    state: CommentFormModel = {author: "", text: ""};


    handlerAuthorChange(e) {
        this.setState({author: e.target.value});
    }

    handlerTextChange(e) {
        this.setState({text: e.target.value});
    }

    handlerAddComment(e) {
        e.preventDefault();

        this.refs.commentInput.value = "";
        this.refs.authorInput.value = "";

        this.props.handlerCommentSubmit(this.state);
    }

    render() {
        return (
            <div className="commentForm">
                <form>
                    <input type="text"
                    placeholder="Your name"
                    onChange={this.handlerAuthorChange.bind(this)}
                    ref="authorInput"
                    />

                    <input
                    type="text"
                    placeholder="Say something"
                    onChange={this.handlerTextChange.bind(this)}
                    ref="commentInput"
                    />

                    <input type="button"
                    value="Post"
                    onClick={this.handlerAddComment.bind(this)}
                    />
                </form>
            </div>
        );
    }
}

class CommentBox extends React.Component<CommentListProps, any> {
    state = {data: []};

    componentDidMount() {
        this.setState({data: this.props.data});
    }

    handlerCommentSubmit(comment) {
        var commentData: Array<CommentModel> = this.state.data,
            lastCommentIndex:number = commentData.length - 1,
            newCommentId:number = commentData[lastCommentIndex].id + 1,
            newComment: CommentModel;

        newComment = {
            id: newCommentId,
            author: comment.author,
            text: comment.text
        };

        commentData.push(newComment);

        this.setState({data: commentData});
    }

    render() {
        return (
            <div className="CommentBox">
                <h1>Comment Box</h1>
                <CommentList data={this.state.data} />
                <CommentForm handlerCommentSubmit={this.handlerCommentSubmit.bind(this)} />
            </div>
        )
    }
}

class Comment extends React.Component<any, any> {
    render() {
        return (
            <div className="comment" key={this.props.key}>
                <h2 className="commentAuthor">{this.props.author}</h2>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <CommentBox data={commentList} />,
    document.getElementById("temp")
);
