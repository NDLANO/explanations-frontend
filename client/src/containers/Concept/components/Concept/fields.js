import TextArea from "../../../../components/TextArea";
import Input from "../../../../components/Input";
import DateTime from "../../../../components/DateTime";
import Dropdown from "../../../../components/Dropdown";

export const FIELDS = {
    title: {
        name: "title",
        label: "conceptForm.title",
        type: "text",
        required: true,
        placeholder: "conceptForm.title",
        messagePrefix: "conceptForm.",
        component: Input
    },
    content: {
        name: "content",
        label: "conceptForm.content",
        type: "text",
        required: true,
        placeholder: "conceptForm.content",
        messagePrefix: "conceptForm.",
        component: TextArea
    },
    source: {
        name: "source",
        label: "conceptForm.source",
        type: "text",
        required: false,
        placeholder: "conceptForm.source",
        messagePrefix: "conceptForm.",
        component: Input
    },
    author: {
        name: "author",
        label: "conceptForm.author",
        type: "text",
        required: true,
        placeholder: "conceptForm.author",
        messagePrefix: "conceptForm.",
        component: Input
    },
    created: {
        name: "created",
        label: "conceptForm.created",
        placeholder: "conceptForm.created",
        messagePrefix: "conceptForm.",
        component: DateTime
    },
    updated: {
        name: "updated",
        label: "conceptForm.updated",
        placeholder: "conceptForm.updated",
        messagePrefix: "conceptForm.",
        component: DateTime
    },
    status: {
        name: "statusId",
        label: "conceptForm.status",
        messagePrefix: "conceptForm.",
        isClearable: false,
        id: "statusId",
        component: Dropdown
    }
};