import $ from "jquery";
import Mustache from "mustache";

export default class Button {
    constructor(link) {
        this.link = link;
    }

    onClick(event) {
        event.preventDefault();
        alert(this.link);
    }

    render(node) {
        const text = $(node).text();

        // 渲染我们的按钮
        $(node).html(
            Mustache.render(template, {text})
        );

        // 增加监听事件
        $(".button").click(this.onClick.bind(this));
    }
}
