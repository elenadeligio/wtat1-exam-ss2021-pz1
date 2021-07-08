$(document).ready(() => {

    const socket = io();
    $("#chatForm").submit(() => {
        let text = $("#chat-input").val(),
            userName = $("#chat-user-name").val(),
            userId = $("#chat-user-id").val();
        socket.emit("message", {
            content: text,
            userName: userName,
            userId: userId
        });
        $("#chat-input").val("");
        return false;
    });

    socket.on("message", message => {
        displayMessage(message);
    });

    socket.on("load all messages", data => {
        data.forEach(message => {
            displayMessage(message);
        });
    });

    socket.on("message", message => {
        displayMessage(message);
        for (let i = 0; i < 2; i++) {
            $(".chat-icon")
                .fadeOut(200)
                .fadeIn(200);
        }
    });

    let displayMessage = message => {
        $("#chat").prepend(
            $("<li>").html(`
				<div class='message ${getCurrentUserClass(message.user)}'>
				<span class="user-name">
					${message.userName}:
				</span>
					${message.content}
				</div>
			`)
        );
    };

    let getCurrentUserClass = id => {
        let userId = $("#chat-user-id").val();
        if (userId === id) return "current-user";
        else return "";
    };

    $("#modal-button").click(() => {
        $(".modal-body").html("");
        $.get(`/api/questions`, (results = {}) => {
            let data = results.data;
            if (!data || !data.questions) return;
            data.questions.forEach(question => {
                $(".modal-body").append(
                    `<div class="row">
						<span class="question-title">
							${question.title}
						</span>
						<button class="${question.voted ? "voted-button" : "vote-button"} btn btn-info btn-sm" data-id="${question._id}">
							${question.voted ? "Voted" : "Vote"}
						</button>
					</div>`
                );
            });
        }).then(() => {
            addVoteButtonListener();
        });
    });
});

let addVoteButtonListener = () => {
    $(".vote-button").click(event => {
        let $button = $(event.target),
            questionId = $button.data("id");
        console.log(`/api/questions/${questionId}/vote`)
        $.get(`/api/questions/${questionId}/vote`, (results = {}) => {
            let data = results.data;
            if (data && data.success) {
                $button
                    .text("Voted")
                    .addClass("voted-button")
                    .removeClass("vote-button");
            } else {
                $button.text("Try again");
            }
        });
    });
};