window.onload = function () {
    const createEl = (tagName) => document.createElement(tagName);

    const getParentByTagName = (element, tagName) => {
        const parent = element.parentElement,
            parentTagName = parent.tagName.toLowerCase();
        if (tagName !== parentTagName) {
            return getParentByTagName(parent, tagName);
        }
        return parent;
    };

    const createBtnByTextAndAction = (text, action) => {
        const btn = createEl("button");
        btn.innerText = text;
        btn.dataset.action = action;
        return btn;
    };

    const createNav = (buttons) => {
        const ul = createEl("ul");
        buttons.forEach((button) => {
            const li = createEl("li");
            li.append(createBtnByTextAndAction(button.text, button.action));
            ul.append(li);
        });
        return ul;
    };

    const createEditForm = (text) => {
        const form = createEl("form");
        const textArea = createEl("textarea");
        const nav = createNav(buttons);
        textArea.textContent = text;
        form.append(textArea);
        form.append(nav);
        return form;
    };

    const showTextRemoveForm = (parent) => {
        const content = parent.querySelector("p"),
            form = parent.querySelector("form");
        form.remove();
        content.classList.remove("hidden");
    };

    const showFormHideText = (element, form) => {
        const parent = getParentByTagName(element, "td");
        element.classList.add("hidden");
        parent.append(form);
    };

    const addValueToText = (parent) => {
        const { value } = parent.querySelector("textarea"),
            content = parent.querySelector("p");
        content.textContent = value;
    };

    buttons = [
        { text: "Save", action: "save" },
        { text: "Cancel", action: "cancel" },
    ];

    const actions = {
        edit(target) {
            const { innerText: text } = target,
                form = createEditForm(text);
            showFormHideText(target, form);
        },
        save(target) {
            const parent = getParentByTagName(target, "td");
            addValueToText(parent);
            showTextRemoveForm(parent);
        },
        cancel(target) {
            const parent = getParentByTagName(target, "td");
            showTextRemoveForm(parent);
        },
    };

    const actionHandler = function (event) {
        const target = event.target,
            { action } = target.dataset,
            actionMethod = actions[action];
        if (action && typeof actionMethod === "function") {
            event.preventDefault();
            actionMethod(target);
        }
    };

    const tableBody = document.getElementById("tableBody");

    tableBody.addEventListener("click", actionHandler);
};
