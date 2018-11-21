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
        component: Input
    },
    content: {
        name: "content",
        label: "conceptForm.content",
        type: "text",
        required: true,
        placeholder: "conceptForm.content",
        component: TextArea
    },
    source: {
        name: "source",
        label: "conceptForm.source",
        type: "text",
        required: false,
        placeholder: "conceptForm.source",
        component: Input
    },
    author: {
        name: "author",
        label: "conceptForm.author",
        type: "text",
        required: true,
        placeholder: "conceptForm.author",
        component: Input
    },
    created: {
        name: "created",
        label: "conceptForm.created",
        placeholder: "conceptForm.created",
        component: DateTime
    },
    updated: {
        name: "updated",
        label: "conceptForm.updated",
        placeholder: "conceptForm.updated",
        component: DateTime
    },
    status: {
        name: "statusId",
        label: "conceptForm.status",
        isClearable: false,
        id: "statusId",
        component: Dropdown
    }
};